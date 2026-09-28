import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { localDateKey, localDateKeyInDays } from "@/lib/dates";
import { adminClient, anonymousClient, seedId, signedInAs, type Client } from "./clients";

// Payments through the real API (DECISIONS.md, D-087): only the tutor records or voids one,
// through the database functions that number receipts; a student reads her own payments and
// account and nobody else's; plans on offer are public. Nobody signed in can delete a payment,
// so the secret key cleans up through public.remove_test_payments, which gives the numbers
// back under the counter's lock (D-088); without the key, this file is skipped.

const ids = {
  yassine: seedId("00000000", 105),
  nour: seedId("00000000", 106),
};

const admin = adminClient();
const today = localDateKey(new Date());
const year = today.slice(0, 4);

describe.skipIf(!admin)("payments", () => {
  let tutor: Client;
  let yassine: Client;
  let nour: Client;
  const plans: Record<"pack" | "subscription" | "withdrawn", string> = {
    pack: "",
    subscription: "",
    withdrawn: "",
  };
  const payments: string[] = [];

  async function record(args: {
    p_student_id?: string;
    p_amount_mad?: number;
    p_plan_id?: string;
    p_covers_from?: string;
    p_label?: string;
    p_hours?: number;
    p_paid_on?: string;
  }) {
    const result = await tutor.rpc("record_payment", {
      p_student_id: ids.yassine,
      p_amount_mad: 300,
      p_method: "especes",
      p_paid_on: today,
      ...args,
    });
    for (const row of result.data ?? []) payments.push(row.id);
    return result;
  }

  async function balanceOf(client: Client, studentId: string) {
    const { data, error } = await client.rpc("student_accounts", { p_student_id: studentId });
    if (error) throw error;
    return data[0] ? Number(data[0].balance_minutes) / 60 : null;
  }

  beforeAll(async () => {
    [tutor, yassine, nour] = await Promise.all([
      signedInAs("prof@equerre.test"),
      signedInAs("yassine.bennani@equerre.test"),
      signedInAs("nour.fassi@equerre.test"),
    ]);
    const { data, error } = await tutor
      .from("plans")
      .insert(
        [
          { kind: "hour_pack", name: "Test RLS — pack 3 h", hours: 3, price_mad: 450 },
          {
            kind: "subscription",
            name: "Test RLS — abonnement",
            period_months: 1,
            scope: "groupe",
            price_mad: 600,
          },
          {
            kind: "hour_pack",
            name: "Test RLS — retiré",
            hours: 1,
            price_mad: 150,
            is_active: false,
          },
          // Rows with different columns: the ones a row leaves out take their defaults.
        ],
        { defaultToNull: false },
      )
      .select("id, name");
    if (error) throw error;
    for (const row of data) {
      if (row.name.endsWith("pack 3 h")) plans.pack = row.id;
      else if (row.name.endsWith("abonnement")) plans.subscription = row.id;
      else plans.withdrawn = row.id;
    }
  });

  afterAll(async () => {
    const removed = await admin!.rpc("remove_test_payments", { p_ids: payments });
    if (removed.error) throw removed.error;
    const plansRemoved = await admin!
      .from("plans")
      .delete()
      .in("id", Object.values(plans).filter(Boolean));
    if (plansRemoved.error) throw plansRemoved.error;
  });

  it("lets only the tutor record a payment, numbered after the last one", async () => {
    const refused = await nour.rpc("record_payment", {
      p_student_id: ids.nour,
      p_amount_mad: 100,
      p_method: "especes",
      p_paid_on: today,
      p_label: "Test RLS",
    });
    expect(refused.error?.message).toBe("not_tutor");

    const first = await record({ p_plan_id: plans.pack });
    const second = await record({ p_label: "Test RLS — séance", p_hours: 1.5 });
    expect(first.error).toBeNull();
    expect(second.error).toBeNull();
    const [a, b] = [first.data![0]!.receipt_number, second.data![0]!.receipt_number];
    expect(a.slice(0, 5)).toBe(`${year}-`);
    expect(Number(b.slice(5))).toBe(Number(a.slice(5)) + 1);

    // A receipt is never written, changed or removed by hand, not even by the tutor.
    const direct = await tutor.from("payments").insert({
      receipt_number: `${year}-9999`,
      student_id: ids.yassine,
      label: "Test RLS",
      amount_mad: 1,
      method: "especes",
      paid_on: today,
    });
    expect(direct.error).not.toBeNull();
    const { data: changed } = await tutor
      .from("payments")
      .update({ amount_mad: 1 })
      .eq("id", payments[0]!)
      .select("id");
    expect(changed ?? []).toEqual([]);
    const { data: removed } = await tutor
      .from("payments")
      .delete()
      .eq("id", payments[0]!)
      .select("id");
    expect(removed ?? []).toEqual([]);
  });

  it("keeps each student's payments and account to her", async () => {
    const { data: own } = await yassine.from("payments").select("id").in("id", payments);
    expect(own?.length).toBe(payments.length);
    const { data: foreign } = await nour.from("payments").select("id").in("id", payments);
    expect(foreign).toEqual([]);

    const theirs = await nour.rpc("student_accounts", { p_student_id: ids.yassine });
    expect(theirs.data).toEqual([]);
    const mine = await nour.rpc("student_accounts");
    expect(mine.data?.map((row) => row.student_id)).toEqual([ids.nour]);
    const statement = await nour.rpc("account_statement", { p_student_id: ids.yassine });
    expect(statement.data).toEqual([]);

    const anonymous = await anonymousClient().rpc("student_accounts");
    expect(anonymous.error).not.toBeNull();

    // Giving receipt numbers back is the test's cleanup, for the secret key alone.
    for (const client of [nour, tutor]) {
      const giveBack = await client.rpc("remove_test_payments", { p_ids: payments });
      expect(giveBack.error).not.toBeNull();
    }
  });

  it("credits a pack's hours, and forgets a voided payment", async () => {
    const before = await balanceOf(tutor, ids.yassine);
    const { data } = await record({ p_plan_id: plans.pack });
    const id = data![0]!.id;
    expect(await balanceOf(tutor, ids.yassine)).toBeCloseTo(Number(before) + 3, 2);
    expect(await balanceOf(yassine, ids.yassine)).toBeCloseTo(Number(before) + 3, 2);

    const byStudent = await yassine.rpc("void_payment", { p_payment_id: id, p_reason: "Test" });
    expect(byStudent.error?.message).toBe("not_tutor");
    const noReason = await tutor.rpc("void_payment", { p_payment_id: id, p_reason: "  " });
    expect(noReason.error?.message).toBe("reason_invalid");
    const voided = await tutor.rpc("void_payment", { p_payment_id: id, p_reason: "Test RLS" });
    expect(voided.error).toBeNull();
    expect(await balanceOf(tutor, ids.yassine)).toBeCloseTo(Number(before), 2);
    const again = await tutor.rpc("void_payment", { p_payment_id: id, p_reason: "Test RLS" });
    expect(again.error?.message).toBe("payment_not_found");
  });

  it("refuses a withdrawn plan, a date to come and a subscription with no start", async () => {
    expect((await record({ p_plan_id: plans.withdrawn })).error?.message).toBe("plan_invalid");
    expect(
      (await record({ p_label: "Test RLS", p_paid_on: localDateKeyInDays(new Date(), 1) })).error
        ?.message,
    ).toBe("date_invalid");
    expect((await record({ p_plan_id: plans.subscription })).error?.message).toBe(
      "covers_from_required",
    );
    expect((await record({ p_amount_mad: 0, p_label: "Test RLS" })).error?.message).toBe(
      "amount_invalid",
    );
    expect((await record({})).error?.message).toBe("label_invalid");

    const covered = await record({ p_plan_id: plans.subscription, p_covers_from: "2026-01-31" });
    expect(covered.error).toBeNull();
    const { data: row } = await tutor
      .from("payments")
      .select("covers_from, covers_to, covers_scope, hours_credited")
      .eq("id", covered.data![0]!.id)
      .single();
    expect(row).toEqual({
      covers_from: "2026-01-31",
      covers_to: "2026-02-27",
      covers_scope: "groupe",
      hours_credited: 0,
    });
  });

  it("shows plans on offer to anyone, and lets only the tutor write them", async () => {
    const { data } = await anonymousClient()
      .from("plans")
      .select("id")
      .in("id", Object.values(plans));
    expect(data?.map((row) => row.id).sort()).toEqual([plans.pack, plans.subscription].sort());
    const forged = await nour
      .from("plans")
      .insert({ kind: "hour_pack", name: "Test RLS", hours: 100, price_mad: 1 });
    expect(forged.error).not.toBeNull();
    const { data: cheaper } = await nour
      .from("plans")
      .update({ price_mad: 1 })
      .eq("id", plans.pack)
      .select("id");
    expect(cheaper ?? []).toEqual([]);
  });
});
