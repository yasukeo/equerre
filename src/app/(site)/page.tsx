import {
  ArrowRight,
  BookOpen,
  FileCheck2,
  House,
  Lightbulb,
  MapPin,
  MessageCircle,
  MonitorPlay,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/config/site";
import { formatLocalDate, withFirst } from "@/lib/dates";
import { cycleHue, EXAM_HUE, hue, type HueClasses } from "@/lib/design/colors";
import { listExamProgrammes } from "@/lib/exams/queries";
import { listProgrammes } from "@/lib/lesson/queries";
import { programmeName } from "@/lib/lesson/streams";
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
  "text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-[1.15] font-semibold [font-variation-settings:'HEXP'_45]";
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
  const [t, profile, plans, levels, modes, posts, course, exams] = await Promise.all([
    getTranslations("site.home"),
    getSiteProfile(),
    listOfferedPlans(),
    listLevelsByCycle(),
    listOfferedModes(),
    listPublishedPosts(),
    listProgrammes(),
    listExamProgrammes(),
  ]);
  const whatsapp = profile.whatsapp ? whatsappHref(profile.whatsapp) : null;
  const lessonCount = course.reduce((sum, programme) => sum + programme.documentCount, 0);
  const readyProgrammes = course.filter((programme) => programme.readyCount > 0);
  const papers = exams.reduce((sum, programme) => sum + programme.paperCount, 0);
  // « de 2008 à 2022 », or « en 2022 » when every paper is from one year.
  const yearSpan = (first: number, latest: number) =>
    first === latest
      ? t("doors.exams.oneYear", { year: latest })
      : t("doors.exams.years", { first, latest });
  // What anyone can open without an account, each in its colour across the site (D-100).
  const doors: Door[] = [
    ...(lessonCount > 0
      ? [
          {
            href: "/cours",
            icon: BookOpen,
            colour: hue("bleu"),
            title: t("doors.courses.title"),
            body: t("doors.courses.body", { count: lessonCount }),
          },
        ]
      : []),
    ...(papers > 0
      ? [
          {
            href: "/examens",
            icon: FileCheck2,
            colour: hue(EXAM_HUE),
            title: t("doors.exams.title"),
            body: t("doors.exams.body", {
              count: papers,
              years: yearSpan(
                Math.min(...exams.map((programme) => programme.firstYear)),
                Math.max(...exams.map((programme) => programme.latestYear)),
              ),
            }),
          },
        ]
      : []),
    ...(posts.length > 0
      ? [
          {
            href: "/conseils",
            icon: Lightbulb,
            colour: hue("vert"),
            title: t("doors.advice.title"),
            body: t("doors.advice.body", { count: posts.length }),
          },
        ]
      : []),
  ];
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
            <p className="inline-flex items-center gap-2 justify-self-start rounded-2xl bg-bleu-fond px-3 py-1 text-sm font-medium text-bleu-texte">
              <span aria-hidden="true" className="size-2 rounded-full bg-bleu" />
              {profile.city
                ? t("whoCity", { tutor: siteConfig.tutorName, city: frenchSpaces(profile.city) })
                : t("who", { tutor: siteConfig.tutorName })}
            </p>
            <h1 className="text-[clamp(2.25rem,1.6rem+3vw,3.75rem)] leading-[1.05] font-semibold text-balance [font-variation-settings:'HEXP'_45]">
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

      {/* Free to open, without an account: the doors to the course, the exams, the advice. */}
      {doors.length > 0 ? (
        <section aria-labelledby="doors" className={cn(SECTION, "grid gap-6 py-10")}>
          <h2 id="doors" className={H2}>
            {t("doorsHeading")}
          </h2>
          <ul role="list" className={cn("grid gap-3", doors.length > 1 ? "md:grid-cols-3" : null)}>
            {doors.map((door) => (
              <li key={door.href} className="grid">
                <Link
                  href={door.href}
                  className={cn(
                    "group relative grid min-h-44 content-between gap-6 overflow-hidden rounded-2xl p-5",
                    door.colour.band,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.09)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.09)_1px,transparent_1px)] bg-[size:22px_22px]"
                  />
                  <span className="relative flex items-start justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-white/15">
                      <door.icon aria-hidden="true" className="size-6" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex size-9 items-center justify-center rounded-full bg-white text-encre-fixe transition-transform group-hover:translate-x-0.5"
                    >
                      <ArrowRight className="size-4" />
                    </span>
                  </span>
                  <span className="relative grid gap-1">
                    <span className="text-xl font-semibold">{door.title}</span>
                    <span className="text-white">{door.body}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* A real sequence, so it is numbered; the list says the numbers already. */}
      <section aria-labelledby="how" className={cn(SECTION, "grid gap-8 py-14")}>
        <h2 id="how" className={H2}>
          {t("howHeading")}
        </h2>
        <ol role="list" className="grid gap-3 md:grid-cols-3">
          {(["contact", "sessions", "between"] as const).map((step, index) => (
            <li
              key={step}
              className="grid content-start gap-3 rounded-2xl border border-quadrillage bg-surface p-5"
            >
              <p
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-full bg-bleu-fond text-lg font-semibold text-bleu-texte tabular"
              >
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
              {/* Each level in the colour of its notebook cover, as on the course pages. */}
              <dl className="grid gap-2.5">
                {levels.map((group) => {
                  const colour = cycleHue(group.cycle);
                  return (
                    <div
                      key={group.cycle}
                      className={cn(
                        "grid gap-2 rounded-2xl border border-s-4 border-quadrillage bg-surface px-4 py-3",
                        colour.edge,
                      )}
                    >
                      <dt className={cn("font-semibold", colour.text)}>
                        {isCycle(group.cycle) ? t(`cycle.${group.cycle}`) : group.cycle}
                      </dt>
                      <dd>
                        <ul role="list" className="flex flex-wrap gap-1.5">
                          {group.levels.map((level) => (
                            <li
                              key={level.code}
                              className={cn("rounded-full px-2.5 py-0.5 text-sm", colour.chip)}
                            >
                              {level.label}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ) : null}
          {modes.length > 0 ? (
            <section aria-labelledby="places" className="grid content-start gap-6">
              <h2 id="places" className={H2}>
                {t("placesHeading")}
              </h2>
              <ul role="list" className="grid gap-2.5">
                {modes.map((mode) => {
                  const Icon = PLACE_ICON[mode];
                  return (
                    <li
                      key={mode}
                      className="flex items-center gap-3 rounded-2xl border border-quadrillage bg-surface px-4 py-3"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-bleu-fond text-bleu-texte"
                      >
                        <Icon className="size-5" />
                      </span>
                      {frenchSpaces(place(mode))}
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}

      {/* Always there, so « Tarifs » in the footer always leads somewhere. */}
      <section id="tarifs" aria-labelledby="prices" className={cn(SECTION, "grid gap-6 py-14")}>
        <div className="grid gap-2">
          <h2 id="prices" className={H2}>
            {t("pricesHeading")}
          </h2>
          <p className="max-w-2xl text-encre-douce">
            {plans.length > 0 ? t("pricesLead") : t("pricesEmpty")}
          </p>
        </div>
        {plans.length > 0 ? (
          <ul role="list" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className="grid content-start gap-2 rounded-2xl border border-t-4 border-quadrillage border-t-bleu bg-surface p-5"
              >
                <h3 className="font-semibold">{frenchSpaces(plan.name)}</h3>
                <p className="text-3xl font-semibold text-bleu tabular">
                  {formatMad(plan.priceMad)}
                </p>
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
        <section aria-labelledby="about" className={cn(SECTION, "py-14")}>
          <div className="grid gap-6 rounded-2xl bg-sunken p-6 sm:p-10">
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
              <ul role="list" className="grid gap-2.5">
                {posts.slice(0, 3).map((post) => (
                  <li key={post.slug} className="grid">
                    <Link
                      href={`/conseils/${post.slug}`}
                      className="grid gap-0.5 rounded-2xl border border-s-4 border-quadrillage border-s-vert bg-surface px-4 py-3 hover:border-trait"
                    >
                      <span className="font-semibold">{frenchSpaces(post.title)}</span>
                      <span className="text-sm text-encre-douce">
                        {withFirst(formatLocalDate(post.publishedAt))}
                      </span>
                    </Link>
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
              <ul role="list" className="grid gap-2.5">
                {readyProgrammes.slice(0, 4).map((programme) => {
                  const colour = cycleHue(programme.cycle);
                  return (
                    <li key={programme.code} className="grid">
                      <Link
                        href={`/cours/${programme.slug}`}
                        className={cn(
                          "flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-s-4 border-quadrillage bg-surface px-4 py-3 font-semibold hover:border-trait",
                          colour.edge,
                        )}
                      >
                        {programmeName(programme.label)}
                        <ArrowRight aria-hidden="true" className={cn("size-4", colour.text)} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="/cours" className={cn(LINK, "justify-self-start")}>
                {t("coursesAll")}
              </Link>
            </section>
          ) : null}
        </div>
      ) : null}

      <section aria-labelledby="start" className={cn(SECTION, "pt-6 pb-20")}>
        <div className="relative overflow-hidden rounded-3xl bg-bleu-bande text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.09)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.09)_1px,transparent_1px)] bg-[size:22px_22px]"
          />
          <div className="relative grid gap-6 p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="grid gap-2">
              <h2 id="start" className={H2}>
                {t("contactHeading")}
              </h2>
              <p className="max-w-xl text-lg text-white">
                {whatsapp ? t("contactBody") : t("contactNoWhatsapp")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {whatsapp ? (
                <a
                  href={whatsapp}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white text-bleu-bande hover:bg-white/90",
                  )}
                >
                  <MessageCircle aria-hidden="true" />
                  {t("whatsapp")}
                </a>
              ) : null}
              <p className="flex flex-wrap items-center gap-x-2">
                <span className="text-white">{t("alreadyIn")}</span>
                <Link
                  href="/connexion"
                  className="inline-flex min-h-11 items-center font-medium underline decoration-white/60 underline-offset-4 hover:decoration-white"
                >
                  {t("signIn")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type Door = {
  href: string;
  icon: LucideIcon;
  colour: HueClasses;
  title: string;
  body: string;
};

const PLACE_ICON: Record<"chez_prof" | "domicile" | "en_ligne", LucideIcon> = {
  chez_prof: MapPin,
  domicile: House,
  en_ligne: MonitorPlay,
};
