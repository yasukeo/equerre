import "katex/dist/katex.min.css";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ConversationPicker, InboxLive } from "@/components/chat/inbox-live";
import { InboxList } from "@/components/chat/inbox-list";
import { MessagesPanes } from "@/components/chat/message-panes";
import { requireViewer } from "@/lib/auth";
import { getInbox } from "@/lib/chat/queries";

/** Her conversations beside the one she has open (D-104). */
export default async function TutorMessagesLayout({ children }: LayoutProps<"/prof/messages">) {
  const t = await getTranslations("chat");
  return (
    <MessagesPanes
      title={t("title")}
      className="max-w-6xl"
      list={
        <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
          <TutorInbox />
        </Suspense>
      }
    >
      {children}
    </MessagesPanes>
  );
}

async function TutorInbox() {
  const viewer = await requireViewer("tutor");
  const t = await getTranslations("chat");
  const entries = await getInbox();
  const going = entries.filter((entry) => entry.lastMessageAt !== null);
  // A stopped student reads nothing: nobody to write to there (D-060).
  const others = entries
    .filter((entry) => entry.lastMessageAt === null && entry.student?.status !== "arrete")
    .sort((a, b) =>
      (a.student?.name ?? a.group?.name ?? "").localeCompare(
        b.student?.name ?? b.group?.name ?? "",
        "fr",
      ),
    );

  return (
    <>
      <InboxLive />
      {others.length > 0 ? (
        <ConversationPicker
          options={others.map((entry) => ({
            id: entry.conversationId,
            label: entry.student?.name ?? entry.group?.name ?? "",
            group: entry.group ? "groups" : "students",
          }))}
        />
      ) : null}
      {going.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5">
          {t("noneYet")}
        </p>
      ) : (
        <InboxList
          entries={going}
          viewerId={viewer.id}
          href={(entry) => `/prof/messages/${entry.conversationId}`}
          title={(entry) => entry.student?.name ?? entry.group?.name ?? ""}
          profileHref={(entry) =>
            entry.student
              ? `/prof/eleves/${entry.student.id}`
              : entry.group
                ? `/prof/eleves/groupes/${entry.group.id}`
                : null
          }
        />
      )}
    </>
  );
}
