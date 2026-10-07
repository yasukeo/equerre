import { ArrowLeft, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { Suspense } from "react";
import { Thread } from "@/components/chat/thread";
import { Initials } from "@/components/initials";
import { siteConfig } from "@/config/site";
import { requireViewer } from "@/lib/auth";
import { getConversationTitle, getThread } from "@/lib/chat/queries";

// Each conversation has its own title: moving from one to another is announced.
export async function generateMetadata({
  params,
}: PageProps<"/eleve/messages/[id]">): Promise<Metadata> {
  // The title reads the session, whose expiry is checked against the clock.
  await connection();
  const [{ id }, t] = await Promise.all([params, getTranslations("chat")]);
  const conversation = /^[0-9a-f-]{36}$/i.test(id) ? await getConversationTitle(id) : null;
  const name = conversation?.group ?? (conversation ? siteConfig.tutorName : null);
  return { title: name ? t("titleWith", { name }) : t("title") };
}

export default async function StudentConversationPage({
  params,
}: PageProps<"/eleve/messages/[id]">) {
  const t = await getTranslations("chat");
  return (
    <div data-thread className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <Link
        href="/eleve/messages"
        className="-ms-1 inline-flex min-h-11 items-center gap-1.5 justify-self-start rounded-full ps-1 pe-3 text-sm text-encre-douce hover:text-encre lg:hidden"
      >
        <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <StudentConversation params={params} />
      </Suspense>
    </div>
  );
}

async function StudentConversation({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireViewer("student");
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  // Someone else's conversation, or one from before she joined, simply does not exist for her.
  const thread = await getThread(id, viewer.id);
  if (!thread) notFound();

  return (
    <>
      <header className="flex items-center gap-3 rounded-2xl border border-quadrillage bg-surface px-4 py-3">
        {thread.group ? (
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-fond text-violet-texte"
          >
            <Users className="size-5" />
          </span>
        ) : (
          <Initials name={siteConfig.tutorName} />
        )}
        <h1 className="min-w-0 text-xl font-semibold break-words">
          {thread.group?.name ?? siteConfig.tutorName}
        </h1>
      </header>
      <Thread
        conversationId={thread.id}
        viewerId={viewer.id}
        viewerName={viewer.fullName}
        otherName={siteConfig.tutorName}
        initial={thread.messages}
        hasOlder={thread.hasOlder}
        otherReadAt={thread.otherReadAt}
        isGroup={thread.group !== null}
      />
    </>
  );
}
