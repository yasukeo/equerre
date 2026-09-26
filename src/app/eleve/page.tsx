import { MapPin, Video } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";
import { GradeMark } from "@/components/grade-mark";
import { SessionStatusChip } from "@/components/session-status";
import { buttonVariants } from "@/components/ui/button";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
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
  const [t, tSession] = await Promise.all([
    getTranslations("student.home"),
    getTranslations("session"),
  ]);
  const supabase = await createClient();
  const now = new Date();
  const nowIso = now.toISOString();

  // RLS narrows every query to this student: their sessions, their groups' sessions,
  // and only the lessons they're allowed to read.
  //
  // "New lessons" means this student's level plus lessons shared with them. RLS also lets
  // them read other levels' public lessons, so filtering happens in the database, before
  // the limit — otherwise public lessons from other levels could fill the list.
  const lessonFields = "id, slug, title, published_at, chapters!inner(title, level_code)" as const;
  const [sessionsResult, levelLessonsResult, sharedLessonsResult, homework, grades, tHomework] =
    await Promise.all([
      supabase
        .from("sessions")
        .select(
          "id, starts_at, ends_at, status, mode, location, meeting_url, group:groups(name), session_type:session_types(name)",
        )
        .gte("ends_at", nowIso)
        .in("status", ["en_attente", "planifiee"])
        .order("starts_at")
        .limit(4),
      viewer.levelCode
        ? supabase
            .from("lessons")
            .select(lessonFields)
            .eq("status", "published")
            .eq("chapters.level_code", viewer.levelCode)
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

  return (
    <div className="mx-auto grid max-w-2xl gap-8">
      <h1 className="text-2xl font-semibold">{t("greeting", { name: firstName })}</h1>

      <section
        aria-labelledby="next-session"
        className="rounded-lg border border-quadrillage bg-surface p-5"
      >
        <h2 id="next-session" className="text-sm font-medium text-encre-douce">
          {t("nextSession")}
        </h2>
        {next ? (
          <div className="mt-2 grid gap-3">
            <div>
              <p className="text-2xl font-semibold tabular">
                {formatLocal(next.starts_at, "HH:mm")} – {formatLocal(next.ends_at, "HH:mm")}
              </p>
              <p className="text-lg first-letter:uppercase">
                {formatLocal(next.starts_at, "EEEE d MMMM")}
              </p>
            </div>
            <p className="flex items-start gap-2 text-sm text-encre-douce">
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
            {next.status === "en_attente" ? (
              <div className="justify-self-start">
                <SessionStatusChip status={next.status} label={tSession(`status.${next.status}`)} />
              </div>
            ) : null}
            {next.mode === "en_ligne" && next.meeting_url ? (
              <a href={next.meeting_url} className={cn(buttonVariants(), "justify-self-start")}>
                <Video aria-hidden="true" />
                {tSession("join")}
              </a>
            ) : null}
          </div>
        ) : (
          <p className="mt-2">{t("noNextSession")}</p>
        )}
      </section>

      {later.length > 0 ? (
        <section aria-labelledby="later-sessions">
          <h2 id="later-sessions" className="text-lg font-medium">
            {t("upcoming")}
          </h2>
          <ul className="mt-3 divide-y divide-quadrillage border-y border-quadrillage" role="list">
            {later.map((session) => (
              <li
                key={session.id}
                className="grid min-h-16 grid-cols-[1fr_auto] items-start gap-x-4 py-3"
              >
                <div>
                  <p className="font-medium first-letter:uppercase">
                    {formatLocal(session.starts_at, "EEEE d MMMM")}
                    <span className="ms-2 font-normal text-encre-douce tabular">
                      {formatLocal(session.starts_at, "HH:mm")}
                    </span>
                  </p>
                  <p className="text-sm text-encre-douce">
                    {[session.session_type?.name, session.group?.name].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <SessionStatusChip
                  status={session.status}
                  label={tSession(`status.${session.status}`)}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="homework-due">
        <h2 id="homework-due" className="text-lg font-medium">
          {t("homework")}
        </h2>
        {toHandIn.length === 0 ? (
          <p className="mt-3 text-encre-douce">{t("noHomework")}</p>
        ) : (
          <ul className="mt-3 divide-y divide-quadrillage border-y border-quadrillage" role="list">
            {toHandIn.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/eleve/devoirs/${entry.id}`}
                  className="grid min-h-16 content-center gap-0.5 py-3 hover:bg-sunken"
                >
                  <span className="flex flex-wrap items-center gap-2 font-medium">
                    {entry.title}
                    {entry.progress.late ? (
                      <span className="rounded-sm border border-stylo-rouge/40 px-1.5 py-0.5 text-xs font-medium text-stylo-rouge">
                        {tHomework("late")}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-sm text-encre-douce">
                    {tHomework("due", { date: formatLocal(entry.dueAt, "EEEE d MMMM 'à' HH:mm") })}{" "}
                    ·{" "}
                    {tHomework("left", { left: entry.progress.left, total: entry.progress.total })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Link
          href="/eleve/devoirs"
          className="mt-3 inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {t("allHomework")}
        </Link>
      </section>

      <section aria-labelledby="new-lessons">
        <h2 id="new-lessons" className="text-lg font-medium">
          {t("newLessons")}
        </h2>
        {lessons.length === 0 ? (
          <p className="mt-3 text-encre-douce">{t("noLessons")}</p>
        ) : (
          <ul className="mt-3 divide-y divide-quadrillage border-y border-quadrillage" role="list">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/eleve/cours/${lesson.slug}`}
                  className="grid min-h-16 content-center gap-0.5 py-3 hover:bg-sunken"
                >
                  <span className="font-medium">{lesson.title}</span>
                  <span className="text-sm text-encre-douce">
                    {lesson.chapters?.title}
                    {lesson.published_at
                      ? ` · ${t("publishedOn", { date: formatLocal(lesson.published_at, "d MMMM") })}`
                      : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="my-grades">
        <h2 id="my-grades" className="text-lg font-medium">
          {t("grades")}
        </h2>
        {grades.average === null ? (
          <p className="mt-3 text-encre-douce">{t("noGrades")}</p>
        ) : (
          <>
            <p className="mt-2 text-encre-douce">
              {t("average", { average: gradeFormat.format(grades.average), count: grades.count })}
            </p>
            <ul
              className="mt-3 divide-y divide-quadrillage border-y border-quadrillage"
              role="list"
            >
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
          </>
        )}
      </section>
    </div>
  );
}

function StudentHomeSkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto grid max-w-2xl gap-8">
      <div className="h-8 w-48 rounded-sm bg-sunken" />
      <div className="h-40 rounded-lg bg-sunken" />
      <div className="h-48 rounded-md bg-sunken" />
    </div>
  );
}
