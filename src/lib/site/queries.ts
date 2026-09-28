import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { publicClient } from "@/lib/supabase/public";
import type { Database } from "@/types/database";

// What the public site shows beyond lessons and posts (DECISIONS.md, D-089, D-090): the
// tutor's profile, the levels she teaches, where she teaches and the plans she offers. Read
// anonymously and cached; the tutor's saves refresh them by tag. A failed read throws rather
// than return an empty answer: an error is not cached, and a build fails loudly instead of
// shipping a site with no prices for a month.

export const SITE_TAG = "site:profil";
export const PLANS_TAG = "site:formules";
export const LEVELS_TAG = "site:niveaux";
export const MODES_TAG = "site:lieux";

export type SiteProfile = {
  tagline: string | null;
  bio: string | null;
  city: string | null;
  areas: string | null;
  whatsapp: string | null;
};

export async function getSiteProfile(): Promise<SiteProfile> {
  "use cache";
  cacheTag(SITE_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("site_profile")
    .select("tagline, bio, city, areas, whatsapp")
    .maybeSingle();
  if (error) throw new Error("Could not read the site profile", { cause: error });
  return {
    tagline: data?.tagline ?? null,
    bio: data?.bio ?? null,
    city: data?.city ?? null,
    areas: data?.areas ?? null,
    whatsapp: data?.whatsapp ?? null,
  };
}

export type OfferedPlan = {
  id: string;
  kind: Database["public"]["Enums"]["plan_kind"];
  name: string;
  hours: number | null;
  periodMonths: number | null;
  scope: Database["public"]["Enums"]["plan_scope"];
  priceMad: number;
};

/** The plans on offer, as a visitor may read them: anonymously, only the active ones. */
export async function listOfferedPlans(): Promise<OfferedPlan[]> {
  "use cache";
  cacheTag(PLANS_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("plans")
    .select("id, kind, name, hours, period_months, scope, price_mad")
    .eq("is_active", true)
    .order("kind")
    .order("price_mad");
  if (error) throw new Error("Could not read the plans", { cause: error });
  return data.map((row) => ({
    id: row.id,
    kind: row.kind,
    name: row.name,
    hours: row.hours === null ? null : Number(row.hours),
    periodMonths: row.period_months,
    scope: row.scope,
    priceMad: Number(row.price_mad),
  }));
}

export type LevelGroup = {
  cycle: string;
  levels: { code: string; label: string }[];
};

/** The levels she teaches, by cycle, in school order. */
export async function listLevelsByCycle(): Promise<LevelGroup[]> {
  "use cache";
  cacheTag(LEVELS_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("levels")
    .select("code, label, cycle")
    .order("position");
  if (error) throw new Error("Could not read the levels", { cause: error });
  // By cycle, in the order each cycle first appears, whatever the positions in between.
  const groups = new Map<string, LevelGroup>();
  for (const row of data) {
    const group = groups.get(row.cycle) ?? { cycle: row.cycle, levels: [] };
    group.levels.push({ code: row.code, label: row.label });
    groups.set(row.cycle, group);
  }
  return [...groups.values()];
}

export type SessionMode = Database["public"]["Enums"]["session_mode"];

/** Where her sessions take place: the places of the session types she offers. */
export async function listOfferedModes(): Promise<SessionMode[]> {
  "use cache";
  cacheTag(MODES_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("session_types")
    .select("mode")
    .eq("is_active", true);
  if (error) throw new Error("Could not read the session types", { cause: error });
  const order: SessionMode[] = ["chez_prof", "domicile", "en_ligne"];
  const offered = new Set(data.map((row) => row.mode));
  return order.filter((mode) => offered.has(mode));
}
