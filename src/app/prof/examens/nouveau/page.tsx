import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { listProgrammes } from "@/lib/lesson/queries";
import { PaperForm } from "../paper-form";
import { PageHeader } from "@/components/shell/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.exams");
  return { title: t("newTitle") };
}

export default async function NewPaperPage() {
  const t = await getTranslations("tutor.exams");

  return (
    <div className="grid max-w-4xl gap-6">
      <PageHeader
        back={{ href: "/prof/examens", label: t("back") }}
        title={t("newTitle")}
        lead={t("newLead")}
      />
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <NewPaper />
      </Suspense>
    </div>
  );
}

async function NewPaper() {
  await requireViewer("tutor");
  const programmes = await listProgrammes();
  // The national exam is the 2e bac's: its programmes come first in the list's default.
  const first = programmes.find((programme) => programme.cycle === "2bac") ?? programmes[0];

  return (
    <PaperForm
      id={crypto.randomUUID()}
      editing={false}
      programmes={programmes.map(({ code, label }) => ({ code, label }))}
      initial={{
        programme: first?.code ?? "",
        year: String(new Date().getFullYear()),
        session: "normale",
        track: "",
        language: "fr",
        published: true,
      }}
    />
  );
}
