import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { getGroup } from "@/lib/students/groups";
import { AddMember, DeleteGroup, GroupForm, MemberList } from "../group-forms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.groups");
  return { title: t("title") };
}

export default async function GroupPage({ params }: PageProps<"/prof/eleves/groupes/[id]">) {
  const t = await getTranslations("tutor.groups");

  return (
    <div className="grid max-w-4xl gap-6">
      <Link
        href="/prof/eleves/groupes"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("backToGroups")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <Group params={params} />
      </Suspense>
    </div>
  );
}

async function Group({ params }: { params: Promise<{ id: string }> }) {
  await requireViewer("tutor");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const t = await getTranslations("tutor.groups");
  const group = await getGroup(id);
  if (!group) notFound();

  return (
    <article className="grid gap-8">
      <header className="grid gap-1">
        <h1 className="text-xl font-semibold">{group.name}</h1>
        <p className="text-encre-douce">
          {[
            group.levels.find((level) => level.code === group.levelCode)?.label ?? t("anyLevel"),
            group.scheduleLabel,
            t("members", { count: group.members.length }),
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {group.conversationId ? (
          <Link
            href={`/prof/messages/${group.conversationId}`}
            className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("write")}
          </Link>
        ) : null}
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="grid min-w-0 gap-8">
          <section className="grid gap-2" aria-labelledby="group-members">
            <MemberList groupId={group.id} members={group.members} />
          </section>
          <section
            aria-labelledby="group-add"
            className="grid gap-3 rounded-md border border-quadrillage bg-surface p-4"
          >
            <h2 id="group-add" className="text-base font-semibold">
              {t("addHeading")}
            </h2>
            <AddMember groupId={group.id} candidates={group.candidates} />
          </section>
        </div>

        <div className="grid gap-8">
          <section aria-labelledby="group-details" className="grid gap-4">
            <h2 id="group-details" className="text-lg font-medium">
              {t("detailsHeading")}
            </h2>
            <GroupForm
              id={group.id}
              levels={group.levels}
              initial={{
                name: group.name,
                levelCode: group.levelCode ?? "",
                scheduleLabel: group.scheduleLabel ?? "",
              }}
            />
          </section>
          <section aria-labelledby="group-delete" className="grid gap-2">
            <h2 id="group-delete" className="text-base font-semibold">
              {t("deleteHeading")}
            </h2>
            <DeleteGroup id={group.id} hasHistory={group.hasHistory} />
          </section>
        </div>
      </div>
    </article>
  );
}
