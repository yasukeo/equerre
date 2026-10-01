import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { LessonsList, readLessonFilter } from "./lessons-list";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.lessons");
  return { title: t("title") };
}

export default async function TutorLessonsPage({ searchParams }: PageProps<"/prof/lecons">) {
  const t = await getTranslations("tutor.lessons");

  return (
    <div className="grid max-w-4xl gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <Link href="/prof/lecons/nouvelle" className={buttonVariants()}>
          {t("new")}
        </Link>
      </div>
      <Suspense fallback={<LessonsSkeleton />}>
        <FilteredLessons searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function FilteredLessons({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <LessonsList filter={readLessonFilter(await searchParams)} />;
}

function LessonsSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-4">
      <div className="h-4 w-24 rounded bg-sunken" />
      <div className="h-32 rounded-md bg-sunken" />
      <div className="h-32 rounded-md bg-sunken" />
    </div>
  );
}
