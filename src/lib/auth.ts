import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export type Role = Database["public"]["Enums"]["user_role"];

/** The signed-in person, narrowed to what pages need. */
export type Viewer = {
  id: string;
  role: Role;
  fullName: string;
  levelCode: string | null;
  status: Database["public"]["Enums"]["student_status"];
};

export function homePathFor(role: Role): string {
  return role === "tutor" ? "/prof" : role === "parent" ? "/parent" : "/eleve";
}

/**
 * Reads and verifies the session (getClaims checks the JWT signature), then loads the
 * profile through RLS. Deduplicated per request. Call it inside a <Suspense> boundary.
 */
export const getViewer = cache(async (): Promise<Viewer | null> => {
  // getClaims compares the token's expiry with the current time. Cache Components only
  // allows reading the clock once rendering is tied to a real request.
  await connection();
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims.sub;
  if (!userId) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name, level_code, status")
    .eq("id", userId)
    .maybeSingle();

  if (!profile) {
    return null;
  }

  return {
    id: profile.id,
    role: profile.role,
    fullName: profile.full_name,
    levelCode: profile.level_code,
    status: profile.status,
  };
});

/** Sends signed-out visitors to sign in, and people with the wrong role to their own home. */
export async function requireViewer(role?: Role): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer) {
    redirect("/connexion");
  }
  if (role && viewer.role !== role) {
    redirect(homePathFor(viewer.role));
  }
  return viewer;
}
