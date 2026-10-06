// Imports Équerre's corrections of the national exams the ministry published no answers for
// (content/corriges/<programme>/<paper>.md, DECISIONS.md D-103), and puts them online (D-101).
//
//   pnpm corrections:import            checks every file and says what it would do
//   pnpm corrections:import --write    writes them: a new correction is published, a changed
//                                      one rewritten from its file
//
// A file names its paper: `2021-normale.md`, `2019-normale-pc-svt-et-sciences-agronomiques.md`
// (src/lib/exams/files.ts, examPaperSlug). A correction the tutor took off the site keeps that
// status: only its text follows the file. A file with the least mistake stops the whole import.
// The public pages are cached: they show what changed after the next deployment.

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { relative, sep } from "node:path";
import { canonical, formulaProblems, markdownFiles } from "./content-checks.mjs";
import { connect } from "./database.mjs";
import { ContentSyntaxError, parseBody } from "../src/lib/content/markdown";
import { examPaperSlug, type ExamSession } from "../src/lib/exams/files";
import { lessonDocumentSchema } from "../src/lib/lesson/document";

const ROOT = new URL("../content/corriges/", import.meta.url);
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const write = process.argv.includes("--write");

type Parsed = {
  /** `corriges/<programme>/<paper>.md`, as the table records it. */
  file: string;
  programme: string;
  paper: string;
  summary: string;
  content: { type: "doc"; content: unknown[] };
};

/** The front matter holds one field, the summary under the title; the rest is the correction. */
function parseCorrection(source: string): { summary: string; content: unknown[] } {
  const text = source.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) throw new ContentSyntaxError([{ line: 1, message: "l’en-tête « --- » manque" }]);
  let summary = "";
  const errors: { line: number; message: string }[] = [];
  match[1]!.split("\n").forEach((raw, index) => {
    if (raw.trim() === "") return;
    const field = /^summary:\s*(.*)$/.exec(raw.trim());
    if (!field) {
      errors.push({ line: index + 2, message: "seul le champ « summary » est attendu" });
      return;
    }
    summary = field[1]!.trim().replace(/^"(.*)"$/, "$1");
  });
  if (summary === "" || summary.length > 300) {
    errors.push({ line: 2, message: "« summary » manque ou dépasse 300 caractères" });
  }
  if (errors.length > 0) throw new ContentSyntaxError(errors);
  return {
    summary,
    content: parseBody(text.slice(match[0].length), match[0].split("\n").length),
  };
}

function fingerprint(document: { summary: string; content: unknown }): string {
  return createHash("sha256")
    .update(JSON.stringify(canonical({ summary: document.summary, content: document.content })))
    .digest("hex");
}

const root = decodeURIComponent(ROOT.pathname).replace(/^\/([A-Za-z]:)/, "$1");
const problems: string[] = [];
const parsed: Parsed[] = [];

for (const path of (await markdownFiles(root)).sort()) {
  const file = `corriges/${relative(root, path).split(sep).join("/")}`;
  const parts = file.replace(/\.md$/, "").split("/");
  if (parts.length !== 3 || !parts.every((part) => SLUG.test(part))) {
    problems.push(`${file} : le chemin doit être corriges/programme/sujet.md, en minuscules`);
    continue;
  }
  const [, programme, paper] = parts as [string, string, string];
  try {
    const { summary, content } = parseCorrection(await readFile(path, "utf8"));
    const document = { type: "doc" as const, content };
    const check = lessonDocumentSchema.safeParse(document);
    if (!check.success) {
      problems.push(`${file} : ${check.error.issues.map((issue) => issue.message).join(" ; ")}`);
      continue;
    }
    problems.push(...formulaProblems(content).map((problem) => `${file} : ${problem}`));
    parsed.push({ file, programme, paper, summary, content: document });
  } catch (error) {
    if (!(error instanceof ContentSyntaxError)) throw error;
    problems.push(...error.errors.map((e) => `${file}, ligne ${e.line} : ${e.message}`));
  }
}

const databaseUrl = process.env.SUPABASE_DB_URL;
if (!databaseUrl) {
  console.error("SUPABASE_DB_URL is missing from .env.local.");
  process.exit(1);
}
const sql = connect(databaseUrl);

type PaperRow = {
  id: string;
  programme: string;
  year: number;
  session: ExamSession;
  track: string | null;
  solution_path: string | null;
  source: string | null;
  source_hash: string | null;
};

try {
  const papers = await sql<PaperRow[]>`
    select e.id, p.slug as programme, e.year, e.session::text as session, e.track,
      e.solution_path, c.source, c.source_hash
    from public.national_exams e
    join public.programmes p on p.code = e.programme_code
    left join public.exam_corrections c on c.exam_id = e.id`;

  const plan: { document: Parsed; paper: PaperRow; action: "create" | "update" | "keep" }[] = [];
  for (const document of parsed) {
    const matches = papers.filter(
      (paper) => paper.programme === document.programme && examPaperSlug(paper) === document.paper,
    );
    if (matches.length !== 1) {
      problems.push(
        matches.length === 0
          ? `${document.file} : aucun sujet « ${document.paper} » dans le programme « ${document.programme} » (content/examens-nationaux.json)`
          : `${document.file} : plusieurs sujets portent cette adresse`,
      );
      continue;
    }
    const paper = matches[0]!;
    // Where the ministry, or the tutor, gave a correction, Équerre does not add a second one.
    if (paper.solution_path !== null) {
      problems.push(`${document.file} : ce sujet a déjà un corrigé en PDF`);
      continue;
    }
    if (paper.source !== null && paper.source !== document.file) {
      problems.push(`${document.file} : ce sujet a déjà un corrigé, importé de ${paper.source}`);
      continue;
    }
    const hash = fingerprint(document);
    plan.push({
      document,
      paper,
      action: paper.source === null ? "create" : paper.source_hash === hash ? "keep" : "update",
    });
  }

  if (problems.length > 0) {
    console.error(`Rien n’a été importé : ${problems.length} problème(s).\n`);
    for (const problem of problems) console.error(`  ${problem}`);
    process.exitCode = 1;
  } else {
    if (write) {
      await sql.begin(async (tx) => {
        for (const { document, paper, action } of plan) {
          const hash = fingerprint(document);
          if (action === "create") {
            await tx`
              insert into public.exam_corrections
                (exam_id, summary, content, status, published_at, source, source_hash)
              values (${paper.id}, ${document.summary}, ${tx.json(document.content as never)},
                'published', now(), ${document.file}, ${hash})`;
          } else if (action === "update") {
            await tx`
              update public.exam_corrections set
                summary = ${document.summary}, content = ${tx.json(document.content as never)},
                source_hash = ${hash}
              where exam_id = ${paper.id}`;
          }
        }
      });
    }

    // A correction whose file is gone stays as it is: removing one is the tutor's decision.
    const files = new Set(parsed.map((document) => document.file));
    const orphans = papers.filter((paper) => paper.source !== null && !files.has(paper.source));

    const named = (action: string) =>
      plan.filter((entry) => entry.action === action).map((entry) => entry.document.file);
    const verb = write ? "" : " (à faire)";
    console.log(`${parsed.length} corrigé(s) lu(s).`);
    for (const [label, list] of [
      [`Publiés${verb}`, named("create")],
      [`Réécrits depuis leur fichier${verb}`, named("update")],
      ["Sans fichier, laissés tels quels", orphans.map((paper) => paper.source!)],
    ] as const) {
      if (list.length === 0) continue;
      console.log(`\n${label} : ${list.length}`);
      for (const file of list) console.log(`  ${file}`);
    }
    const kept = named("keep").length;
    if (kept > 0) console.log(`\n${kept} corrigé(s) inchangé(s).`);
    if (!write) console.log("\nRien n’a été écrit : ajoutez --write pour importer.");
  }
} finally {
  await sql.end();
}
