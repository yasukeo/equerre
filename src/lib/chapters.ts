import "server-only";
import { createClient } from "@/lib/supabase/server";

export type ChapterOptions = { label: string; chapters: { id: string; title: string }[] }[];

/** Every chapter, grouped by level in teaching order, for a chapter picker. */
export async function listChapterOptions(): Promise<ChapterOptions> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("chapters")
    .select("id, title, position, level:levels!inner(code, label, position)");

  const chapters = [...(data ?? [])].sort(
    (a, b) => a.level.position - b.level.position || a.position - b.position,
  );
  const levels: ChapterOptions = [];
  for (const chapter of chapters) {
    const last = levels.at(-1);
    const entry = { id: chapter.id, title: chapter.title };
    if (last?.label === chapter.level.label) {
      last.chapters.push(entry);
    } else {
      levels.push({ label: chapter.level.label, chapters: [entry] });
    }
  }
  return levels;
}
