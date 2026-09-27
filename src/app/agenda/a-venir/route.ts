import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getViewer } from "@/lib/auth";
import { buildIcs } from "@/lib/ics";
import { eventFor } from "@/lib/sessions/calendar-event";
import { listMySessions, listSessionsBetween } from "@/lib/sessions/queries";

/** Every confirmed session to come, as one .ics file: hers, or the whole diary (D-076). */
export async function GET() {
  const viewer = await getViewer();
  if (!viewer) redirect("/connexion");

  const now = new Date();
  const sessions =
    viewer.role === "tutor"
      ? await listSessionsBetween(now, new Date(now.getTime() + 120 * 24 * 3_600_000))
      : (await listMySessions(now)).upcoming;
  const tMode = await getTranslations("session.mode");
  const ics = buildIcs(
    sessions
      .filter((session) => session.status === "planifiee")
      .map((session) =>
        eventFor(session, viewer.role === "tutor" ? "tutor" : "student", (mode) => tMode(mode)),
      ),
  );

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="seances-a-venir.ics"',
      "Cache-Control": "private, no-store",
    },
  });
}
