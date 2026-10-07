import { Mail, MessageSquareText, Phone, School, UserRound, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Initials } from "@/components/initials";
import { AccountPanel } from "@/components/payments/account-panel";
import { PageHeader } from "@/components/shell/page-header";
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
    <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-8">
      <PageHeader title={t("title")} />
      <Suspense fallback={<div aria-hidden="true" className="h-72 rounded-2xl bg-sunken" />}>
        <ProfileDetails />
      </Suspense>
      <Suspense fallback={<div aria-hidden="true" className="h-72 rounded-2xl bg-sunken" />}>
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
        <h2 id="my-account" className="text-lg font-semibold">
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
    { key: "email", icon: Mail, label: t("email"), value: profile?.email },
    { key: "school", icon: School, label: t("school"), value: profile?.school },
    { key: "phone", icon: Phone, label: t("phone"), value: profile?.phone },
    { key: "guardian", icon: UserRound, label: t("guardian"), value: guardian },
  ];

  return (
    <>
      {/* Her pupil's card: who she is for the tutor, at a glance. */}
      <section
        aria-label={t("card")}
        className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 overflow-hidden rounded-2xl bg-encre-fixe p-5 text-white sm:p-6"
      >
        <Initials
          name={viewer.fullName}
          className="size-16 bg-white/15 text-xl text-white sm:size-20 sm:text-2xl"
        />
        <div className="grid min-w-0 gap-1">
          <p className="text-xl leading-tight font-semibold break-words sm:text-2xl">
            {viewer.fullName}
          </p>
          <p className="text-sm text-white/80">
            {[profile?.level?.label, profile?.school].filter(Boolean).join(" · ") ||
              t("notProvided")}
          </p>
        </div>
      </section>

      <section aria-labelledby="profile-details" className="grid gap-3">
        <h2 id="profile-details" className="text-lg font-semibold">
          {t("detailsHeading")}
        </h2>
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.key} className="flex items-start gap-3 bg-surface px-4 py-3">
              <row.icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-encre-douce" />
              <div className="grid min-w-0 gap-0.5">
                <dt className="text-sm text-encre-douce">{row.label}</dt>
                <dd className="break-words">{row.value || notProvided}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="profile-groups" className="grid gap-3">
        <h2 id="profile-groups" className="text-lg font-semibold">
          {t("groups")}
        </h2>
        {groups.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-sm text-encre-douce">
            {t("noGroups")}
          </p>
        ) : (
          <ul role="list" className="grid gap-2 sm:grid-cols-2">
            {groups.map((group) => (
              <li
                key={group.name}
                className="flex items-center gap-3 rounded-2xl border border-quadrillage bg-surface px-4 py-3"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-fond text-violet-texte"
                >
                  <Users className="size-5" />
                </span>
                <span className="grid min-w-0 gap-0.5">
                  <span className="font-medium break-words">{group.name}</span>
                  {group.schedule_label ? (
                    <span className="text-sm text-encre-douce">{group.schedule_label}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl bg-sunken px-4 py-3 text-sm">
        <MessageSquareText aria-hidden="true" className="size-4 shrink-0" />
        {t("help")}
        <Link
          href="/eleve/messages"
          className="inline-flex min-h-11 items-center font-medium underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {t("writeTutor")}
        </Link>
      </p>
    </>
  );
}
