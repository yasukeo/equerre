import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ConversationPicker, InboxLive } from "@/components/chat/inbox-live";
import { InboxList } from "@/components/chat/inbox-list";
import { requireViewer } from "@/lib/auth";
import { getInbox } from "@/lib/chat/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("chat");
  return { title: t("title") };
}

export default async function TutorMessagesPage() {
  const t = await getTranslations("chat");
  return (
    <div className="grid max-w-3xl gap-6">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <TutorInbox />
      </Suspense>
    </div>
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
    <div className="grid gap-8">
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
        <p className="rounded-md border border-dashed border-trait px-4 py-5">{t("noneYet")}</p>
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
    </div>
  );
}
