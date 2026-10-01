import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { listProgrammes } from "@/lib/lesson/queries";
import { PaperForm } from "../paper-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.exams");
  return { title: t("newTitle") };
}

export default async function NewPaperPage() {
  const t = await getTranslations("tutor.exams");

  return (
    <div className="grid max-w-4xl gap-6">
      <Link
        href="/prof/examens"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">{t("newTitle")}</h1>
        <p className="max-w-prose text-encre-douce">{t("newLead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
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
        published: true,
      }}
    />
  );
}
