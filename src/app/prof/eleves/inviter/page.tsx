import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";
import { InviteCodeForm } from "./invite-code-form";
import { InviteStudentForm } from "./invite-student-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.invite");
  return { title: t("title") };
}

export default async function InvitePage() {
  const t = await getTranslations("tutor.invite");

  return (
    <div className="grid max-w-5xl gap-8">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <InviteSections />
      </Suspense>
    </div>
  );
}

async function InviteSections() {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.invite");
  const supabase = await createClient();
  const nowIso = new Date().toISOString();

  const [levelsResult, groupsResult, codesResult] = await Promise.all([
    supabase.from("levels").select("code, label").order("position"),
    supabase.from("groups").select("id, name").order("name"),
    supabase
      .from("invite_codes")
      .select("code, level_code, max_uses, used_count, expires_at, group:groups(name)")
      .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
      .order("created_at", { ascending: false }),
  ]);

  const levels = levelsResult.data ?? [];
  const groups = groupsResult.data ?? [];
  const codes = (codesResult.data ?? []).filter((code) => code.used_count < code.max_uses);
  const levelLabel = new Map(levels.map((level) => [level.code, level.label]));

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-0">
      <section aria-labelledby="invite-account" className="grid content-start gap-5 lg:pe-12">
        <div>
          <h2 id="invite-account" className="text-lg font-medium">
            {t("accountHeading")}
          </h2>
          <p className="mt-1 text-sm text-encre-douce">{t("accountLead")}</p>
        </div>
        <InviteStudentForm levels={levels} groups={groups} />
      </section>

      <section
        aria-labelledby="invite-code"
        className="grid content-start gap-5 border-t border-quadrillage pt-10 lg:border-s lg:border-t-0 lg:ps-12 lg:pt-0"
      >
        <div>
          <h2 id="invite-code" className="text-lg font-medium">
            {t("codeHeading")}
          </h2>
          <p className="mt-1 text-sm text-encre-douce">{t("codeLead")}</p>
        </div>
        <InviteCodeForm levels={levels} groups={groups} />

        <div className="mt-4">
          <h3 className="text-sm font-medium">{t("activeCodes")}</h3>
          {codes.length === 0 ? (
            <p className="mt-2 text-sm text-encre-douce">{t("noCodes")}</p>
          ) : (
            <ul
              className="mt-2 divide-y divide-quadrillage border-y border-quadrillage"
              role="list"
            >
              {codes.map((code) => (
                <li
                  key={code.code}
                  className="grid gap-1 py-3 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-4"
                >
                  <span className="font-medium tracking-[0.2em] tabular">{code.code}</span>
                  <span className="text-sm text-encre-douce">
                    {[
                      code.level_code
                        ? (levelLabel.get(code.level_code) ?? code.level_code)
                        : t("anyLevel"),
                      code.group?.name,
                      t("codeUses", { used: code.used_count, max: code.max_uses }),
                      code.expires_at
                        ? t("codeExpires", { date: formatLocal(code.expires_at, "d MMMM") })
                        : t("codeNeverExpires"),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
