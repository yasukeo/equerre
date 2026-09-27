import "katex/dist/katex.min.css";
import { Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Thread } from "@/components/chat/thread";
import { StudentStatusChip } from "@/components/student-status";
import { requireViewer } from "@/lib/auth";
import { getConversationTitle, getThread } from "@/lib/chat/queries";

// Each conversation has its own title: moving from one to another is announced.
export async function generateMetadata({
  params,
}: PageProps<"/prof/messages/[id]">): Promise<Metadata> {
  const [{ id }, t] = await Promise.all([params, getTranslations("chat")]);
  const conversation = /^[0-9a-f-]{36}$/i.test(id) ? await getConversationTitle(id) : null;
  const name = conversation?.student ?? conversation?.group;
  return { title: name ? t("titleWith", { name }) : t("title") };
}

export default async function TutorConversationPage({ params }: PageProps<"/prof/messages/[id]">) {
  const t = await getTranslations("chat");
  return (
    <div className="grid max-w-3xl gap-4">
      <Link
        href="/prof/messages"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <TutorConversation params={params} />
      </Suspense>
    </div>
  );
}

async function TutorConversation({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireViewer("tutor");
  const [{ id }, t, tStatus] = await Promise.all([
    params,
    getTranslations("chat"),
    getTranslations("studentStatus"),
  ]);
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const thread = await getThread(id, viewer.id);
  if (!thread) notFound();

  const stopped = thread.student?.status === "arrete";
  return (
    <>
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-quadrillage pb-3">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          {thread.group ? <Users aria-hidden="true" className="size-5 text-encre-douce" /> : null}
          {thread.student?.name ?? thread.group?.name}
        </h1>
        {thread.student && thread.student.status !== "actif" ? (
          <StudentStatusChip
            status={thread.student.status as "en_pause" | "arrete"}
            label={tStatus(thread.student.status as "en_pause" | "arrete")}
          />
        ) : null}
        <Link
          href={
            thread.student
              ? `/prof/eleves/${thread.student.id}`
              : `/prof/eleves/groupes/${thread.group?.id}`
          }
          className="inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {thread.student ? t("studentFile") : t("groupPage")}
        </Link>
      </header>
      <Thread
        conversationId={thread.id}
        viewerId={viewer.id}
        viewerName={viewer.fullName}
        otherName={thread.student?.name ?? ""}
        initial={thread.messages}
        hasOlder={thread.hasOlder}
        otherReadAt={thread.otherReadAt}
        isGroup={thread.group !== null}
        closedNotice={stopped ? t("stoppedTutor") : undefined}
      />
    </>
  );
}
