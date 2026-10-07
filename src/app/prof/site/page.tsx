import { BookOpen, ExternalLink, PenLine, Tags, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";
import { PageHeader } from "@/components/shell/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("siteAdmin");
  return { title: t("title") };
}

export default async function SiteAdminPage() {
  const t = await getTranslations("siteAdmin");

  return (
    <div className="grid max-w-5xl gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader title={t("title")} lead={t("lead")} />
        <a
          href="/"
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          <ExternalLink aria-hidden="true" className="size-4" />
          {t("open")}
          <span className="sr-only"> {t("newTab")}</span>
        </a>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <SiteAdmin />
      </Suspense>
    </div>
  );
}

async function SiteAdmin() {
  await requireViewer("tutor");
  const t = await getTranslations("siteAdmin");
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_profile")
    .select("tagline, bio, city, areas, whatsapp")
    .maybeSingle();

  const places = [
    { href: "/prof/conseils", label: t("postsLink"), icon: PenLine },
    { href: "/prof/paiements/formules", label: t("plansLink"), icon: Tags },
    { href: "/prof/lecons", label: t("coursesLink"), icon: BookOpen },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
      <section
        aria-labelledby="site-profile"
        className="grid gap-4 rounded-md border border-quadrillage bg-surface p-4"
      >
        <h2 id="site-profile" className="text-base font-semibold">
          {t("profileHeading")}
        </h2>
        {data?.whatsapp ? null : (
          <p className="flex items-start gap-2 rounded-md border border-trait px-3 py-2 text-sm">
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {t("noWhatsapp")}
          </p>
        )}
        <ProfileForm
          initial={{
            tagline: data?.tagline ?? "",
            bio: data?.bio ?? "",
            city: data?.city ?? "",
            areas: data?.areas ?? "",
            whatsapp: data?.whatsapp ?? "",
          }}
        />
      </section>
      <nav aria-labelledby="site-elsewhere" className="grid gap-2">
        <h2 id="site-elsewhere" className="text-sm font-semibold text-encre-douce">
          {t("elsewhere")}
        </h2>
        <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
          {places.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex min-h-11 items-center gap-3 py-2.5 text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
              >
                <Icon aria-hidden="true" className="size-5 shrink-0 text-encre-douce" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
