import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageHeader } from "@/components/shell/page-header";
import { buttonVariants } from "@/components/ui/button-variants";
import { LessonsList, readLessonFilter } from "./lessons-list";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.lessons");
  return { title: t("title") };
}

export default async function TutorLessonsPage({ searchParams }: PageProps<"/prof/lecons">) {
  const t = await getTranslations("tutor.lessons");

  return (
    <div className="grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-6">
      <PageHeader
        title={t("title")}
        lead={t("lead")}
        actions={
          <Link href="/prof/lecons/nouvelle" className={buttonVariants()}>
            <Plus aria-hidden="true" className="size-4" />
            {t("new")}
          </Link>
        }
      />
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
      <div className="h-24 rounded-2xl bg-sunken" />
      <div className="h-32 rounded-2xl bg-sunken" />
      <div className="h-32 rounded-2xl bg-sunken" />
    </div>
  );
}
