import "katex/dist/katex.min.css";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { InboxLive } from "@/components/chat/inbox-live";
import { InboxList } from "@/components/chat/inbox-list";
import { MessagesPanes } from "@/components/chat/message-panes";
import { siteConfig } from "@/config/site";
import { requireViewer } from "@/lib/auth";
import { getInbox } from "@/lib/chat/queries";

/** Her conversations beside the one she has open (D-104). */
export default async function StudentMessagesLayout({ children }: LayoutProps<"/eleve/messages">) {
  const t = await getTranslations("chat");
  return (
    <MessagesPanes
      title={t("title")}
      className="mx-auto max-w-5xl"
      list={
        <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-2xl bg-sunken" />}>
          <StudentInbox />
        </Suspense>
      }
    >
      {children}
    </MessagesPanes>
  );
}

async function StudentInbox() {
  const viewer = await requireViewer("student");
  const t = await getTranslations("chat");
  // Her own conversation with the tutor first, then her groups': all of them, written in or not.
  const entries = await getInbox();

  if (entries.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5">
        {t("stopped")}
      </p>
    );
  }
  return (
    <>
      <InboxLive />
      <InboxList
        entries={entries}
        viewerId={viewer.id}
        href={(entry) => `/eleve/messages/${entry.conversationId}`}
        title={(entry) => entry.group?.name ?? siteConfig.tutorName}
      />
    </>
  );
}
