import "server-only";
import { createClient } from "@/lib/supabase/server";

export type ChapterOptions = { label: string; chapters: { id: string; title: string }[] }[];

/** Every chapter, grouped by programme in teaching order (D-094), for a chapter picker. */
export async function listChapterOptions(): Promise<ChapterOptions> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("chapters")
    .select("id, title, semester, position, programme:programmes!inner(code, label, position)");

  const chapters = [...(data ?? [])].sort(
    (a, b) =>
      a.programme.position - b.programme.position ||
      (a.semester ?? 3) - (b.semester ?? 3) ||
      a.position - b.position,
  );
  const programmes: ChapterOptions = [];
  for (const chapter of chapters) {
    const last = programmes.at(-1);
    const entry = { id: chapter.id, title: chapter.title };
    if (last?.label === chapter.programme.label) {
      last.chapters.push(entry);
    } else {
      programmes.push({ label: chapter.programme.label, chapters: [entry] });
    }
  }
  return programmes;
}
