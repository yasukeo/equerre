import {
  Bell,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  ClipboardList,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { GradeMark } from "@/components/grade-mark";
import { RefreshOnReturn } from "@/components/chat/inbox-live";
import { calendarDaysBetween, formatLocal, localDateKey } from "@/lib/dates";
import type { NotificationPage, NotificationType } from "@/lib/notifications/queries";
import { cn } from "@/lib/utils";
import { MarkSeen } from "./mark-seen";

const ICONS: Record<NotificationType, LucideIcon> = {
  booking_requested: CalendarClock,
  booking_made: CalendarCheck,
  booking_cancelled: CalendarX,
  booking_confirmed: CalendarCheck,
  booking_declined: CalendarX,
  session_planned: CalendarCheck,
  session_cancelled: CalendarX,
  session_moved: CalendarClock,
  session_reminder: Bell,
  assignment_new: ClipboardList,
  correction_ready: PenLine,
};

// The kind of news, as a tinted pastille behind its icon: sessions in blue, homework in orange,
// a correction in green. The sentence beside it always says what it is.
const TONES: Record<NotificationType, string> = {
  booking_requested: "bg-bleu-fond text-bleu-texte",
  booking_made: "bg-bleu-fond text-bleu-texte",
  booking_cancelled: "bg-bleu-fond text-bleu-texte",
  booking_confirmed: "bg-bleu-fond text-bleu-texte",
  booking_declined: "bg-bleu-fond text-bleu-texte",
  session_planned: "bg-bleu-fond text-bleu-texte",
  session_cancelled: "bg-bleu-fond text-bleu-texte",
  session_moved: "bg-bleu-fond text-bleu-texte",
  session_reminder: "bg-bleu-fond text-bleu-texte",
  assignment_new: "bg-orange-fond text-orange-texte",
  correction_ready: "bg-vert-fond text-vert-texte",
};

/** The newest first; what she had not seen is marked « Nouvelle », then counted as seen. */
export async function NotificationList({
  page,
  role,
}: {
  page: NotificationPage;
  role: "tutor" | "student";
}) {
  const t = await getTranslations("notifications");
  const today = localDateKey(new Date());
  const { items, upTo, unread } = page;

  if (items.length === 0) {
    return (
      <>
        <RefreshOnReturn />
        <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5">
          {role === "tutor" ? t("emptyTutor") : t("emptyStudent")}
        </p>
      </>
    );
  }

  // By day, as a diary: today, yesterday, then the date.
  const days: { key: string; label: string; items: typeof items }[] = [];
  for (const item of items) {
    const key = localDateKey(item.at);
    const last = days.at(-1);
    if (last?.key === key) {
      last.items.push(item);
      continue;
    }
    const ago = calendarDaysBetween(item.at, new Date());
    days.push({
      key,
      label:
        ago === 0
          ? t("today")
          : ago === 1
            ? t("yesterday")
            : formatLocal(
                item.at,
                key.slice(0, 4) === today.slice(0, 4) ? "EEEE d MMMM" : "EEEE d MMMM yyyy",
              ),
      items: [item],
    });
  }

  return (
    <>
      <RefreshOnReturn />
      {upTo && unread > 0 ? <MarkSeen upTo={upTo} /> : null}
      {unread > 0 ? (
        <p className="text-sm font-medium">{t("unreadCount", { count: unread })}</p>
      ) : null}
      <div className="grid gap-6">
        {days.map((day) => (
          <section key={day.key} aria-labelledby={`day-${day.key}`} className="grid gap-2">
            <h2
              id={`day-${day.key}`}
              className="text-sm font-semibold text-encre-douce first-letter:uppercase"
            >
              {day.label}
            </h2>
            <ul
              role="list"
              className="grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage"
            >
              {day.items.map((item) => {
                const Icon = ICONS[item.type];
                const content = (
                  <>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full",
                        TONES[item.type],
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="grid min-w-0 flex-1 gap-0.5">
                      <span
                        className={cn(
                          "break-words first-letter:uppercase",
                          item.fresh && "font-semibold",
                        )}
                      >
                        {item.text}
                      </span>
                      {item.detail ? (
                        <span className="text-sm break-words text-encre-douce">{item.detail}</span>
                      ) : null}
                      <span className="flex items-center gap-2 text-xs text-encre-douce tabular">
                        {formatLocal(item.at, "HH:mm")}
                        {item.fresh ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-encre">
                            <span
                              aria-hidden="true"
                              className="size-2 rounded-full bg-orange-bande"
                            />
                            {t("new")}
                          </span>
                        ) : null}
                      </span>
                    </span>
                    {item.grade ? (
                      <GradeMark grade={item.grade} label={t("grade")} className="shrink-0" />
                    ) : null}
                  </>
                );
                return (
                  <li key={item.id} className={cn("bg-surface", item.fresh && "bg-lavis-bleu/50")}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex min-h-16 items-start gap-3 px-4 py-3 hover:bg-sunken"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="flex min-h-16 items-start gap-3 px-4 py-3">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
