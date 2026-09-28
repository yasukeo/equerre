import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { CALLOUT_KINDS, type CalloutKind } from "@/lib/lesson/document";
import { getPostForTutor, POST_CATEGORIES } from "@/lib/posts/queries";
import { PostEditor } from "./post-editor";
// The editor draws the post as the page will: same maths, same encadrés.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

export async function generateMetadata({
  params,
}: PageProps<"/prof/conseils/[id]">): Promise<Metadata> {
  const t = await getTranslations("postsAdmin");
  const { id } = await params;
  const post = z.uuid().safeParse(id).success ? await getPostForTutor(id) : null;
  return { title: post ? post.title : t("title") };
}

export default async function EditPostPage({ params }: PageProps<"/prof/conseils/[id]">) {
  const t = await getTranslations("postEditor");

  return (
    <div className="grid max-w-4xl gap-6">
      <Link
        href="/prof/conseils"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <EditPost params={params} />
      </Suspense>
    </div>
  );
}

async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  await requireViewer("tutor");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const post = await getPostForTutor(id);
  if (!post) notFound();

  const t = await getTranslations("lesson");
  const calloutLabels = Object.fromEntries(
    CALLOUT_KINDS.map((kind) => [kind, t(`callout.${kind}`)]),
  ) as Record<CalloutKind, string>;

  return (
    <>
      <h1 className="text-xl font-semibold">{post.title}</h1>
      <PostEditor
        calloutLabels={calloutLabels}
        categories={POST_CATEGORIES}
        post={{
          id: post.id,
          title: post.title,
          excerpt: post.excerpt ?? "",
          category: post.category,
          status: post.status,
          content: post.content,
          publicPath: `/conseils/${post.slug}`,
        }}
      />
    </>
  );
}
