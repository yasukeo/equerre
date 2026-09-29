import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { AssignmentsList } from "./assignments-list";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.assignments");
  return { title: t("title") };
}

export default async function TutorAssignmentsPage() {
  const t = await getTranslations("tutor.assignments");

  return (
    <div className="grid max-w-4xl gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <Link href="/prof/devoirs/nouveau" className={buttonVariants()}>
          {t("new")}
        </Link>
      </div>
      <Suspense fallback={<ListSkeleton />}>
        <AssignmentsList />
      </Suspense>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-4">
      <div className="h-4 w-24 rounded bg-sunken" />
      <div className="h-24 rounded-md bg-sunken" />
      <div className="h-24 rounded-md bg-sunken" />
    </div>
  );
}
