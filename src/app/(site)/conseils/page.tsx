import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { formatLocalDate, withFirst } from "@/lib/dates";
import { listPublishedPosts, POST_CATEGORIES } from "@/lib/posts/queries";
import { frenchSpaces } from "@/lib/typography";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return { title: t("title"), description: t("lead"), alternates: { canonical: "/conseils" } };
}

/** The blog (D-089): every published post, by theme, newest first within each. */
export default async function BlogPage() {
  const [t, posts] = await Promise.all([getTranslations("blog"), listPublishedPosts()]);
  const themes = POST_CATEGORIES.map((category) => ({
    category,
    posts: posts.filter((post) => post.category === category),
  })).filter((theme) => theme.posts.length > 0);

  return (
    <main id="contenu" className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
      <h1 className="text-[clamp(2rem,1.5rem+2.5vw,3rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-encre-douce">{t("lead")}</p>

      {themes.length === 0 ? (
        <div className="mt-10 grid gap-2 rounded-md border border-dashed border-trait px-4 py-5">
          <p>{t("empty")}</p>
          <Link
            href="/cours"
            className="inline-flex min-h-11 items-center justify-self-start underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("toCourses")}
          </Link>
        </div>
      ) : (
        <>
          {themes.length > 1 ? (
            <nav aria-label={t("byCategory")} className="mt-8">
              <ul role="list" className="flex flex-wrap gap-x-6">
                {themes.map((theme) => (
                  <li key={theme.category}>
                    <a
                      href={`#${theme.category}`}
                      className="inline-flex min-h-11 items-center underline decoration-trait underline-offset-4 hover:decoration-encre"
                    >
                      {t(`category.${theme.category}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {themes.map((theme) => (
            <section
              key={theme.category}
              id={theme.category}
              aria-labelledby={`${theme.category}-heading`}
              className="mt-12 grid scroll-mt-4 gap-4"
            >
              <h2 id={`${theme.category}-heading`} className="text-xl font-semibold">
                {t(`category.${theme.category}`)}
              </h2>
              <ul role="list" className="grid gap-6">
                {theme.posts.map((post) => (
                  <li key={post.slug} className="grid gap-1.5 border-t border-quadrillage pt-4">
                    <Link
                      href={`/conseils/${post.slug}`}
                      className="inline-flex min-h-11 items-center text-lg font-semibold underline decoration-trait underline-offset-4 hover:decoration-encre"
                    >
                      {frenchSpaces(post.title)}
                    </Link>
                    {post.excerpt ? (
                      <p className="text-encre-douce">{frenchSpaces(post.excerpt)}</p>
                    ) : null}
                    <p className="text-sm text-encre-douce">
                      {withFirst(formatLocalDate(post.publishedAt))} ·{" "}
                      {t("minutes", { count: post.minutes })}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </main>
  );
}
