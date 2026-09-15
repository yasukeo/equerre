import "server-only";
import { z } from "zod";

// An empty line in .env (`KEY=`) means "not configured", not "configured as empty".
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === "" ? undefined : value), schema.optional());

const serverSchema = z.object({
  SUPABASE_SECRET_KEY: optional(z.string().startsWith("sb_secret_")),
  RESEND_API_KEY: optional(z.string().min(1)),
  EMAIL_FROM: z.string().min(3).default("Équerre <bonjour@example.com>"),
  CRON_SECRET: optional(z.string().min(32)),
});

export const serverEnv = serverSchema.parse({
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  CRON_SECRET: process.env.CRON_SECRET,
});
