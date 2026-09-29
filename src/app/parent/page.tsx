import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { listMyChildren } from "@/lib/parents/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("parent.home");
  return { title: t("title") };
}

export default function ParentHomePage() {
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-40 rounded-md bg-sunken" />}>
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
  const heading = <h1 className="text-xl font-semibold">{t("title")}</h1>;
  if (children.length === 0) {
    return (
      <>
        {heading}
        <p className="rounded-md border border-dashed border-trait px-4 py-5">{t("none")}</p>
      </>
    );
  }
  return (
    <>
      {heading}
      <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
        {children.map((child) => (
          <li key={child.id}>
            <Link
              href={`/parent/${child.id}`}
              className="grid min-h-16 content-center gap-0.5 py-3 hover:bg-sunken"
            >
              <span className="font-medium">{child.name}</span>
              <span className="text-sm text-encre-douce">
                {[child.levelLabel, child.status === "actif" ? null : tStatus(child.status)]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
