import { ArrowRight, MapPin, MessageCircle, PencilLine, Video } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";
import { GradeMark } from "@/components/grade-mark";
import { LateBadge } from "@/components/late-badge";
import { SessionStatusChip } from "@/components/session-status";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { RefreshOnReturn } from "@/components/chat/inbox-live";
import { countUnread } from "@/lib/chat/queries";
import { formatLocal } from "@/lib/dates";
import { kindHue } from "@/lib/design/colors";
import { getMyGrades, listMyHomework } from "@/lib/homework/queries";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav.student");
  return { title: t("home") };
}

export default function StudentHomePage() {
  return (
    <Suspense fallback={<StudentHomeSkeleton />}>
      <StudentHome />
    </Suspense>
  );
}

async function StudentHome() {
  const viewer = await requireViewer("student");
  const [t, tSession, tKind] = await Promise.all([
    getTranslations("student.home"),
    getTranslations("session"),
    getTranslations("documentKind"),
  ]);
  const supabase = await createClient();
  const now = new Date();
  const nowIso = now.toISOString();

  // RLS narrows every query to this student: their sessions, their groups' sessions,
  // and only the lessons they're allowed to read.
  //
  // "New lessons" means this student's programme plus lessons shared with them (D-094). RLS
  // also lets them read other programmes' public lessons, so filtering happens in the
  // database, before the limit — otherwise public lessons from elsewhere could fill the list.
  const lessonFields =
    "id, slug, title, kind, published_at, chapters!inner(title, programme_code)" as const;
  const [
    sessionsResult,
    levelLessonsResult,
    sharedLessonsResult,
    homework,
    grades,
    tHomework,
    unread,
  ] = await Promise.all([
    supabase
      .from("sessions")
      .select(
        "id, starts_at, ends_at, status, mode, location, meeting_url, group:groups(name), session_type:session_types(name)",
      )
      .gte("ends_at", nowIso)
      .in("status", ["en_attente", "planifiee"])
      .order("starts_at")
      .limit(4),
    viewer.programmeCode
      ? supabase
          .from("lessons")
          .select(lessonFields)
          .eq("status", "published")
          .eq("chapters.programme_code", viewer.programmeCode)
          .order("published_at", { ascending: false })
          .limit(5)
      : null,
    supabase
      .from("lessons")
      .select(lessonFields)
      .eq("status", "published")
      .eq("visibility", "specific")
      .order("published_at", { ascending: false })
      .limit(5),
    listMyHomework(now),
    getMyGrades(),
    getTranslations("student.homework"),
    countUnread(),
  ]);

  const [next, ...later] = sessionsResult.data ?? [];
  const lessons = [...(levelLessonsResult?.data ?? []), ...(sharedLessonsResult.data ?? [])]
    .filter((lesson, index, all) => all.findIndex((other) => other.id === lesson.id) === index)
    .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""))
    .slice(0, 5);
  const firstName = viewer.fullName.split(" ")[0] || viewer.fullName;
  // Only an active or paused student has homework ahead of her (D-060); soonest due first.
  const toHandIn =
    viewer.status === "arrete"
      ? []
      : homework
          .filter((entry) => entry.progress.left > 0)
          .sort((a, b) => Date.parse(a.dueAt) - Date.parse(b.dueAt))
          .slice(0, 3);
  const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

  const sectionTitle = "flex items-center gap-2.5 text-lg font-semibold";
  const quiet =
    "inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre";

  return (
    <div className="mx-auto grid max-w-3xl gap-8">
      <RefreshOnReturn />
      <header className="grid gap-1">
        <p className="text-sm text-encre-douce first-letter:uppercase">
          {formatLocal(now, "EEEE d MMMM")}
        </p>
        <h1 className="text-[clamp(1.75rem,1.4rem+1.6vw,2.25rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
          {t("greeting", { name: firstName })}
        </h1>
      </header>

      {unread > 0 ? (
        <Link
          href="/eleve/messages"
          className="flex min-h-14 items-center gap-3 rounded-2xl bg-orange-fond px-4 py-3 font-medium text-orange-texte hover:brightness-95"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-orange-bande text-white">
            <MessageCircle aria-hidden="true" className="size-5" />
          </span>
          <span className="flex-1">{t("unreadMessages", { count: unread })}</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      ) : null}

      {/* The next session, in the site's blue: what she needs first when she opens the app. */}
      <section
        aria-labelledby="next-session"
        className="relative overflow-hidden rounded-2xl bg-bleu-bande p-5 text-white sm:p-6"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.09)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.09)_1px,transparent_1px)] bg-[size:22px_22px]"
        />
        <div className="relative grid gap-4">
          <h2
            id="next-session"
            className="text-sm font-medium tracking-[0.08em] text-white uppercase"
          >
            {t("nextSession")}
          </h2>
          {next ? (
            <>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-lg first-letter:uppercase">
                    {formatLocal(next.starts_at, "EEEE d MMMM")}
                  </p>
                  <p className="text-4xl font-semibold tabular">
                    {formatLocal(next.starts_at, "HH:mm")} – {formatLocal(next.ends_at, "HH:mm")}
                  </p>
                </div>
                {next.status === "en_attente" ? (
                  <span className="rounded-sm bg-surface">
                    <SessionStatusChip
                      status={next.status}
                      label={tSession(`status.${next.status}`)}
                    />
                  </span>
                ) : null}
              </div>
              <p className="flex items-start gap-2 text-white">
                {next.mode === "en_ligne" ? (
                  <Video aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                ) : (
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                )}
                <span>
                  {[next.session_type?.name, tSession(`mode.${next.mode}`), next.group?.name]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </p>
            </>
          ) : (
            <p className="text-lg">{t("noNextSession")}</p>
          )}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {next && next.mode === "en_ligne" && next.meeting_url ? (
              <a
                href={next.meeting_url}
                className={cn(buttonVariants(), "bg-white text-bleu-bande hover:bg-white/90")}
              >
                <Video aria-hidden="true" />
                {tSession("join")}
              </a>
            ) : null}
            {next ? (
              <Link
                href={`/eleve/seances/${next.id}`}
                className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-white/60 underline-offset-4 hover:decoration-white"
              >
                {t("sessionDetails")}
              </Link>
            ) : null}
            {viewer.status === "actif" ? (
              <Link
                href="/eleve/seances/reserver"
                className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-white/60 underline-offset-4 hover:decoration-white"
              >
                {t("book")}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {later.length > 0 ? (
        <section aria-labelledby="later-sessions" className="grid gap-3">
          <h2 id="later-sessions" className={sectionTitle}>
            <span aria-hidden="true" className="size-3 rounded bg-bleu" />
            {t("upcoming")}
          </h2>
          <ul role="list" className="grid gap-2.5">
            {later.map((session) => (
              <li key={session.id}>
                <Link
                  href={`/eleve/seances/${session.id}`}
                  className="flex min-h-16 items-center gap-4 rounded-2xl border border-quadrillage bg-surface p-3 hover:border-trait"
                >
                  {/* A date on a calendar leaf: the day, big, over its month. */}
                  <span
                    aria-hidden="true"
                    className="grid size-14 shrink-0 place-content-center rounded-xl bg-bleu-fond text-center text-bleu-texte"
                  >
                    <span className="text-xl leading-none font-semibold tabular">
                      {formatLocal(session.starts_at, "d")}
                    </span>
                    <span className="text-xs">{formatLocal(session.starts_at, "MMM")}</span>
                  </span>
                  <span className="grid min-w-0 flex-1">
                    <span className="font-medium first-letter:uppercase">
                      {formatLocal(session.starts_at, "EEEE d MMMM")}
                      <span className="ms-2 font-normal text-encre-douce tabular">
                        {formatLocal(session.starts_at, "HH:mm")}
                      </span>
                    </span>
                    <span className="text-sm text-encre-douce">
                      {[session.session_type?.name, session.group?.name]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                  <SessionStatusChip
                    status={session.status}
                    label={tSession(`status.${session.status}`)}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="homework-due" className="grid gap-3">
        <h2 id="homework-due" className={sectionTitle}>
          <span aria-hidden="true" className="size-3 rounded bg-rouge" />
          {t("homework")}
        </h2>
        {toHandIn.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-encre-douce">
            {t("noHomework")}
          </p>
        ) : (
          <ul role="list" className="grid gap-2.5">
            {toHandIn.map((entry) => {
              const done = entry.progress.total - entry.progress.left;
              return (
                <li
                  key={entry.id}
                  className="grid gap-3 rounded-2xl border border-s-4 border-quadrillage border-s-rouge bg-surface p-4"
                >
                  <div className="grid gap-0.5">
                    <h3 className="flex flex-wrap items-center gap-2 font-semibold">
                      {entry.title}
                      {entry.progress.late ? <LateBadge label={tHomework("late")} /> : null}
                    </h3>
                    <p className="text-sm text-encre-douce first-letter:uppercase">
                      {tHomework("due", {
                        date: formatLocal(entry.dueAt, "EEEE d MMMM 'à' HH:mm"),
                      })}
                    </p>
                  </div>
                  <div className="grid gap-1.5">
                    <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-sunken">
                      <span
                        className="block h-full rounded-full bg-rouge"
                        style={{
                          width: `${Math.round((done / Math.max(entry.progress.total, 1)) * 100)}%`,
                        }}
                      />
                    </span>
                    <span className="text-sm">
                      {tHomework("left", {
                        left: entry.progress.left,
                        total: entry.progress.total,
                      })}
                    </span>
                  </div>
                  <Link
                    href={`/eleve/devoirs/${entry.id}`}
                    className={cn(buttonVariants({ size: "sm" }), "justify-self-start")}
                  >
                    <PencilLine aria-hidden="true" className="size-4" />
                    {done === 0 ? t("startHomework") : t("continueHomework")}
                    <span className="sr-only">{`: ${entry.title}`}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <Link href="/eleve/devoirs" className={cn(quiet, "justify-self-start")}>
          {t("allHomework")}
        </Link>
      </section>

      <section aria-labelledby="new-lessons" className="grid gap-3">
        <h2 id="new-lessons" className={sectionTitle}>
          <span aria-hidden="true" className="size-3 rounded bg-bleu" />
          {t("newLessons")}
        </h2>
        {lessons.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-encre-douce">
            {t("noLessons")}
          </p>
        ) : (
          <ul role="list" className="grid gap-2.5 sm:grid-cols-2">
            {lessons.map((lesson) => {
              const colour = kindHue(lesson.kind);
              return (
                <li key={lesson.id} className="grid">
                  <Link
                    href={`/eleve/cours/${lesson.slug}`}
                    className={cn(
                      "grid content-start gap-1 rounded-2xl border border-s-4 border-quadrillage bg-surface px-4 py-3 hover:border-trait",
                      colour.edge,
                    )}
                  >
                    <span
                      className={cn("text-xs font-semibold tracking-wide uppercase", colour.text)}
                    >
                      {tKind(`one.${lesson.kind}`)}
                    </span>
                    <span className="font-medium">{lesson.title}</span>
                    <span className="text-sm text-encre-douce">
                      {lesson.chapters?.title}
                      {lesson.published_at
                        ? ` · ${t("publishedOn", { date: formatLocal(lesson.published_at, "d MMMM") })}`
                        : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <Link href="/eleve/cours" className={cn(quiet, "justify-self-start")}>
          {t("allLessons")}
        </Link>
      </section>

      <section aria-labelledby="my-grades" className="grid gap-3">
        <h2 id="my-grades" className={sectionTitle}>
          <span aria-hidden="true" className="size-3 rounded bg-violet" />
          {t("grades")}
        </h2>
        {grades.average === null ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-encre-douce">
            {t("noGrades")}
          </p>
        ) : (
          <div className="grid gap-3 rounded-2xl border border-quadrillage bg-surface p-4">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-semibold text-violet tabular">
                {t("averageValue", { average: gradeFormat.format(grades.average) })}
              </span>
              <span className="text-sm text-encre-douce">
                {t("averageOver", { count: grades.count })}
              </span>
            </p>
            <ul role="list" className="divide-y divide-quadrillage border-t border-quadrillage">
              {grades.recent.map((entry) => (
                <li key={`${entry.assignmentId}/${entry.exerciseId}`}>
                  <Link
                    href={`/eleve/devoirs/${entry.assignmentId}/${entry.exerciseId}`}
                    className="flex min-h-14 items-center justify-between gap-4 py-3 hover:bg-sunken"
                  >
                    <span className="min-w-0 font-medium">{entry.title}</span>
                    <GradeMark
                      grade={gradeFormat.format(entry.grade)}
                      label={t("gradeLabel")}
                      className="shrink-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

function StudentHomeSkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto grid max-w-3xl gap-8">
      <div className="h-14 w-56 rounded-xl bg-sunken" />
      <div className="h-48 rounded-2xl bg-sunken" />
      <div className="h-48 rounded-2xl bg-sunken" />
    </div>
  );
}
