import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getViewer } from "@/lib/auth";
import { localDateKey } from "@/lib/dates";
import { buildIcs } from "@/lib/ics";
import { eventFor } from "@/lib/sessions/calendar-event";
import { getSession } from "@/lib/sessions/queries";

/**
 * One session as an .ics file, for whoever may read it (D-076). The row is read with the
 * cookie-bound client, so the sessions policy decides: someone else's session is not found.
 */
export async function GET(_request: Request, context: RouteContext<"/agenda/[id]">) {
  const viewer = await getViewer();
  if (!viewer) redirect("/connexion");
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const session = await getSession(id);
  if (!session) notFound();
  const tMode = await getTranslations("session.mode");
  const ics = buildIcs([
    eventFor(session, viewer.role === "tutor" ? "tutor" : "student", (mode) => tMode(mode)),
  ]);

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="seance-${localDateKey(session.startsAt)}.ics"`,
      "Cache-Control": "private, no-store",
    },
  });
}
