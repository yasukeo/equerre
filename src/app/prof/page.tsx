import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TodayView } from "./today-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.today");
  return { title: t("title") };
}

export default async function TutorTodayPage() {
  const t = await getTranslations("tutor.today");

  return (
    <div className="grid max-w-6xl gap-6">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <Suspense fallback={<TodaySkeleton />}>
        <TodayView />
      </Suspense>
    </div>
  );
}

function TodaySkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="h-72 rounded-md bg-sunken" />
      <div className="h-40 rounded-md bg-sunken" />
    </div>
  );
}
