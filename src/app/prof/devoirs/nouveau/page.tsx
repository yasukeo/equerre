import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { listAssignableExercises, listRecipients } from "@/lib/assignment/queries";
import { requireViewer } from "@/lib/auth";
import { localDateKeyInDays } from "@/lib/dates";
import { NewAssignmentForm } from "./new-assignment-form";
import { PageHeader } from "@/components/shell/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.newAssignment");
  return { title: t("title") };
}

export default async function NewAssignmentPage({
  searchParams,
}: PageProps<"/prof/devoirs/nouveau">) {
  const t = await getTranslations("tutor.newAssignment");

  return (
    <div className="grid max-w-3xl gap-6">
      <PageHeader title={t("title")} lead={t("lead")} />
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <NewAssignment searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function NewAssignment({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireViewer("tutor");
  const [recipients, exercises, params] = await Promise.all([
    listRecipients(),
    listAssignableExercises(),
    searchParams,
  ]);

  const now = new Date();

  // « Donner en devoir » from an exercise's page arrives with that exercise already chosen.
  const wanted = typeof params.exercice === "string" ? params.exercice : null;
  const preselected =
    exercises.some((exercise) => exercise.id === wanted) && wanted ? [wanted] : [];

  return (
    <NewAssignmentForm
      recipients={recipients}
      exercises={exercises}
      preselected={preselected}
      // A week from today, at 20:00 in Casablanca: a starting point the tutor changes at will.
      defaultDue={{ date: localDateKeyInDays(now, 7), time: "20:00" }}
      // « Donner un sujet en PDF » arrives with that choice already made.
      initialMode={params.type === "pdf" ? "subject" : "bank"}
    />
  );
}
