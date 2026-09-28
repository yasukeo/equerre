"use server";

import { updateTag } from "next/cache";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { PHONE_PATTERN } from "@/lib/contact";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { SITE_TAG } from "@/lib/site/queries";
import { whatsappNumber } from "@/lib/site/whatsapp";
import { createClient } from "@/lib/supabase/server";

// The tutor's presentation on the public site (DECISIONS.md, D-089): one row she edits here,
// which the cached public pages show once saved.

const profileSchema = z.object({
  tagline: z.string().trim().max(160),
  bio: z.string().trim().max(1500),
  city: z.string().trim().max(80),
  areas: z.string().trim().max(200),
  // A number the site can turn into a WhatsApp link: a Moroccan one, however it is written.
  whatsapp: z
    .string()
    .trim()
    .pipe(
      z.union([
        z.literal(""),
        z
          .string()
          .regex(PHONE_PATTERN)
          .refine((value) => whatsappNumber(value) !== null),
      ]),
    ),
});

export async function saveSiteProfile(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([getTranslations("siteAdmin"), getTranslations("forms")]);
  const values = {
    tagline: textField(formData, "tagline"),
    bio: textField(formData, "bio"),
    city: textField(formData, "city"),
    areas: textField(formData, "areas"),
    whatsapp: textField(formData, "whatsapp"),
  };
  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        tagline: t("errors.tagline"),
        bio: t("errors.bio"),
        city: t("errors.city"),
        areas: t("errors.areas"),
        whatsapp: t("errors.whatsapp"),
      }),
      values,
    };
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_profile")
    .update({
      tagline: parsed.data.tagline || null,
      bio: parsed.data.bio || null,
      city: parsed.data.city || null,
      areas: parsed.data.areas || null,
      whatsapp: parsed.data.whatsapp || null,
    })
    .eq("id", true)
    .select("id");
  if (error || data.length === 0) {
    return { status: "error", message: t("errors.unknown"), values };
  }
  updateTag(SITE_TAG);
  return { status: "success", message: t("saved"), values };
}
