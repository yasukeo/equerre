// Publishes the official past national exams listed in content/examens-nationaux.json (D-099):
// each subject, and its « éléments de réponse » when the ministry published them, downloaded
// from the Centre national des examens et de l'évaluation and stored as they are, with their
// source.
//
//   pnpm exams:import            says what it would do
//   pnpm exams:import --write    downloads and publishes the papers not on the site yet
//
// A paper already on the site (same programme, year, session and streams) is left alone,
// whoever put it there. Uploading to storage is an admin operation: SUPABASE_SECRET_KEY.

import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { connect } from "./database.mjs";

type Paper = {
  programme: string;
  track: string | null;
  language: "fr" | "ar";
  year: number;
  session: "normale" | "rattrapage";
  subject: string;
  answers: string | null;
};

const write = process.argv.includes("--write");
const MAX_BYTES = 20 * 1024 * 1024;
const BUCKET = "national-exams";

const manifest = JSON.parse(
  await readFile(new URL("../content/examens-nationaux.json", import.meta.url), "utf8"),
) as { base: string; papers: Paper[] };

const { SUPABASE_DB_URL, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;
if (!SUPABASE_DB_URL || !NEXT_PUBLIC_SUPABASE_URL || (write && !SUPABASE_SECRET_KEY)) {
  console.error("SUPABASE_DB_URL, NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY are needed.");
  process.exit(1);
}

const key = (paper: { programme: string; year: number; session: string; track: string | null }) =>
  `${paper.programme}|${paper.year}|${paper.session}|${paper.track ?? ""}`;
const label = (paper: Paper) =>
  `${paper.programme} ${paper.year} ${paper.session}${paper.track ? ` (${paper.track})` : ""}`;

/** A PDF from the ministry's server, checked to be one. A few tries: the server is slow. */
async function download(path: string): Promise<Buffer> {
  const url = new URL(path, manifest.base).href;
  for (let attempt = 1; ; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
      if (!response.ok) throw new Error(`${response.status} for ${url}`);
      const body = Buffer.from(await response.arrayBuffer());
      if (body.subarray(0, 5).toString("latin1") !== "%PDF-") throw new Error(`not a PDF: ${url}`);
      if (body.length > MAX_BYTES) throw new Error(`over 20 MB: ${url}`);
      return body;
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    }
  }
}

const sql = connect(SUPABASE_DB_URL);
try {
  const programmes = new Set(
    (await sql<{ code: string }[]>`select code from public.programmes`).map((row) => row.code),
  );
  const unknown = manifest.papers.filter((paper) => !programmes.has(paper.programme));
  if (unknown.length > 0) {
    console.error(
      `Programmes inconnus : ${[...new Set(unknown.map((p) => p.programme))].join(", ")}`,
    );
    process.exit(1);
  }

  const existing = new Set(
    (
      await sql<{ programme_code: string; year: number; session: string; track: string | null }[]>`
        select programme_code, year, session, track from public.national_exams`
    ).map((row) => key({ ...row, programme: row.programme_code })),
  );
  const todo = manifest.papers.filter((paper) => !existing.has(key(paper)));
  console.log(
    `${manifest.papers.length} sujet(s) dans la liste, ${manifest.papers.length - todo.length} déjà sur le site, ${todo.length} à publier.`,
  );
  if (!write) {
    for (const paper of todo)
      console.log(`  ${label(paper)}${paper.answers ? " + éléments de réponse" : ""}`);
    console.log("\nRien n’a été écrit : ajoutez --write pour publier.");
  } else {
    const storage = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    }).storage.from(BUCKET);
    const failed: string[] = [];

    for (const paper of todo) {
      const id = randomUUID();
      const uploaded: string[] = [];
      try {
        const files = await Promise.all([
          download(paper.subject),
          paper.answers ? download(paper.answers) : Promise.resolve(null),
        ]);
        const names: (string | null)[] = [];
        for (const file of files) {
          if (!file) {
            names.push(null);
            continue;
          }
          const name = `${id}/${randomUUID()}.pdf`;
          const { error } = await storage.upload(name, file, {
            contentType: "application/pdf",
            cacheControl: "86400",
            upsert: false,
          });
          if (error) throw error;
          uploaded.push(name);
          names.push(name);
        }
        const [subject, answers] = files;
        await sql`
          insert into public.national_exams
            (id, programme_code, year, session, track, language, official,
             subject_path, subject_size, subject_source_url,
             solution_path, solution_size, solution_source_url, status)
          values
            (${id}, ${paper.programme}, ${paper.year}, ${paper.session}, ${paper.track},
             ${paper.language}, true,
             ${names[0]!}, ${subject!.length}, ${new URL(paper.subject, manifest.base).href},
             ${names[1] ?? null}, ${answers ? answers.length : null},
             ${paper.answers ? new URL(paper.answers, manifest.base).href : null}, 'published')`;
        console.log(`  publié : ${label(paper)}`);
      } catch (error) {
        if (uploaded.length > 0) await storage.remove(uploaded);
        failed.push(`${label(paper)} : ${(error as Error).message}`);
        console.error(`  échec : ${label(paper)}`);
      }
    }

    console.log(`\n${todo.length - failed.length} sujet(s) publié(s).`);
    if (failed.length > 0) {
      console.error(`${failed.length} échec(s), à relancer :`);
      for (const line of failed) console.error(`  ${line}`);
      process.exitCode = 1;
    }
    console.log(
      "Les pages publiques se mettent à jour au prochain déploiement, ou dès qu’un examen est enregistré dans /prof/examens.",
    );
  }
} finally {
  await sql.end();
}
