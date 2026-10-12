import { notFound, redirect } from "next/navigation";
import { PDF_BUCKET } from "@/lib/homework/pages";
import { isPdfPage, isSubmissionPageName } from "@/lib/storage-paths";
import { createClient } from "@/lib/supabase/server";

/**
 * Opens a copy handed in as a PDF (D-106) with an address made at the click, so a page kept
 * open for hours still opens it. The cookie-bound client asks storage: a student opens her
 * own, the tutor everyone's, and nobody else anything.
 */
export async function GET(_request: Request, context: RouteContext<"/devoirs/copie/[...chemin]">) {
  const { chemin } = await context.params;
  const name = chemin.join("/");
  // Next decodes each segment after splitting on "/": only the id-shaped names the app
  // writes reach storage (D-052).
  if (!isSubmissionPageName(name) || !isPdfPage(name)) notFound();

  const supabase = await createClient();
  const { data } = await supabase.storage.from(PDF_BUCKET).createSignedUrl(name, 600);
  if (!data) notFound();

  redirect(data.signedUrl);
}
