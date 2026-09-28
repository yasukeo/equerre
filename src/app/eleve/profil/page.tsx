import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { AccountPanel } from "@/components/payments/account-panel";
import { requireViewer } from "@/lib/auth";
import { localDateKey } from "@/lib/dates";
import { formatHours } from "@/lib/payments/format";
import { getAccounts, getStatement, listPayments } from "@/lib/payments/queries";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.profile");
  return { title: t("title") };
}

export default async function StudentProfilePage() {
  const t = await getTranslations("student.profile");

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <Suspense fallback={<div aria-hidden="true" className="h-72 rounded-md bg-sunken" />}>
        <ProfileDetails />
      </Suspense>
      <Suspense fallback={<div aria-hidden="true" className="h-72 rounded-md bg-sunken" />}>
        <MyAccount />
      </Suspense>
    </div>
  );
}

/** Her hours, her subscription and her receipts (D-087): read-only, through her own session. */
async function MyAccount() {
  const viewer = await requireViewer("student");
  const t = await getTranslations("student.account");
  const [accounts, payments] = await Promise.all([
    getAccounts(viewer.id),
    listPayments({ studentId: viewer.id }),
  ]);
  const account = accounts.get(viewer.id);
  const statement = await getStatement(viewer.id, payments);

  return (
    <section aria-labelledby="my-account" className="grid gap-4">
      <div className="grid gap-1">
        <h2 id="my-account" className="text-lg font-medium">
          {t("heading")}
        </h2>
        <p className="text-sm text-encre-douce">{t("lead")}</p>
      </div>
      {account?.owes ? <p>{t("owes", { hours: formatHours(-account.balance) })}</p> : null}
      <AccountPanel
        account={account}
        payments={payments}
        statement={statement}
        today={localDateKey(new Date())}
        audience="student"
      />
    </section>
  );
}

async function ProfileDetails() {
  const viewer = await requireViewer("student");
  const t = await getTranslations("student.profile");
  const supabase = await createClient();

  const [profileResult, groupsResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("email, phone, school, guardian_name, guardian_phone, level:levels(label)")
      .eq("id", viewer.id)
      .single(),
    supabase
      .from("group_members")
      .select("group:groups(name, schedule_label)")
      .eq("student_id", viewer.id)
      // The groups she is in today; those she left keep her past, not her profile (D-070).
      .is("left_at", null),
  ]);

  const profile = profileResult.data;
  const groups = (groupsResult.data ?? []).flatMap((row) => (row.group ? [row.group] : []));
  const notProvided = <span className="text-encre-douce">{t("notProvided")}</span>;
  const guardian = [profile?.guardian_name, profile?.guardian_phone].filter(Boolean).join(" · ");

  const rows = [
    { label: t("email"), value: profile?.email },
    { label: t("level"), value: profile?.level?.label },
    { label: t("school"), value: profile?.school },
    { label: t("phone"), value: profile?.phone },
    { label: t("guardian"), value: guardian },
  ];

  return (
    <>
      <dl className="divide-y divide-quadrillage border-y border-quadrillage">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="text-sm text-encre-douce">{row.label}</dt>
            <dd>{row.value || notProvided}</dd>
          </div>
        ))}
        <div className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
          <dt className="text-sm text-encre-douce">{t("groups")}</dt>
          <dd>
            {groups.length === 0 ? (
              notProvided
            ) : (
              <ul role="list" className="grid gap-1">
                {groups.map((group) => (
                  <li key={group.name}>
                    {group.name}
                    {group.schedule_label ? (
                      <span className="text-sm text-encre-douce"> · {group.schedule_label}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      </dl>
      <p className="text-sm text-encre-douce">{t("help")}</p>
    </>
  );
}
