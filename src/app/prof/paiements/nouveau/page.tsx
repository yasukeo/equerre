import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { localDateKey } from "@/lib/dates";
import { getAccounts, listPlans, PAYMENT_METHODS } from "@/lib/payments/queries";
import { createClient } from "@/lib/supabase/server";
import { PaymentForm, type StudentChoice } from "./payment-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("recordPayment");
  return { title: t("title") };
}

export default async function RecordPaymentPage({
  searchParams,
}: PageProps<"/prof/paiements/nouveau">) {
  const t = await getTranslations("recordPayment");

  return (
    <div className="grid max-w-2xl gap-6">
      <Link
        href="/prof/paiements"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="max-w-prose text-encre-douce">{t("lead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <Form searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Form({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireViewer("tutor");
  const [t, tStatus, params] = await Promise.all([
    getTranslations("recordPayment"),
    getTranslations("studentStatus"),
    searchParams,
  ]);
  const supabase = await createClient();
  const [profiles, plans, accounts] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, status")
      .eq("role", "student")
      .order("full_name")
      .order("id"),
    listPlans({ offeredOnly: true }),
    getAccounts(),
  ]);
  if (profiles.error) throw new Error("Could not read the students", { cause: profiles.error });
  if (profiles.data.length === 0) {
    return (
      <div className="grid gap-2">
        <p>{t("noStudents")}</p>
        <Link
          href="/prof/eleves/inviter"
          className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {t("inviteStudent")}
        </Link>
      </div>
    );
  }

  const today = localDateKey(new Date());
  const students: StudentChoice[] = profiles.data.map((profile) => {
    const account = accounts.get(profile.id);
    return {
      id: profile.id,
      label:
        profile.status === "actif"
          ? profile.full_name
          : `${profile.full_name} (${tStatus(profile.status)})`,
      balance: account?.balance ?? 0,
      coverage: account?.coverage ?? [],
    };
  });
  const wanted = typeof params.eleve === "string" ? params.eleve : "";

  return (
    <PaymentForm
      students={students}
      plans={plans}
      methods={PAYMENT_METHODS}
      initialStudentId={wanted}
      today={today}
    />
  );
}
