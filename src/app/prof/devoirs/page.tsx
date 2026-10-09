import { FileText, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageHeader } from "@/components/shell/page-header";
import { buttonVariants } from "@/components/ui/button-variants";
import { AssignmentsList } from "./assignments-list";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.assignments");
  return { title: t("title") };
}

export default async function TutorAssignmentsPage({ searchParams }: PageProps<"/prof/devoirs">) {
  const t = await getTranslations("tutor.assignments");

  return (
    <div className="grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-6">
      <PageHeader
        title={t("title")}
        lead={t("lead")}
        actions={
          <>
            <Link
              href="/prof/devoirs/nouveau?type=pdf"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <FileText aria-hidden="true" className="size-4" />
              {t("newSubject")}
            </Link>
            <Link href="/prof/devoirs/nouveau" className={buttonVariants()}>
              <Plus aria-hidden="true" className="size-4" />
              {t("new")}
            </Link>
          </>
        }
      />
      <Suspense fallback={<ListSkeleton />}>
        <AssignmentsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-4">
      <div className="h-24 rounded-2xl bg-sunken" />
      <div className="h-11 w-64 rounded-full bg-sunken" />
      <div className="h-32 rounded-2xl bg-sunken" />
      <div className="h-32 rounded-2xl bg-sunken" />
    </div>
  );
}
