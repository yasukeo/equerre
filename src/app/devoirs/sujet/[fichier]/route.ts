import { notFound, redirect } from "next/navigation";
import { pdfFileName, withDownloadName } from "@/lib/download-name";
import { SUBJECT_BUCKET } from "@/lib/homework/subject";
import { isSubjectName } from "@/lib/storage-paths";
import { createClient } from "@/lib/supabase/server";

/**
 * Opens a homework's PDF subject (D-106) with an address made at the click. A signed address
 * written into the page expired after a few hours, and Next keeps a page alive long after it
 * was drawn: the link then answered with an error. Here, as for a lesson's files, the
 * cookie-bound client asks storage, so the subjects policy decides who may open it, and the
 * address handed out lives ten minutes.
 */
export async function GET(request: Request, context: RouteContext<"/devoirs/sujet/[fichier]">) {
  const { fichier } = await context.params;
  // Only the id-shaped names the app writes are ever signed (D-052).
  if (!isSubjectName(fichier)) notFound();

  const supabase = await createClient();
  const { data } = await supabase.storage.from(SUBJECT_BUCKET).createSignedUrl(fichier, 600);
  if (!data) notFound();
  if (!new URL(request.url).searchParams.has("telecharger")) redirect(data.signedUrl);

  // Saved under the homework's name rather than an id; the policies say whether it is hers.
  const { data: exercise } = await supabase
    .from("exercises")
    .select("title")
    .eq("subject_path", fichier)
    .maybeSingle();
  redirect(withDownloadName(data.signedUrl, pdfFileName(exercise?.title, "sujet")));
}
