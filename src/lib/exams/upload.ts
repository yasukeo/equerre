// A national exam's PDF sent from the tutor's browser to the bucket (D-097), with its progress:
// a 20 MB paper on a phone connection takes a while, and the tutor should see it move.
// storage-js has no progress events, so this is its upload request written out, under the
// same session and the same storage policies.

import { publicEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/client";

/** How long a browser or the CDN may keep a paper: a day, so a deleted one goes soon. */
const CACHE_SECONDS = 86_400;

export async function uploadExamFile(
  name: string,
  file: File,
  onProgress: (sent: number) => void,
): Promise<void> {
  const { data } = await createClient().auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("No session to upload with");

  await new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      `${publicEnv.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/national-exams/${name}`,
    );
    request.setRequestHeader("authorization", `Bearer ${token}`);
    request.setRequestHeader("apikey", publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
    // Whatever type the system gave the file (none, on Windows without a reader): a PDF.
    request.setRequestHeader("content-type", "application/pdf");
    request.setRequestHeader("cache-control", `max-age=${CACHE_SECONDS}`);
    request.setRequestHeader("x-upsert", "false");
    request.upload.onprogress = (event) => onProgress(event.loaded);
    request.onload = () =>
      request.status >= 200 && request.status < 300
        ? resolve()
        : reject(new Error(`Storage answered ${request.status}`));
    request.onerror = () => reject(new Error("The upload did not get through"));
    request.send(file);
  });
}
