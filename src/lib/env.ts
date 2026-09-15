import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().startsWith("sb_publishable_"),
});

/**
 * Configuration that is safe in the browser. Each variable is read by its full name
 * so Next.js can inline it into client bundles.
 */
export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
});
