import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { listGroups } from "@/lib/students/groups";
import { GroupForm } from "./group-forms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.groups");
  return { title: t("title") };
}

export default async function GroupsPage() {
  const t = await getTranslations("tutor.groups");

  return (
    <div className="grid max-w-4xl gap-6">
      <Link
        href="/prof/eleves"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="text-encre-douce">{t("lead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-md bg-sunken" />}>
        <Groups />
      </Suspense>
    </div>
  );
}

async function Groups() {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.groups");
  const { groups, levels } = await listGroups();

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      {groups.length === 0 ? (
        <p className="text-encre-douce">{t("empty")}</p>
      ) : (
        <ul
          className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
          role="list"
        >
          {groups.map((group) => (
            <li key={group.id} className="bg-surface">
              <Link
                href={`/prof/eleves/groupes/${group.id}`}
                className="grid min-h-16 gap-0.5 px-4 py-3 hover:bg-sunken"
              >
                <span className="font-medium">{group.name}</span>
                <span className="text-sm text-encre-douce">
                  {[
                    group.levelLabel ?? t("anyLevel"),
                    group.scheduleLabel,
                    t("members", { count: group.members }),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <section
        aria-labelledby="new-group"
        className="grid gap-4 rounded-md border border-quadrillage bg-surface p-4"
      >
        <h2 id="new-group" className="text-base font-semibold">
          {t("newHeading")}
        </h2>
        <GroupForm levels={levels} />
      </section>
    </div>
  );
}
