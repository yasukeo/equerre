import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { ExercisesList } from "./exercises-list";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.exercises");
  return { title: t("title") };
}

export default async function TutorExercisesPage() {
  const t = await getTranslations("tutor.exercises");

  return (
    <div className="grid max-w-4xl gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <Link href="/prof/exercices/nouveau" className={buttonVariants()}>
          {t("new")}
        </Link>
      </div>
      <Suspense fallback={<ExercisesSkeleton />}>
        <ExercisesList />
      </Suspense>
    </div>
  );
}

function ExercisesSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-4">
      <div className="h-4 w-24 rounded bg-sunken" />
      <div className="h-32 rounded-md bg-sunken" />
      <div className="h-32 rounded-md bg-sunken" />
    </div>
  );
}
