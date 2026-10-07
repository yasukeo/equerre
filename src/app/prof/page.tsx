import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TodayView } from "./today-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.today");
  return { title: t("title") };
}

export default function TutorTodayPage() {
  return (
    <div className="grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6">
      <Suspense fallback={<TodaySkeleton />}>
        <TodayView />
      </Suspense>
    </div>
  );
}

function TodaySkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-6">
      <div className="h-16 w-72 rounded-xl bg-sunken" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="h-28 rounded-2xl bg-sunken" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="h-80 rounded-2xl bg-sunken" />
        <div className="h-80 rounded-2xl bg-sunken" />
      </div>
    </div>
  );
}
