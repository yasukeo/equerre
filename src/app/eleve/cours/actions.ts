"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// Her own map of the course (DECISIONS.md, D-104): what she keeps « à revoir », what she
// understood. The database checks she may read the document (set_lesson_bookmark,
// track_lesson); these only pass the request on.

export type ToggleResult = { ok: true; value: boolean } | { ok: false };

export async function setBookmark(lessonId: string, saved: boolean): Promise<ToggleResult> {
  await requireViewer("student");
  const id = z.uuid().safeParse(lessonId);
  if (!id.success) return { ok: false };
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("set_lesson_bookmark", {
    p_lesson_id: id.data,
    p_saved: saved,
  });
  if (error) return { ok: false };
  refresh();
  return { ok: true, value: data };
}

export async function setUnderstood(lessonId: string, understood: boolean): Promise<ToggleResult> {
  await requireViewer("student");
  const id = z.uuid().safeParse(lessonId);
  if (!id.success) return { ok: false };
  const supabase = await createClient();
  const { error } = await supabase.rpc("track_lesson", {
    p_lesson_id: id.data,
    p_understood: understood,
  });
  if (error) return { ok: false };
  refresh();
  return { ok: true, value: understood };
}
