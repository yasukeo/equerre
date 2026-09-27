import { Paperclip, Users } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { InboxEntry } from "@/lib/chat/queries";
import { formatLocal, localDateKey } from "@/lib/dates";
import { cn } from "@/lib/utils";

/** Conversations, the latest first, each with its last message and what she has not read. */
export async function InboxList({
  entries,
  viewerId,
  href,
  title,
  profileHref,
}: {
  entries: InboxEntry[];
  viewerId: string;
  href: (entry: InboxEntry) => string;
  title: (entry: InboxEntry) => string;
  /** The tutor's one-click way to a student's file. */
  profileHref?: (entry: InboxEntry) => string | null;
}) {
  const t = await getTranslations("chat");
  const today = localDateKey(new Date());

  return (
    <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
      {entries.map((entry) => {
        const name = title(entry);
        const profile = profileHref?.(entry) ?? null;
        const preview = entry.lastBody
          ? entry.lastBody
          : entry.lastFiles > 0
            ? t("filesOnly", { count: entry.lastFiles })
            : t("noMessage");
        const who =
          entry.lastSenderId === viewerId
            ? t("you")
            : entry.group && entry.lastSenderName
              ? entry.lastSenderName.split(" ")[0]
              : null;
        return (
          <li key={entry.conversationId} className="flex items-stretch gap-2">
            <Link
              href={href(entry)}
              className="grid min-h-16 min-w-0 flex-1 grid-cols-1 content-center gap-0.5 py-3 hover:bg-sunken"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span
                  className={cn(
                    "flex min-w-0 items-center gap-1.5 truncate",
                    entry.unread > 0 ? "font-semibold" : "font-medium",
                  )}
                >
                  {entry.group ? (
                    <Users aria-hidden="true" className="size-4 shrink-0 text-encre-douce" />
                  ) : null}
                  <span className="truncate">{name}</span>
                </span>
                {entry.lastMessageAt ? (
                  <span className="shrink-0 text-xs text-encre-douce tabular">
                    {localDateKey(entry.lastMessageAt) === today
                      ? formatLocal(entry.lastMessageAt, "HH:mm")
                      : formatLocal(entry.lastMessageAt, "d MMM")}
                  </span>
                ) : null}
              </span>
              <span className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-1 truncate text-sm text-encre-douce">
                  {entry.lastFiles > 0 && entry.lastBody ? (
                    <Paperclip aria-hidden="true" className="size-3.5 shrink-0" />
                  ) : null}
                  <span className="truncate">{who ? `${who} : ${preview}` : preview}</span>
                </span>
                {entry.unread > 0 ? (
                  <span className="inline-flex min-w-6 shrink-0 items-center justify-center rounded-full bg-encre px-1.5 text-xs font-semibold text-papier tabular">
                    <span aria-hidden="true">{entry.unread}</span>
                    <span className="sr-only">{t("unread", { count: entry.unread })}</span>
                  </span>
                ) : null}
              </span>
            </Link>
            {profile ? (
              <Link
                href={profile}
                aria-label={t("profileOf", { name })}
                className="inline-flex min-h-11 shrink-0 items-center self-center px-2 text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
              >
                {t("profile")}
              </Link>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
