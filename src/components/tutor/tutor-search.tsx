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
      keywords: "seance cours rendez-vous",
    },
    {
      href: "/prof/devoirs/nouveau",
      label: t("newAssignment"),
      group: actions,
      keywords: "devoir exercice",
    },
    {
      href: "/prof/paiements/nouveau",
      label: t("recordPayment"),
      group: actions,
      keywords: "paiement recu argent",
    },
    {
      href: "/prof/eleves/inviter",
      label: t("invite"),
      group: actions,
      keywords: "eleve ajouter code",
    },
    {
      href: "/prof/lecons/nouvelle",
      label: t("newLesson"),
      group: actions,
      keywords: "lecon cours document",
    },
    {
      href: "/prof/exercices/nouveau",
      label: t("newExercise"),
      group: actions,
      keywords: "exercice banque",
    },
    { href: "/prof", label: tNav("today"), group: pages },
    { href: "/prof/seances", label: tNav("sessions"), group: pages, keywords: "agenda calendrier" },
    {
      href: "/prof/seances/disponibilites",
      label: tNav("places.availability"),
      group: pages,
      keywords: "creneaux horaires",
    },
    { href: "/prof/seances/types", label: tNav("places.sessionTypes"), group: pages },
    { href: "/prof/messages", label: tNav("messages"), group: pages },
    { href: "/prof/eleves", label: tNav("students"), group: pages },
    { href: "/prof/eleves/groupes", label: tNav("places.groups"), group: pages },
    { href: "/prof/devoirs", label: tNav("assignments"), group: pages },
    {
      href: "/prof/devoirs/corrections",
      label: t("corrections"),
      group: pages,
      keywords: "copies corriger",
    },
    { href: "/prof/paiements", label: tNav("payments"), group: pages, keywords: "soldes" },
    {
      href: "/prof/paiements/formules",
      label: t("plans"),
      group: pages,
      keywords: "tarifs formules",
    },
    { href: "/prof/lecons", label: tNav("lessons"), group: pages, keywords: "cours documents" },
    { href: "/prof/exercices", label: tNav("exercises"), group: pages },
    {
      href: "/prof/examens",
      label: tNav("places.exams"),
      group: pages,
      keywords: "bac sujets dates",
    },
    { href: "/prof/site", label: tNav("site"), group: pages, keywords: "profil public" },
    { href: "/prof/conseils", label: t("blog"), group: pages, keywords: "articles conseils" },
    { href: "/prof/notifications", label: t("notifications"), group: pages },
  ];

  return (
    <CommandPalette
      items={items}
      labels={{
        open: t("open"),
        placeholder: t("placeholder"),
        close: t("close"),
        empty: t("empty"),
        hint: t("hint"),
      }}
    />
  );
}
