import { notFound, redirect } from "next/navigation";
import { pdfFileName, withDownloadName } from "@/lib/download-name";
import { isLessonFileName } from "@/lib/storage-paths";
import { createClient } from "@/lib/supabase/server";

/**
 * Hands out a short-lived URL for a lesson attachment.
 *
 * The client is the cookie-bound one, so `lesson-files: readable by whoever may read the
 * lesson` decides: a visitor who cannot see the lesson gets nothing to sign. Ten minutes
 * is long enough to open a PDF on weak 4G and short enough that a URL copied out of the
 * page is worthless by the time it is passed on.
 */
export async function GET(request: Request, context: RouteContext<"/cours/fichiers/[...chemin]">) {
  const { chemin } = await context.params;
  const name = chemin.join("/");

  // Next decodes each segment after splitting on "/", and storage-js puts the name into a
  // URL unencoded, so "..%2F" once carried this request to other Supabase endpoints with
  // the visitor's token. Only the id-shaped names the app writes are signed (D-052).
  if (!isLessonFileName(name)) notFound();

  const supabase = await createClient();

  // « Télécharger » saves it under the name the tutor gave it (D-107); « Ouvrir » shows it.
  const query = new URL(request.url).searchParams;
  const { data } = await supabase.storage.from("lesson-files").createSignedUrl(name, 600);
  if (!data) notFound();

  redirect(
    query.has("telecharger")
      ? withDownloadName(data.signedUrl, pdfFileName(query.get("nom"), "document"))
      : data.signedUrl,
  );
}
