import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Initials } from "@/components/initials";
import { PageHeader } from "@/components/shell/page-header";
import { requireViewer } from "@/lib/auth";
import { listMyChildren } from "@/lib/parents/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("parent.home");
  return { title: t("title") };
}

export default function ParentHomePage() {
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-40 rounded-2xl bg-sunken" />}>
        <Children />
      </Suspense>
    </div>
  );
}

/** One child: their page at once. Several: which one. None: who to ask. */
async function Children() {
  await requireViewer("parent");
  const [t, tStatus, children] = await Promise.all([
    getTranslations("parent.home"),
    getTranslations("studentStatus"),
    listMyChildren(),
  ]);
  if (children.length === 1) redirect(`/parent/${children[0]!.id}`);
  const heading = <PageHeader title={t("title")} />;
  if (children.length === 0) {
    return (
      <>
        {heading}
        <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5">
          {t("none")}
        </p>
      </>
    );
  }
  return (
    <>
      {heading}
      <ul role="list" className="grid gap-3 sm:grid-cols-2">
        {children.map((child) => (
          <li key={child.id} className="grid">
            <Link
              href={`/parent/${child.id}`}
              className="flex min-h-20 items-center gap-4 rounded-2xl border border-quadrillage bg-surface p-4 hover:border-trait"
            >
              <Initials name={child.name} className="size-12 text-sm" />
              <span className="grid min-w-0 gap-0.5">
                <span className="font-semibold break-words">{child.name}</span>
                <span className="text-sm text-encre-douce">
                  {[child.levelLabel, child.status === "actif" ? null : tStatus(child.status)]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
