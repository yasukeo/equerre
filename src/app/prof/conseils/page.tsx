import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PublicationChip } from "@/components/lesson-status";
import { Flash } from "@/components/ui/flash";
import { requireViewer } from "@/lib/auth";
import { formatDate } from "@/lib/payments/format";
import { listPostsForTutor, POST_CATEGORIES } from "@/lib/posts/queries";
import { NewPostForm } from "./new-post-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("postsAdmin");
  return { title: t("title") };
}

export default async function PostsAdminPage({ searchParams }: PageProps<"/prof/conseils">) {
  const t = await getTranslations("postsAdmin");

  return (
    <div className="grid max-w-5xl gap-6">
      <Link
        href="/prof/site"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="max-w-prose text-encre-douce">{t("lead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <Posts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Posts({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireViewer("tutor");
  const [t, tCategory, params, posts] = await Promise.all([
    getTranslations("postsAdmin"),
    getTranslations("blog.category"),
    searchParams,
    listPostsForTutor(),
  ]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="grid gap-4">
        {params.supprime === "1" ? (
          <Flash>
            <p className="font-medium">{t("deleted")}</p>
          </Flash>
        ) : null}
        {posts.length === 0 ? (
          <p className="rounded-md border border-dashed border-trait px-4 py-5">{t("empty")}</p>
        ) : (
          <ul
            role="list"
            className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
          >
            {posts.map((post) => (
              <li key={post.id} className="grid gap-1 bg-surface px-4 py-3">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Link
                    href={`/prof/conseils/${post.id}`}
                    className="inline-flex min-h-11 items-center font-medium underline decoration-trait underline-offset-4 hover:decoration-encre"
                  >
                    {post.title}
                  </Link>
                  <PublicationChip status={post.status} label={t(`status.${post.status}`)} />
                </p>
                <p className="text-sm text-encre-douce">
                  {tCategory(post.category)} · {t("updated", { date: formatDate(post.updatedAt) })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <section
        aria-labelledby="new-post"
        className="grid gap-4 rounded-md border border-quadrillage bg-surface p-4"
      >
        <h2 id="new-post" className="text-base font-semibold">
          {t("newHeading")}
        </h2>
        <NewPostForm categories={POST_CATEGORIES} />
      </section>
    </div>
  );
}
