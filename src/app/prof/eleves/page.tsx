import { UserPlus, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { StudentStatusChip } from "@/components/student-status";
import { buttonVariants } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { listStudents, type StudentRow } from "@/lib/students/queries";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.students");
  return { title: t("title") };
}

export default async function StudentsPage({ searchParams }: PageProps<"/prof/eleves">) {
  const t = await getTranslations("tutor.students");

  return (
    <div className="grid max-w-4xl gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <div className="flex flex-wrap gap-2">
          <Link href="/prof/eleves/groupes" className={buttonVariants({ variant: "outline" })}>
            <Users aria-hidden="true" />
            {t("groups")}
          </Link>
          <Link href="/prof/eleves/inviter" className={buttonVariants()}>
            <UserPlus aria-hidden="true" />
            {t("invite")}
          </Link>
        </div>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <Students searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const STATUS_FILTERS = ["current", "all", "actif", "en_pause", "arrete"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

function one(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

async function Students({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireViewer("tutor");
  const [t, tStatus, params] = await Promise.all([
    getTranslations("tutor.students"),
    getTranslations("studentStatus"),
    searchParams,
  ]);
  const { students, levels } = await listStudents(new Date());

  // The filters travel in the address, so a filtered list can be kept and shared as a link.
  const query = one(params.q).trim();
  const level = one(params.niveau);
  const status: StatusFilter = STATUS_FILTERS.includes(one(params.statut) as StatusFilter)
    ? (one(params.statut) as StatusFilter)
    : "current";
  const withoutSession = one(params.sans) === "seance";
  const folded = (text: string) =>
    text
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();

  const shown = students.filter(
    (student) =>
      (query === "" || folded(student.name).includes(folded(query))) &&
      (level === "" || student.levelCode === level) &&
      (status === "all" ||
        (status === "current" ? student.status !== "arrete" : student.status === status)) &&
      (!withoutSession || student.nextSession === null),
  );

  if (students.length === 0) {
    return <p className="text-encre-douce">{t("noStudents")}</p>;
  }

  return (
    <div className="grid gap-4">
      <form
        method="get"
        role="search"
        aria-label={t("filters")}
        className="grid gap-3 rounded-md border border-quadrillage bg-surface p-4 sm:grid-cols-2 lg:grid-cols-[1fr_12rem_12rem]"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="filter-q">{t("search")}</Label>
          <Input id="filter-q" name="q" type="search" defaultValue={query} autoComplete="off" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="filter-level">{t("level")}</Label>
          <Select id="filter-level" name="niveau" defaultValue={level}>
            <option value="">{t("allLevels")}</option>
            {levels.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="filter-status">{t("status")}</Label>
          <Select id="filter-status" name="statut" defaultValue={status}>
            <option value="current">{t("statusCurrent")}</option>
            <option value="actif">{tStatus("actif")}</option>
            <option value="en_pause">{tStatus("en_pause")}</option>
            <option value="arrete">{tStatus("arrete")}</option>
            <option value="all">{t("statusAll")}</option>
          </Select>
        </div>
        <label className="flex min-h-11 items-center gap-2 text-sm sm:col-span-2 lg:col-span-2">
          <input
            type="checkbox"
            name="sans"
            value="seance"
            defaultChecked={withoutSession}
            className="size-4 accent-stylo-bleu"
          />
          {t("withoutSession")}
        </label>
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <button type="submit" className={buttonVariants({ variant: "outline" })}>
            {t("apply")}
          </button>
          <Link
            href="/prof/eleves"
            className="text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("reset")}
          </Link>
        </div>
      </form>

      <p aria-live="polite" className="text-sm text-encre-douce">
        {t("count", { count: shown.length })}
      </p>

      {shown.length === 0 ? (
        <p className="text-encre-douce">{t("empty")}</p>
      ) : (
        <ul
          className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
          role="list"
        >
          {shown.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              statusLabel={tStatus(student.status)}
              t={{
                nextSession: student.nextSession
                  ? t("nextSession", {
                      date: formatLocal(student.nextSession, "EEEE d MMMM 'à' HH:mm"),
                    })
                  : t("noNextSession"),
                average:
                  student.average === null
                    ? null
                    : t("average", { average: gradeFormat.format(student.average) }),
                noGroup: t("noGroup"),
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 1 });

function StudentItem({
  student,
  statusLabel,
  t,
}: {
  student: StudentRow;
  statusLabel: string;
  t: { nextSession: string; average: string | null; noGroup: string };
}) {
  return (
    <li className="bg-surface">
      <Link
        href={`/prof/eleves/${student.id}`}
        className="grid gap-1 px-4 py-3 hover:bg-sunken sm:grid-cols-[1fr_auto] sm:gap-x-6"
      >
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium">{student.name}</span>
          {student.levelLabel ? (
            <span className="text-sm text-encre-douce">{student.levelLabel}</span>
          ) : null}
          {student.status === "actif" ? null : (
            <StudentStatusChip status={student.status} label={statusLabel} />
          )}
        </span>
        <span
          className={cn(
            "text-sm text-encre-douce sm:row-span-2 sm:self-center sm:text-end",
            t.average === null && "sm:invisible",
          )}
        >
          {t.average}
        </span>
        <span className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-encre-douce">
          <span>{t.nextSession}</span>
          <span>
            {student.groups.length === 0
              ? t.noGroup
              : student.groups.map((group) => group.name).join(", ")}
          </span>
        </span>
      </Link>
    </li>
  );
}
