import { z } from "zod";

/** Same rule as the `profiles.phone` and `profiles.guardian_phone` check constraints. */
export const PHONE_PATTERN = /^\+?[0-9 ]{6,20}$/;

const optionalPhone = z
  .string()
  .trim()
  .pipe(z.union([z.literal(""), z.string().regex(PHONE_PATTERN)]));

const optionalText = z.string().trim().max(120);

/** Optional contact details, collected at sign-up and when the tutor creates an account. */
export const contactFieldsSchema = z.object({
  phone: optionalPhone,
  school: optionalText,
  guardianName: optionalText,
  guardianPhone: optionalPhone,
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;

export function contactValues(formData: FormData): Record<keyof ContactFields, string> {
  const read = (key: keyof ContactFields) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    phone: read("phone"),
    school: read("school"),
    guardianName: read("guardianName"),
    guardianPhone: read("guardianPhone"),
  };
}

/** The `user_metadata` keys the auth trigger copies onto the new profile. Blank values are left out. */
export function contactMetadata(fields: ContactFields): Record<string, string> {
  const metadata = {
    phone: fields.phone,
    school: fields.school,
    guardian_name: fields.guardianName,
    guardian_phone: fields.guardianPhone,
  };
  return Object.fromEntries(Object.entries(metadata).filter(([, value]) => value !== ""));
}
