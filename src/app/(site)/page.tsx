import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/config/site";
import { formatLocalDate, withFirst } from "@/lib/dates";
import { listPublicCourse } from "@/lib/lesson/queries";
import { renderMath } from "@/lib/lesson/math";
import { formatHours, formatMad } from "@/lib/payments/format";
import { listPublishedPosts } from "@/lib/posts/queries";
import {
  getSiteProfile,
  listLevelsByCycle,
  listOfferedModes,
  listOfferedPlans,
} from "@/lib/site/queries";
import { whatsappHref } from "@/lib/site/whatsapp";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";
// The hero sets maths: KaTeX's stylesheet comes with this page, not with every public page.
import "katex/dist/katex.min.css";

// The front door (D-089, D-090): who teaches, how, where, for how much, and how to write to
// her. A parent decides in fifteen seconds whether to trust her; everything here is her own
// data, cached and redrawn when she changes it, and nothing is invented about results.

const SECTION = "mx-auto w-full max-w-6xl px-4 sm:px-8";
const H2 =
  "text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-[1.15] font-semibold [font-variation-settings:'HEXP'_70]";
const LINK =
  "inline-flex min-h-11 items-center underline decoration-trait underline-offset-4 hover:decoration-encre";

const CYCLES = ["college", "tronc_commun", "1bac", "2bac"] as const;
const isCycle = (cycle: string): cycle is (typeof CYCLES)[number] =>
  (CYCLES as readonly string[]).includes(cycle);

// The worked example of the hero: a 2BAC limit, each step with the reason for it.
const EXAMPLE = {
  statement: String.raw`\lim_{x \to +\infty} \frac{2x^2 + 1}{x^2 - 3}`,
  steps: [
    String.raw`= \lim_{x \to +\infty} \frac{x^2\left(2 + \frac{1}{x^2}\right)}{x^2\left(1 - \frac{3}{x^2}\right)}`,
    String.raw`= \lim_{x \to +\infty} \frac{2 + \frac{1}{x^2}}{1 - \frac{3}{x^2}}`,
    String.raw`= \frac{2}{1} = 2`,
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const [t, profile] = await Promise.all([getTranslations("site.home"), getSiteProfile()]);
  return {
    // Her name and her city, not the product's: that is what a parent searches for.
    title: {
      absolute: profile.city
        ? t("metaTitleCity", { tutor: siteConfig.tutorName, city: profile.city })
        : t("metaTitle", { tutor: siteConfig.tutorName }),
    },
    description: profile.tagline ?? t("lead"),
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [t, profile, plans, levels, modes, posts, course] = await Promise.all([
    getTranslations("site.home"),
    getSiteProfile(),
    listOfferedPlans(),
    listLevelsByCycle(),
    listOfferedModes(),
    listPublishedPosts(),
    listPublicCourse(),
  ]);
  const whatsapp = profile.whatsapp ? whatsappHref(profile.whatsapp) : null;
  const lessonCount = course.reduce(
    (sum, level) =>
      sum + level.chapters.reduce((count, chapter) => count + chapter.lessons.length, 0),
    0,
  );
  const exampleNotes = [t("example.step1"), t("example.step2"), t("example.step3")];
  const place = (mode: (typeof modes)[number]) =>
    mode === "chez_prof"
      ? profile.city
        ? t("places.chez_profCity", { city: profile.city })
        : t("places.chez_prof")
      : mode === "domicile"
        ? profile.areas
          ? t("places.domicileAreas", { areas: profile.areas })
          : t("places.domicile")
        : t("places.en_ligne");

  // What a search engine can say about her, from her own data only.
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.tutorName,
    jobTitle: t("jobTitle"),
    ...(profile.city
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: profile.city,
            addressCountry: "MA",
          },
        }
      : {}),
    knowsAbout: t("knowsAbout"),
  };

  return (
    <main id="contenu" className="flex-1">
      <script
        type="application/ld+json"
        // JSON.stringify escapes nothing HTML cares about but « < »: done by hand.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replaceAll("<", "\\u003c") }}
      />

      {/* The page sits on squared paper, fading out below the fold (DESIGN.md). */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--quadrillage)_1px,transparent_1px),linear-gradient(90deg,var(--quadrillage)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black_40%,transparent_95%)] bg-size-[20px_20px]"
        />
        <div
          className={cn(
            SECTION,
            "relative grid gap-12 py-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:py-20",
          )}
        >
          <div className="grid content-start gap-6">
            <p className="text-encre-douce">
              {profile.city
                ? t("whoCity", { tutor: siteConfig.tutorName, city: frenchSpaces(profile.city) })
                : t("who", { tutor: siteConfig.tutorName })}
            </p>
            <h1 className="text-[clamp(2.25rem,1.6rem+3vw,3.75rem)] leading-[1.05] font-semibold text-balance [font-variation-settings:'HEXP'_70] sm:[font-variation-settings:'HEXP'_100]">
              {t("title")}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-encre-douce">
              {profile.tagline ? frenchSpaces(profile.tagline) : t("lead")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {whatsapp ? (
                <a href={whatsapp} className={buttonVariants({ size: "lg" })}>
                  <MessageCircle aria-hidden="true" />
                  {t("whatsapp")}
                </a>
              ) : null}
              <Link
                href="#tarifs"
                className={buttonVariants({
                  variant: whatsapp ? "outline" : "default",
                  size: "lg",
                })}
              >
                {t("prices")}
              </Link>
              <Link href="/connexion" className={cn(LINK, "px-2")}>
                {t("signIn")}
              </Link>
            </div>
          </div>

          {/* The signature: a limit worked on a copybook page, each step with its reason,
              and the tutor's remark under it, past the margin. */}
          <figure className="relative overflow-hidden rounded-md border border-quadrillage bg-surface bg-[linear-gradient(var(--quadrillage)_1px,transparent_1px),linear-gradient(90deg,var(--quadrillage)_1px,transparent_1px)] bg-size-[20px_20px]">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 start-10 w-px bg-stylo-rouge/70 sm:start-16"
            />
            <figcaption className="ps-14 pe-4 pt-5 text-sm font-medium text-encre-douce sm:ps-20">
              {t("example.label")}
            </figcaption>
            <div className="grid gap-4 ps-14 pe-4 pt-3 pb-6 sm:ps-20">
              <p className="text-sm">{t("example.statement")}</p>
              <div
                className="overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: renderMath(EXAMPLE.statement, true) }}
              />
              <ol role="list" className="grid gap-3">
                {EXAMPLE.steps.map((step, index) => (
                  <li key={step} className="grid gap-1">
                    <div
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(step, true) }}
                    />
                    <p className="text-sm text-encre-douce">{exampleNotes[index]}</p>
                  </li>
                ))}
              </ol>
              <p className="border-t border-quadrillage pt-3 text-sm font-medium">
                {t("example.margin")}
              </p>
            </div>
          </figure>
        </div>
      </div>

      {/* A real sequence, so it is numbered; the list says the numbers already. */}
      <section aria-labelledby="how" className={cn(SECTION, "grid gap-8 py-14")}>
        <h2 id="how" className={H2}>
          {t("howHeading")}
        </h2>
        <ol role="list" className="grid gap-8 md:grid-cols-3">
          {(["contact", "sessions", "between"] as const).map((step, index) => (
            <li key={step} className="grid content-start gap-2 border-t border-encre pt-4">
              <p aria-hidden="true" className="text-sm font-semibold text-encre-douce tabular">
                {index + 1}
              </p>
              <h3 className="text-lg font-semibold">{t(`how.${step}.title`)}</h3>
              <p className="leading-relaxed text-encre-douce">{t(`how.${step}.body`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {levels.length > 0 || modes.length > 0 ? (
        <div className={cn(SECTION, "grid gap-12 py-14 md:grid-cols-2")}>
          {levels.length > 0 ? (
            <section aria-labelledby="levels" className="grid content-start gap-6">
              <h2 id="levels" className={H2}>
                {t("levelsHeading")}
              </h2>
              <dl className="grid gap-4">
                {levels.map((group) => (
                  <div key={group.cycle} className="grid gap-1 border-t border-quadrillage pt-3">
                    <dt className="font-semibold">
                      {isCycle(group.cycle) ? t(`cycle.${group.cycle}`) : group.cycle}
                    </dt>
                    <dd className="text-encre-douce">
                      {group.levels.map((level) => level.label).join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
          {modes.length > 0 ? (
            <section aria-labelledby="places" className="grid content-start gap-6">
              <h2 id="places" className={H2}>
                {t("placesHeading")}
              </h2>
              <ul role="list" className="grid gap-4">
                {modes.map((mode) => (
                  <li key={mode} className="border-t border-quadrillage pt-3">
                    {frenchSpaces(place(mode))}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}

      {/* Always there, so « Tarifs » in the header always leads somewhere. */}
      <section
        id="tarifs"
        aria-labelledby="prices"
        className={cn(SECTION, "grid scroll-mt-4 gap-6 py-14")}
      >
        <div className="grid gap-2">
          <h2 id="prices" className={H2}>
            {t("pricesHeading")}
          </h2>
          <p className="max-w-2xl text-encre-douce">
            {plans.length > 0 ? t("pricesLead") : t("pricesEmpty")}
          </p>
        </div>
        {plans.length > 0 ? (
          <ul
            role="list"
            className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage sm:grid-cols-2 lg:grid-cols-4"
          >
            {plans.map((plan) => (
              <li key={plan.id} className="grid content-start gap-2 bg-surface p-5">
                <h3 className="font-semibold">{frenchSpaces(plan.name)}</h3>
                <p className="text-2xl font-semibold tabular">{formatMad(plan.priceMad)}</p>
                <p className="text-sm text-encre-douce">
                  {plan.kind === "hour_pack"
                    ? t("pack", { hours: formatHours(plan.hours ?? 0) })
                    : t("subscription", {
                        months: plan.periodMonths ?? 1,
                        scope: t(`scope.${plan.scope}`),
                      })}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {profile.bio ? (
        <section aria-labelledby="about" className={cn(SECTION, "grid gap-6 py-14")}>
          <h2 id="about" className={H2}>
            {t("aboutHeading")}
          </h2>
          <div className="grid max-w-2xl gap-4 text-lg leading-relaxed">
            {profile.bio
              .split(/(?:\r?\n){2,}/)
              .filter((paragraph) => paragraph.trim())
              .map((paragraph) => (
                <p key={paragraph} className="whitespace-pre-line">
                  {frenchSpaces(paragraph)}
                </p>
              ))}
          </div>
        </section>
      ) : null}

      {posts.length > 0 || lessonCount > 0 ? (
        <div className={cn(SECTION, "grid gap-12 py-14 md:grid-cols-2")}>
          {posts.length > 0 ? (
            <section aria-labelledby="advice" className="grid content-start gap-4">
              <h2 id="advice" className={H2}>
                {t("adviceHeading")}
              </h2>
              <ul role="list" className="grid gap-2">
                {posts.slice(0, 3).map((post) => (
                  <li key={post.slug} className="grid border-t border-quadrillage pt-1">
                    <Link href={`/conseils/${post.slug}`} className={cn(LINK, "font-semibold")}>
                      {frenchSpaces(post.title)}
                    </Link>
                    <p className="text-sm text-encre-douce">
                      {withFirst(formatLocalDate(post.publishedAt))}
                    </p>
                  </li>
                ))}
              </ul>
              <Link href="/conseils" className={cn(LINK, "justify-self-start")}>
                {t("adviceAll")}
              </Link>
            </section>
          ) : null}
          {lessonCount > 0 ? (
            <section aria-labelledby="courses" className="grid content-start gap-4">
              <h2 id="courses" className={H2}>
                {t("coursesHeading")}
              </h2>
              <p className="text-encre-douce">{t("coursesLead")}</p>
              <ul role="list" className="grid gap-2">
                {course.slice(0, 4).map((level) => (
                  <li key={level.code} className="border-t border-quadrillage pt-2">
                    <span className="font-semibold">{level.label}</span>
                    <span className="text-encre-douce">
                      {" · "}
                      {level.chapters.map((chapter) => chapter.title).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/cours" className={cn(LINK, "justify-self-start")}>
                {t("coursesAll")}
              </Link>
            </section>
          ) : null}
        </div>
      ) : null}

      <section aria-labelledby="start" className={cn(SECTION, "pt-14 pb-20")}>
        <div className="grid gap-4 border-t-2 border-encre pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="grid gap-2">
            <h2 id="start" className={H2}>
              {t("contactHeading")}
            </h2>
            <p className="max-w-xl text-lg text-encre-douce">
              {whatsapp ? t("contactBody") : t("contactNoWhatsapp")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {whatsapp ? (
              <a href={whatsapp} className={buttonVariants({ size: "lg" })}>
                <MessageCircle aria-hidden="true" />
                {t("whatsapp")}
              </a>
            ) : null}
            <p className="flex flex-wrap items-center gap-x-2">
              <span className="text-encre-douce">{t("alreadyIn")}</span>
              <Link href="/connexion" className={LINK}>
                {t("signIn")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
