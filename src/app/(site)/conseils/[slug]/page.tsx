import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LessonArticle } from "@/components/lesson-article";
import { siteConfig } from "@/config/site";
import { publicEnv } from "@/lib/env";
import { getPublishedPost, listPublishedPosts } from "@/lib/posts/queries";
// A post sets maths and encadrés like a lesson: their styles come with this page only.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await listPublishedPosts();
  // As for lessons (D-048): the route needs one entry before the first post is published,
  // and the page 404s it like any unknown slug.
  return posts.length > 0 ? posts.map((post) => ({ slug: post.slug })) : [{ slug: "-" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/conseils/[slug]">): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/conseils/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      ...(post.excerpt ? { description: post.excerpt } : {}),
      url: `/conseils/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default function PostPage({ params }: PageProps<"/conseils/[slug]">) {
  // `params` is awaited inside the boundary, as on the lesson pages, so the shell stays one.
  return (
    <main id="contenu" className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-8">
      <Suspense
        fallback={<div aria-hidden="true" className="h-96 animate-pulse rounded-md bg-sunken" />}
      >
        <Post params={params} />
      </Suspense>
    </main>
  );
}

async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  const t = await getTranslations("blog");

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "fr",
    author: { "@type": "Person", name: siteConfig.tutorName },
    mainEntityOfPage: new URL(`/conseils/${post.slug}`, publicEnv.NEXT_PUBLIC_SITE_URL).toString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify escapes nothing HTML cares about but « < »: done by hand.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replaceAll("<", "\\u003c") }}
      />
      <Link
        href="/conseils"
        className="inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="mt-4">
        <LessonArticle
          title={post.title}
          summary={post.excerpt}
          publishedAt={post.publishedAt}
          context={`${t(`category.${post.category}`)} · ${t("minutes", { count: post.minutes })}`}
          content={post.content}
        />
      </div>
    </>
  );
}
