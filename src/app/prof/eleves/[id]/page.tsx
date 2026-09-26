import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense, type ReactNode } from "react";
import { z } from "zod";
import { SessionStatusChip } from "@/components/session-status";
import { StudentStatusChip } from "@/components/student-status";
import { WorkChip } from "@/components/work-status";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import type { ExerciseWork } from "@/lib/homework/work";
import { getStudentFile, type StudentSession } from "@/lib/students/queries";
import { NotesPanel } from "./notes-panel";
import { StudentForm } from "./student-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.student");
  return { title: t("title") };
}

export default async function StudentPage({ params }: PageProps<"/prof/eleves/[id]">) {
  const t = await getTranslations("tutor.student");

  return (
    <div className="grid max-w-6xl gap-6">
      <Link
        href="/prof/eleves"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <Student params={params} />
      </Suspense>
    </div>
  );
}

/** Past sessions and homework shown before « voir tout »: the recent ones matter most. */
const RECENT = 8;
const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 1 });

async function Student({ params }: { params: Promise<{ id: string }> }) {
  await requireViewer("tutor");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const [t, tStatus, tWork] = await Promise.all([
    getTranslations("tutor.student"),
    getTranslations("studentStatus"),
    getTranslations("student.homework.work"),
  ]);
  const file = await getStudentFile(id, new Date());
  if (!file) notFound();
  const { profile } = file;

  const workLabel = (work: ExerciseWork) =>
    work.kind === "graded"
      ? tWork("graded", { grade: gradeFormat.format(work.grade) })
      : tWork(work.kind);

  return (
    <article className="grid gap-8">
      <header className="grid gap-2">
        <h1 className="text-2xl font-semibold">{profile.name}</h1>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-encre-douce">
          {profile.levelLabel ? <span>{profile.levelLabel}</span> : null}
          <StudentStatusChip status={profile.status} label={tStatus(profile.status)} />
          <span className="text-sm">
            {t("since", { date: formatLocal(profile.createdAt, "d MMMM yyyy") })}
          </span>
        </p>
      </header>

      <dl className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage sm:grid-cols-3">
        <Figure
          term={t("averageHeading")}
          value={
            file.average === null
              ? t("noAverage")
              : t("averageValue", { average: gradeFormat.format(file.average) })
          }
          detail={file.average === null ? null : t("averageOver", { count: file.graded })}
        />
        <Figure
          term={t("attendanceHeading")}
          value={
            file.attendance.rate === null
              ? t("noAttendance")
              : t("attendanceValue", { rate: Math.round(file.attendance.rate * 100) })
          }
          detail={
            file.attendance.rate === null
              ? null
              : t("attendanceOver", {
                  present: file.attendance.present,
                  counted: file.attendance.counted,
                })
          }
        />
        <div className="grid content-start gap-1 bg-surface px-4 py-3">
          <dt className="text-sm text-encre-douce">{t("groupsHeading")}</dt>
          <dd className="grid gap-1">
            {file.groups.length === 0 ? (
              <span>{t("noGroups")}</span>
            ) : (
              file.groups.map((group) => (
                <Link
                  key={group.id}
                  href={`/prof/eleves/groupes/${group.id}`}
                  className="underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                >
                  {group.name}
                </Link>
              ))
            )}
          </dd>
        </div>
      </dl>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="grid min-w-0 gap-10">
          <section aria-labelledby="student-sessions" className="grid gap-4">
            <h2 id="student-sessions" className="text-lg font-medium">
              {t("sessionsHeading")}
            </h2>
            <SessionList
              heading={t("upcomingHeading")}
              empty={t("noUpcoming")}
              sessions={file.upcoming}
            />
            <SessionList heading={t("pastHeading")} empty={t("noPast")} sessions={file.past} />
          </section>

          <section aria-labelledby="student-homework" className="grid gap-3">
            <h2 id="student-homework" className="text-lg font-medium">
              {t("homeworkHeading")}
            </h2>
            {file.homework.length === 0 ? (
              <p className="text-encre-douce">{t("noHomework")}</p>
            ) : (
              <Recent
                items={file.homework.map((homework) => (
                  <li key={homework.id} className="grid gap-2 bg-surface px-4 py-3">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <Link
                        href={`/prof/devoirs/${homework.id}`}
                        className="font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                      >
                        {homework.title}
                      </Link>
                      {homework.progress.late ? (
                        <span className="rounded-sm border border-stylo-rouge/40 px-1.5 py-0.5 text-xs font-medium text-stylo-rouge">
                          {t("late")}
                        </span>
                      ) : null}
                    </p>
                    <p className="text-sm text-encre-douce">
                      {[
                        homework.groupName ? t("groupSession", { name: homework.groupName }) : null,
                        t("due", { date: formatLocal(homework.dueAt, "d MMMM 'à' HH:mm") }),
                        t("left", {
                          left: homework.progress.left,
                          total: homework.progress.total,
                        }),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <ul className="flex flex-wrap gap-1.5" aria-label={homework.title}>
                      {homework.exercises.map((exercise) => (
                        <li key={exercise.id} title={exercise.title}>
                          <span className="sr-only">{exercise.title} : </span>
                          <WorkChip work={exercise.work} label={workLabel(exercise.work)} />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                more={t("allHomework", { count: file.homework.length })}
              />
            )}
          </section>
        </div>

        <aside className="grid gap-8">
          <section aria-labelledby="student-contact" className="grid gap-2">
            <h2 id="student-contact" className="text-lg font-medium">
              {t("contactHeading")}
            </h2>
            <dl className="grid gap-2 text-sm">
              <Contact term={t("email")} missing={t("missing")}>
                {profile.email ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="break-all underline underline-offset-4"
                  >
                    {profile.email}
                  </a>
                ) : null}
              </Contact>
              <Contact term={t("phone")} missing={t("missing")}>
                {profile.phone ? <Phone number={profile.phone} /> : null}
              </Contact>
              <Contact term={t("guardian")} missing={t("missing")}>
                {profile.guardianName || profile.guardianPhone ? (
                  <span className="flex flex-wrap gap-x-2">
                    {profile.guardianName ? <span>{profile.guardianName}</span> : null}
                    {profile.guardianPhone ? <Phone number={profile.guardianPhone} /> : null}
                  </span>
                ) : null}
              </Contact>
              <Contact term={t("school")} missing={t("missing")}>
                {profile.school}
              </Contact>
            </dl>
          </section>

          <NotesPanel studentId={profile.id} notes={file.notes} />

          <details className="rounded-md border border-quadrillage p-4">
            <summary className="cursor-pointer font-medium">{t("profileHeading")}</summary>
            <div className="mt-4">
              <StudentForm
                id={profile.id}
                levels={file.levels}
                initial={{
                  fullName: profile.name,
                  levelCode: profile.levelCode ?? "",
                  status: profile.status,
                  phone: profile.phone ?? "",
                  school: profile.school ?? "",
                  guardianName: profile.guardianName ?? "",
                  guardianPhone: profile.guardianPhone ?? "",
                  objectives: file.objectives,
                }}
              />
            </div>
          </details>
        </aside>
      </div>
    </article>
  );
}

function Figure({ term, value, detail }: { term: string; value: string; detail: string | null }) {
  return (
    <div className="grid content-start gap-1 bg-surface px-4 py-3">
      <dt className="text-sm text-encre-douce">{term}</dt>
      <dd className="text-lg font-semibold tabular">{value}</dd>
      {detail ? <dd className="text-sm text-encre-douce">{detail}</dd> : null}
    </div>
  );
}

function Contact({
  term,
  missing,
  children,
}: {
  term: string;
  missing: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-2">
      <dt className="text-encre-douce">{term}</dt>
      <dd className="min-w-0">{children || <span className="text-encre-douce">{missing}</span>}</dd>
    </div>
  );
}

function Phone({ number }: { number: string }) {
  return (
    <a href={`tel:${number.replace(/\s+/g, "")}`} className="tabular underline underline-offset-4">
      {number}
    </a>
  );
}

/** The first few, then the rest folded away. */
function Recent({ items, more }: { items: ReactNode[]; more: string }) {
  const list = "grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage";
  return (
    <div className="grid gap-2">
      <ul className={list} role="list">
        {items.slice(0, RECENT)}
      </ul>
      {items.length > RECENT ? (
        <details className="grid gap-2">
          <summary className="cursor-pointer text-sm underline decoration-trait underline-offset-4">
            {more}
          </summary>
          <ul className={`${list} mt-2`} role="list">
            {items.slice(RECENT)}
          </ul>
        </details>
      ) : null}
    </div>
  );
}

async function SessionList({
  heading,
  empty,
  sessions,
}: {
  heading: string;
  empty: string;
  sessions: StudentSession[];
}) {
  const [t, tSession] = await Promise.all([
    getTranslations("tutor.student"),
    getTranslations("session"),
  ]);
  return (
    <div className="grid gap-2">
      <h3 className="text-sm font-semibold text-encre-douce">{heading}</h3>
      {sessions.length === 0 ? (
        <p className="text-sm text-encre-douce">{empty}</p>
      ) : (
        <Recent
          more={t("allSessions", { count: sessions.length })}
          items={sessions.map((session) => (
            <li key={session.id} className="grid gap-1 bg-surface px-4 py-3">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-medium first-letter:uppercase">
                  {formatLocal(session.startsAt, "EEEE d MMMM")}
                  <span className="ms-2 font-normal text-encre-douce tabular">
                    {formatLocal(session.startsAt, "HH:mm")} –{" "}
                    {formatLocal(session.endsAt, "HH:mm")}
                  </span>
                </span>
                {session.attendance ? (
                  <span className="text-sm">{t(`attendance.${session.attendance}`)}</span>
                ) : (
                  <SessionStatusChip
                    status={session.status}
                    label={tSession(`status.${session.status}`)}
                  />
                )}
              </p>
              <p className="text-sm text-encre-douce">
                {[
                  session.typeName,
                  session.groupName ? t("groupSession", { name: session.groupName }) : null,
                  tSession(`mode.${session.mode}`),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {session.chapter ? (
                <p className="text-sm">{t("covered", { chapter: session.chapter })}</p>
              ) : null}
              {session.recap ? (
                <p className="text-sm whitespace-pre-line text-encre-douce">{session.recap}</p>
              ) : null}
            </li>
          ))}
        />
      )}
    </div>
  );
}
