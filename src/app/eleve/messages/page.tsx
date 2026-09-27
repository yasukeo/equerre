import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { InboxLive } from "@/components/chat/inbox-live";
import { InboxList } from "@/components/chat/inbox-list";
import { siteConfig } from "@/config/site";
import { requireViewer } from "@/lib/auth";
import { getInbox } from "@/lib/chat/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("chat");
  return { title: t("title") };
}

export default async function StudentMessagesPage() {
  const t = await getTranslations("chat");
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-md bg-sunken" />}>
        <StudentInbox />
      </Suspense>
    </div>
  );
}

async function StudentInbox() {
  const viewer = await requireViewer("student");
  const t = await getTranslations("chat");
  // Her own conversation with the tutor first, then her groups': all of them, written in or not.
  const entries = await getInbox();

  if (entries.length === 0) {
    return <p className="rounded-md border border-dashed border-trait px-4 py-5">{t("stopped")}</p>;
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
