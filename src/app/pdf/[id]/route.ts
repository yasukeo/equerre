import { cookies } from "next/headers";
import { publicEnv } from "@/lib/env";
import { getPrintableLesson } from "@/lib/lesson/readable";
import { launchBrowser } from "@/lib/pdf/browser";
import { pdfHref } from "@/lib/pdf/links";
import { createClient } from "@/lib/supabase/server";

// A document as a PDF (DECISIONS.md, D-096): its print page (/imprimer/[id]) printed by a
// headless Chrome, so formulas come out as the page draws them. Whoever asks must be able to
// read the document; the browser then loads the page with her own session.
//
// A public document's PDF is cached for good under an address that names its version (`v`):
// an edit makes a new address, so nothing stale is served, and the PDF is printed once per
// version rather than once per download. A request for any other address (another version, a
// query added to miss the cache) is sent to the current one. Every print is counted all the
// same: Next drops some parameters before this code sees the address, so the address alone
// cannot stop a loop of cache misses (take_public_print_quota, take_print_quota).

// Unpacking Chromium and printing a long series can take a while on a cold start.
export const maxDuration = 60;

/** A session about to expire is renewed here, not by the print browser (see below). */
const FRESH_FOR_MS = 5 * 60 * 1000;

export async function GET(request: Request, { params }: RouteContext<"/pdf/[id]">) {
  const { id } = await params;
  const lesson = await getPrintableLesson(id);
  if (!lesson) return new Response("Document introuvable.", { status: 404 });

  const url = new URL(request.url);
  const exercises = lesson.kind === "serie" || lesson.kind === "devoir";
  const withSolutions = exercises && url.searchParams.get("corriges") === "1";
  const supabase = await createClient();

  if (lesson.isPublic) {
    const canonical = pdfHref(lesson.id, lesson.version, withSolutions);
    if (`${url.pathname}${url.search}` !== canonical) {
      // A relative address: the Host header has no say in where the reader is sent.
      return new Response(null, { status: 307, headers: { location: canonical } });
    }
    const quota = await supabase.rpc("take_public_print_quota", { p_lesson_id: lesson.id });
    if (quota.error) return failed();
    if (quota.data !== true) return busy(503);
  } else {
    const quota = await supabase.rpc("take_print_quota");
    if (quota.error) return failed();
    if (quota.data !== true) return busy(429);
    // The print page must not renew the session itself: the new refresh token would stay in
    // the throwaway browser, and the reader's own, now spent, would sign her out at its next
    // use. A session close to its end is renewed here, and the reader's response carries it.
    const { data } = await supabase.auth.getSession();
    const expiresAt = (data.session?.expires_at ?? 0) * 1000;
    if (data.session && expiresAt - Date.now() < FRESH_FOR_MS) {
      await supabase.auth.refreshSession();
    }
  }

  // The site's own address, never the request's Host: the browser must not be pointed
  // elsewhere, and it carries the reader's cookies.
  const printUrl = new URL(`/imprimer/${lesson.id}`, publicEnv.NEXT_PUBLIC_SITE_URL);
  if (withSolutions) printUrl.searchParams.set("corriges", "1");

  // Whatever goes wrong from here is answered, not thrown: Next adds the cookies set above (a
  // renewed session) only to a response the handler returns, and a reader who lost them would
  // be signed out at her next visit.
  let browser: Awaited<ReturnType<typeof launchBrowser>> | undefined;
  try {
    browser = await launchBrowser();
    if (!lesson.isPublic) {
      // Only the session's cookies, set as the site's own, so the browser sends them to the site
      // and nowhere else: not to the storage host the images come from, nor anywhere a redirect
      // might lead. Other cookies stay behind; an odd one (`__Host-`, `__Secure-` on http) would
      // make Chrome refuse them all. Read after any renewal above, which wrote the new tokens
      // here; a removed cookie is empty.
      const session = (await cookies())
        .getAll()
        .filter((cookie) => cookie.name.startsWith("sb-") && cookie.value !== "");
      if (session.length > 0) {
        await browser.setCookie(
          ...session.map(({ name, value }) => ({
            name,
            value,
            domain: printUrl.hostname,
            path: "/",
            httpOnly: true,
            secure: printUrl.protocol === "https:",
            sameSite: "Lax" as const,
          })),
        );
      }
    }
    const page = await browser.newPage();
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
    // Short enough to leave the launch and the printing room within maxDuration.
    const response = await page.goto(printUrl.href, { waitUntil: "networkidle0", timeout: 30_000 });
    // A missing document answers 200 all the same, its « not found » streamed into the page:
    // the sheet itself is the proof that the document was read.
    if (!response?.ok() || !(await page.$("main.impression"))) {
      throw new Error(
        `The print page answered ${response?.status() ?? "nothing"} without the sheet`,
      );
    }
    // KaTeX's fonts block their text until they arrive: wait for them all.
    await page.evaluate(() => document.fonts.ready.then(() => true));

    const host = new URL(publicEnv.NEXT_PUBLIC_SITE_URL).host;
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="width:100%;padding:0 16mm;display:flex;justify-content:space-between;font-family:sans-serif;font-size:8px;color:#4e5d73"><span>${host}</span><span><span class="pageNumber"></span>/<span class="totalPages"></span></span></div>`,
    });

    const name = `${lesson.slug}${withSolutions ? "-corrige" : ""}.pdf`;
    return new Response(Buffer.from(pdf), {
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="${name}"`,
        // s-maxage lets the CDN keep it too, not only the reader's browser.
        "cache-control": lesson.isPublic
          ? "public, max-age=31536000, s-maxage=31536000, immutable"
          : "private, no-store",
      },
    });
  } catch (error) {
    console.error("Could not print the PDF", lesson.id, error);
    return failed();
  } finally {
    await browser?.close();
  }
}

function failed() {
  return new Response("Le PDF n’a pas pu être préparé. Réessayez dans un instant.", {
    status: 500,
    headers: { "cache-control": "private, no-store" },
  });
}

/** Too many prints: the reader's own (429), or everyone's at once (503). */
function busy(status: 429 | 503) {
  return new Response("Trop de PDF demandés d’un coup. Réessayez dans une minute.", {
    status,
    headers: { "retry-after": "60", "cache-control": "private, no-store" },
  });
}
