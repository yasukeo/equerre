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
import { formatLocal, localDateKey } from "@/lib/dates";
import { RefreshOnReturn } from "@/components/chat/inbox-live";
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
        <p className="rounded-md border border-dashed border-trait px-4 py-5">
          {role === "tutor" ? t("emptyTutor") : t("emptyStudent")}
        </p>
      </>
    );
  }

  return (
    <>
      <RefreshOnReturn />
      {upTo && unread > 0 ? <MarkSeen upTo={upTo} /> : null}
      <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
        {items.map((item) => {
          const Icon = ICONS[item.type];
          const when =
            localDateKey(item.at) === today
              ? formatLocal(item.at, "HH:mm")
              : formatLocal(item.at, "d MMM, HH:mm");
          const content = (
            <>
              <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-encre-douce" />
              <span className="grid min-w-0 flex-1 gap-0.5">
                <span className={cn("first-letter:uppercase", item.fresh && "font-semibold")}>
                  {item.fresh ? (
                    <span className="me-2 inline-flex rounded-sm border border-trait px-1.5 text-xs font-medium">
                      {t("new")}
                    </span>
                  ) : null}
                  {item.text}
                </span>
                {item.detail ? (
                  <span className="text-sm text-encre-douce">{item.detail}</span>
                ) : null}
                <span className="text-xs text-encre-douce tabular">{when}</span>
              </span>
              {item.grade ? (
                <GradeMark grade={item.grade} label={t("grade")} className="shrink-0" />
              ) : null}
            </>
          );
          return (
            <li key={item.id}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex min-h-16 items-start gap-3 py-3 hover:bg-sunken"
                >
                  {content}
                </Link>
              ) : (
                <div className="flex min-h-16 items-start gap-3 py-3">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
