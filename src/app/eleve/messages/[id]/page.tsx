import "katex/dist/katex.min.css";
import { Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Thread } from "@/components/chat/thread";
import { siteConfig } from "@/config/site";
import { requireViewer } from "@/lib/auth";
import { getConversationTitle, getThread } from "@/lib/chat/queries";

// Each conversation has its own title: moving from one to another is announced.
export async function generateMetadata({
  params,
}: PageProps<"/eleve/messages/[id]">): Promise<Metadata> {
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
    <div className="mx-auto grid max-w-2xl gap-4">
      <Link
        href="/eleve/messages"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
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
      <header className="flex items-center gap-2 border-b border-quadrillage pb-3">
        {thread.group ? <Users aria-hidden="true" className="size-5 text-encre-douce" /> : null}
        <h1 className="text-xl font-semibold">{thread.group?.name ?? siteConfig.tutorName}</h1>
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
