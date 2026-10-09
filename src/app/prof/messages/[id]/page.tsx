import { ArrowLeft, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { Suspense } from "react";
import { Thread } from "@/components/chat/thread";
import { Initials } from "@/components/initials";
import { StudentStatusChip } from "@/components/student-status";
import { requireViewer } from "@/lib/auth";
import { getConversationTitle, getThread } from "@/lib/chat/queries";

// Each conversation has its own title: moving from one to another is announced.
export async function generateMetadata({
  params,
}: PageProps<"/prof/messages/[id]">): Promise<Metadata> {
  // The title reads the session, whose expiry is checked against the clock.
  await connection();
  const [{ id }, t] = await Promise.all([params, getTranslations("chat")]);
  const conversation = /^[0-9a-f-]{36}$/i.test(id) ? await getConversationTitle(id) : null;
  const name = conversation?.student ?? conversation?.group;
  return { title: name ? t("titleWith", { name }) : t("title") };
}

export default async function TutorConversationPage({ params }: PageProps<"/prof/messages/[id]">) {
  const t = await getTranslations("chat");
  return (
    <div data-thread className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <Link
        href="/prof/messages"
        className="-ms-1 inline-flex min-h-11 items-center gap-1.5 justify-self-start rounded-full ps-1 pe-3 text-sm text-encre-douce hover:text-encre lg:hidden"
      >
        <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
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
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-quadrillage bg-surface px-4 py-3">
        {thread.group ? (
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-fond text-violet-texte"
          >
            <Users className="size-5" />
          </span>
        ) : (
          <Initials name={thread.student?.name ?? ""} />
        )}
        <h2 className="min-w-0 text-xl font-semibold break-words">
          {thread.student?.name ?? thread.group?.name}
        </h2>
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
          className="ms-auto inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
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
