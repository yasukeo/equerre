import { Paperclip, Users } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Initials } from "@/components/initials";
import type { InboxEntry } from "@/lib/chat/queries";
import { renderChatPreview } from "@/lib/chat/text";
import { formatLocal, localDateKey } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { InboxLink } from "./message-panes";

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
    <ul
      role="list"
      className="grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage"
    >
      {entries.map((entry) => {
        const name = title(entry);
        const profile = profileHref?.(entry) ?? null;
        const who =
          entry.lastSenderId === viewerId
            ? t("you")
            : entry.group && entry.lastSenderName
              ? entry.lastSenderName.split(" ")[0]
              : null;
        return (
          <li key={entry.conversationId} className="flex items-stretch bg-surface">
            <InboxLink
              href={href(entry)}
              conversationId={entry.conversationId}
              className="flex min-h-16 min-w-0 flex-1 items-center gap-3 px-3 py-3 hover:bg-sunken"
            >
              {entry.group ? (
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-fond text-violet-texte"
                >
                  <Users className="size-5" />
                </span>
              ) : (
                <Initials name={name} />
              )}
              <span className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] gap-0.5">
                <span className="flex items-baseline justify-between gap-3">
                  <span
                    className={cn(
                      "min-w-0 truncate",
                      entry.unread > 0 ? "font-semibold" : "font-medium",
                    )}
                  >
                    {name}
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
                  <span
                    className={cn(
                      "flex min-w-0 items-center gap-1 text-sm",
                      entry.unread > 0 ? "text-encre" : "text-encre-douce",
                    )}
                  >
                    {entry.lastFiles > 0 && entry.lastBody ? (
                      <Paperclip aria-hidden="true" className="size-3.5 shrink-0" />
                    ) : null}
                    <span className="chat-preview truncate">
                      {who ? `${who} : ` : null}
                      {entry.lastBody
                        ? renderChatPreview(entry.lastBody)
                        : entry.lastFiles > 0
                          ? t("filesOnly", { count: entry.lastFiles })
                          : t("noMessage")}
                    </span>
                  </span>
                  {entry.unread > 0 ? (
                    <span className="inline-flex min-w-6 shrink-0 items-center justify-center rounded-full bg-orange-bande px-1.5 text-xs font-semibold text-white tabular">
                      <span aria-hidden="true">{entry.unread}</span>
                      <span className="sr-only">{t("unread", { count: entry.unread })}</span>
                    </span>
                  ) : null}
                </span>
              </span>
            </InboxLink>
            {profile ? (
              <Link
                href={profile}
                aria-label={t("profileOf", { name })}
                className="inline-flex min-h-11 shrink-0 items-center self-center px-3 text-sm text-encre-douce underline decoration-trait underline-offset-4 hover:text-encre hover:decoration-encre"
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
