"use server";

import { refresh, updateTag } from "next/cache";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { parseDecimal } from "@/lib/decimal";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { MAX_SESSION_TYPE_NAME_LENGTH } from "@/lib/sessions/limits";
import { MODES_TAG } from "@/lib/site/queries";
import { createClient } from "@/lib/supabase/server";

// Session types: a duration, a mode and a price in MAD (DECISIONS.md, D-074). A type sessions
// point to is never deleted; she stops offering it instead.

const typeSchema = z.object({
  name: z.string().trim().min(1).max(MAX_SESSION_TYPE_NAME_LENGTH),
  durationMin: z.coerce.number().int().min(15).max(480),
  mode: z.enum(["en_ligne", "domicile", "chez_prof"]),
  // numeric(8, 2), never negative: up to 999 999,99 MAD.
  price: z
    .string()
    .transform((value) => parseDecimal(value))
    .refine((value): value is string => value !== null && /^\d{1,6}(\.\d{1,2})?$/.test(value)),
  isActive: z.enum(["true", "false"]).transform((value) => value === "true"),
});

async function readType(formData: FormData) {
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.sessionTypes"),
    getTranslations("forms"),
  ]);
  const values = {
    name: textField(formData, "name"),
    durationMin: textField(formData, "durationMin"),
    mode: textField(formData, "mode"),
    price: textField(formData, "price"),
    isActive: textField(formData, "isActive") || "true",
  };
  const parsed = typeSchema.safeParse({
    ...values,
    durationMin: values.durationMin.trim() || "x",
  });
  if (!parsed.success) {
    return {
      ok: false as const,
      state: {
        status: "error",
        message: tForms("checkFields"),
        fieldErrors: fieldErrorsFor(parsed.error, {
          name: t("errors.name"),
          durationMin: t("errors.duration"),
          mode: t("errors.mode"),
          price: t("errors.price"),
        }),
        values,
      } satisfies FormState,
    };
  }
  return {
    ok: true as const,
    row: {
      name: parsed.data.name,
      duration_min: parsed.data.durationMin,
      mode: parsed.data.mode,
      // Two decimals at most, which a double carries exactly enough for numeric(8, 2).
      price_mad: Number(parsed.data.price),
      is_active: parsed.data.isActive,
    },
    values,
    t,
  };
}

export async function createType(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const read = await readType(formData);
  if (!read.ok) return read.state;

  const supabase = await createClient();
  const { error } = await supabase
    .from("session_types")
    .insert({ ...read.row, is_group: textField(formData, "isGroup") === "true" });
  if (error) return { status: "error", message: read.t("errors.unknown"), values: read.values };
  // The public site says where sessions take place, from the types on offer (D-090).
  updateTag(MODES_TAG);
  refresh();
  return { status: "success", message: read.t("created") };
}

export async function updateType(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const id = z.uuid().safeParse(textField(formData, "id"));
  const read = await readType(formData);
  if (!read.ok) return read.state;
  if (!id.success) return { status: "error", message: read.t("errors.gone"), values: read.values };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("session_types")
    .update(read.row)
    .eq("id", id.data)
    .select("id");
  if (error) return { status: "error", message: read.t("errors.unknown"), values: read.values };
  if (data.length === 0) {
    return { status: "error", message: read.t("errors.gone"), values: read.values };
  }
  updateTag(MODES_TAG);
  refresh();
  return { status: "success", message: read.t("saved"), values: read.values };
}
