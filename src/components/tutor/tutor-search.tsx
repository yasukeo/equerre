import { getTranslations } from "next-intl/server";
import { requireViewer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { CommandPalette, type PaletteItem } from "./command-palette";

/** The tutor's search box, with her students and every place and action of the workspace. */
export async function TutorSearch() {
  await requireViewer("tutor");
  const [t, tNav] = await Promise.all([
    getTranslations("tutor.search"),
    getTranslations("nav.tutor"),
  ]);
  const supabase = await createClient();
  const [{ data: students }, { data: groups }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, status, level:levels(label)")
      .eq("role", "student")
      .neq("status", "arrete")
      .order("full_name"),
    supabase.from("groups").select("id, name").order("name"),
  ]);

  const actions = t("groupActions");
  const pages = t("groupPages");
  const items: PaletteItem[] = [
    ...(students ?? []).map((student) => ({
      href: `/prof/eleves/${student.id}`,
      label: student.full_name,
      detail: student.level?.label ?? undefined,
      group: t("groupStudents"),
    })),
    ...(groups ?? []).map((group) => ({
      href: `/prof/eleves/groupes/${group.id}`,
      label: group.name,
      detail: t("groupDetail"),
      group: t("groupGroups"),
    })),
    {
      href: "/prof/seances/nouvelle",
      label: t("planSession"),
      group: actions,
      suggested: true,
      keywords: "seance cours rendez-vous",
    },
    {
      href: "/prof/devoirs/nouveau",
      label: t("newAssignment"),
      group: actions,
      suggested: true,
      keywords: "devoir exercice",
    },
    {
      href: "/prof/paiements/nouveau",
      label: t("recordPayment"),
      group: actions,
      suggested: true,
      keywords: "paiement recu argent",
    },
    {
      href: "/prof/eleves/inviter",
      label: t("invite"),
      group: actions,
      suggested: true,
      keywords: "eleve ajouter code",
    },
    {
      href: "/prof/lecons/nouvelle",
      label: t("newLesson"),
      group: actions,
      suggested: true,
      keywords: "lecon cours document",
    },
    {
      href: "/prof/exercices/nouveau",
      label: t("newExercise"),
      group: actions,
      suggested: true,
      keywords: "exercice banque",
    },
    { href: "/prof", label: tNav("today"), group: pages, suggested: true },
    {
      href: "/prof/seances",
      label: tNav("sessions"),
      group: pages,
      suggested: true,
      keywords: "agenda calendrier",
    },
    {
      href: "/prof/seances/disponibilites",
      label: tNav("places.availability"),
      group: pages,
      suggested: true,
      keywords: "creneaux horaires",
    },
    {
      href: "/prof/seances/types",
      label: tNav("places.sessionTypes"),
      group: pages,
      suggested: true,
    },
    { href: "/prof/messages", label: tNav("messages"), group: pages, suggested: true },
    { href: "/prof/eleves", label: tNav("students"), group: pages, suggested: true },
    { href: "/prof/eleves/groupes", label: tNav("places.groups"), group: pages, suggested: true },
    { href: "/prof/devoirs", label: tNav("assignments"), group: pages, suggested: true },
    {
      href: "/prof/devoirs/corrections",
      label: t("corrections"),
      group: pages,
      suggested: true,
      keywords: "copies corriger",
    },
    {
      href: "/prof/paiements",
      label: tNav("payments"),
      group: pages,
      suggested: true,
      keywords: "soldes",
    },
    {
      href: "/prof/paiements/formules",
      label: t("plans"),
      group: pages,
      suggested: true,
      keywords: "tarifs formules",
    },
    {
      href: "/prof/lecons",
      label: tNav("lessons"),
      group: pages,
      suggested: true,
      keywords: "cours documents",
    },
    { href: "/prof/exercices", label: tNav("exercises"), group: pages, suggested: true },
    {
      href: "/prof/examens",
      label: tNav("places.exams"),
      group: pages,
      suggested: true,
      keywords: "bac sujets dates",
    },
    {
      href: "/prof/site",
      label: tNav("site"),
      group: pages,
      suggested: true,
      keywords: "profil public",
    },
    {
      href: "/prof/conseils",
      label: t("blog"),
      group: pages,
      suggested: true,
      keywords: "articles conseils",
    },
    { href: "/prof/notifications", label: t("notifications"), group: pages, suggested: true },
  ];

  return <CommandPalette items={items} />;
}
