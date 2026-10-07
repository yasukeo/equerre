import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { localDateKey } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";
import { PlanForm } from "./plan-form";
import { PageHeader } from "@/components/shell/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.planSession");
  return { title: t("title") };
}

export default async function PlanSessionPage({
  searchParams,
}: PageProps<"/prof/seances/nouvelle">) {
  const t = await getTranslations("tutor.planSession");

  return (
    <div className="grid max-w-2xl gap-6">
      <PageHeader
        back={{ href: "/prof/seances", label: t("back") }}
        title={t("title")}
        lead={t("lead")}
      />
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <Plan searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function one(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

async function Plan({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireViewer("tutor");
  const params = await searchParams;
  const supabase = await createClient();
  const [students, groups, types] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, level:levels(label)")
      .eq("role", "student")
      .eq("status", "actif")
      .order("full_name"),
    supabase.from("groups").select("id, name").order("name"),
    supabase
      .from("session_types")
      .select("id, name, is_group, mode, duration_min")
      .eq("is_active", true)
      .order("name"),
  ]);
  if (students.error || groups.error || types.error) {
    throw new Error("Could not read what a session is planned for", {
      cause: students.error ?? groups.error ?? types.error,
    });
  }

  const studentId = students.data.some((student) => student.id === one(params.eleve))
    ? one(params.eleve)
    : "";
  const groupId = groups.data.some((group) => group.id === one(params.groupe))
    ? one(params.groupe)
    : "";

  return (
    <PlanForm
      today={localDateKey(new Date())}
      students={students.data.map((student) => ({
        id: student.id,
        name: student.full_name,
        levelLabel: student.level?.label ?? null,
      }))}
      groups={groups.data}
      types={types.data.map((type) => ({
        id: type.id,
        name: type.name,
        isGroup: type.is_group,
        mode: type.mode,
        durationMin: type.duration_min,
      }))}
      initial={{ recipient: groupId ? "group" : "student", studentId, groupId }}
    />
  );
}
