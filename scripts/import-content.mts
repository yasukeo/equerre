// Imports the course documents written as files (content/<programme>/<chapitre>/<slug>.md) as
// drafts the tutor reads, corrects and publishes herself (DECISIONS.md, D-098).
//
//   pnpm content:import              says what it would do, and checks every file
//   pnpm content:import --write      imports the documents that are not in the database yet
//   pnpm content:import --write --update
//                                    also rewrites the ones still in draft from their file
//
// A published document is never touched: once the tutor has published it, it is hers. A file
// with the least mistake stops the whole import, with its line.

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { relative, sep } from "node:path";
import { connect } from "./database.mjs";
import { canonical, formulaProblems, markdownFiles } from "./content-checks.mjs";
import { ContentSyntaxError, parseDocument } from "../src/lib/content/markdown";
import { lessonDocumentSchema } from "../src/lib/lesson/document";

const ROOT = new URL("../content/", import.meta.url);
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const write = process.argv.includes("--write");
const update = process.argv.includes("--update");

type StoredRow = {
  slug: string;
  status: string;
  source: string | null;
  source_hash: string | null;
  title: string;
  summary: string | null;
  kind: string;
  visibility: string;
  content: unknown;
};

/** What the tutor may have changed in a document: its words and who reads it. */
function fingerprint(document: {
  title: string;
  summary: string | null;
  kind: string;
  visibility: string;
  content: unknown;
}): string {
  const { title, summary, kind, visibility, content } = document;
  return createHash("sha256")
    .update(JSON.stringify(canonical({ title, summary, kind, visibility, content })))
    .digest("hex");
}

type Parsed = {
  file: string;
  programme: string;
  chapter: string;
  slug: string;
  meta: ReturnType<typeof parseDocument>["meta"];
  content: { type: "doc"; content: unknown[] };
};

const root = decodeURIComponent(ROOT.pathname).replace(/^\/([A-Za-z]:)/, "$1");
const problems: string[] = [];
const parsed: Parsed[] = [];

for (const path of (await markdownFiles(root)).sort()) {
  const file = relative(root, path).split(sep).join("/");
  // Équerre's corrections of the national exams have their own import (D-103).
  if (file.startsWith("corriges/")) continue;
  const parts = file.replace(/\.md$/, "").split("/");
  if (parts.length !== 3 || !parts.every((part) => SLUG.test(part))) {
    problems.push(`${file} : le chemin doit être programme/chapitre/slug.md, en minuscules`);
    continue;
  }
  const [programme, chapter, slug] = parts as [string, string, string];
  try {
    const { meta, content } = parseDocument(await readFile(path, "utf8"));
    const document = { type: "doc" as const, content };
    const check = lessonDocumentSchema.safeParse(document);
    if (!check.success) {
      problems.push(`${file} : ${check.error.issues.map((issue) => issue.message).join(" ; ")}`);
      continue;
    }
    // Every formula as the site draws it, but refusing what KaTeX would show in red.
    problems.push(...formulaProblems(content).map((problem) => `${file} : ${problem}`));
    parsed.push({ file, programme, chapter, slug, meta, content: document });
  } catch (error) {
    if (!(error instanceof ContentSyntaxError)) throw error;
    problems.push(...error.errors.map((e) => `${file}, ligne ${e.line} : ${e.message}`));
  }
}

const slugs = new Map<string, string>();
for (const document of parsed) {
  const other = slugs.get(document.slug);
  if (other) problems.push(`${document.file} : même nom de fichier que ${other}`);
  slugs.set(document.slug, document.file);
}

const databaseUrl = process.env.SUPABASE_DB_URL;
if (!databaseUrl) {
  console.error("SUPABASE_DB_URL is missing from .env.local.");
  process.exit(1);
}
const sql = connect(databaseUrl);

try {
  const chapters = await sql<{ id: string; programme: string; chapter: string }[]>`
    select c.id, p.slug as programme, c.slug as chapter
    from public.chapters c join public.programmes p on p.code = c.programme_code`;
  const chapterId = new Map(chapters.map((row) => [`${row.programme}/${row.chapter}`, row.id]));
  for (const document of parsed) {
    if (!chapterId.has(`${document.programme}/${document.chapter}`)) {
      problems.push(
        `${document.file} : aucun chapitre « ${document.chapter} » dans le programme « ${document.programme} » (supabase/curriculum/maths.json)`,
      );
    }
  }

  // A document is the file's only when the import made it from that file (`source`), wherever
  // the file now sits (a file moved to another chapter keeps its name, which is the address): an
  // address the tutor used for a document of her own is hers, and the file must take another.
  const existing = await sql<StoredRow[]>`
    select slug, status, source, source_hash, title, summary, kind, visibility, content
    from public.lessons where slug = any(${parsed.map((d) => d.slug)})`;
  const stored = new Map(existing.map((row) => [row.slug, row]));
  for (const row of existing) {
    const document = parsed.find((candidate) => candidate.slug === row.slug)!;
    if (row.source === null || !row.source.endsWith(`/${document.slug}.md`)) {
      problems.push(
        `${document.file} : l’adresse « ${row.slug} » est déjà celle d’un autre document ; renommez le fichier`,
      );
    }
  }

  if (problems.length > 0) {
    console.error(`Rien n’a été importé : ${problems.length} problème(s).\n`);
    for (const problem of problems) console.error(`  ${problem}`);
    process.exitCode = 1;
  } else {
    // A draft is rewritten only while it is still what the import made: once the tutor has
    // corrected it, it is hers, like a published one.
    const plan = parsed.map((document) => {
      const row = stored.get(document.slug);
      const action: "create" | "update" | "keep" | "edited" | "published" = !row
        ? "create"
        : row.status !== "draft"
          ? "published"
          : fingerprint(row) !== row.source_hash
            ? "edited"
            : update
              ? "update"
              : "keep";
      return {
        document,
        action,
        hash: fingerprint({ ...document.meta, content: document.content }),
      };
    });

    if (write) {
      await sql.begin(async (tx) => {
        for (const { document, action, hash } of plan) {
          const id = chapterId.get(`${document.programme}/${document.chapter}`)!;
          if (action === "create") {
            await tx`
              insert into public.lessons
                (chapter_id, title, slug, summary, content, position, status, visibility, kind,
                 source, source_hash)
              values (${id}, ${document.meta.title}, ${document.slug}, ${document.meta.summary},
                ${tx.json(document.content as never)}, ${document.meta.position}, 'draft',
                ${document.meta.visibility}, ${document.meta.kind}, ${document.file}, ${hash})`;
          } else if (action === "update") {
            await tx`
              update public.lessons set
                chapter_id = ${id}, title = ${document.meta.title},
                summary = ${document.meta.summary}, content = ${tx.json(document.content as never)},
                position = ${document.meta.position}, visibility = ${document.meta.visibility},
                kind = ${document.meta.kind}, source = ${document.file}, source_hash = ${hash}
              where slug = ${document.slug} and status = 'draft'`;
          }
        }
      });
    }

    const named = (action: string) =>
      plan.filter((entry) => entry.action === action).map((entry) => entry.document.file);
    const verb = write ? "" : " (à faire)";
    const lines: [string, string[]][] = [
      [`Créés en brouillon${verb}`, named("create")],
      [`Brouillons réécrits${verb}`, named("update")],
      [
        "Brouillons corrigés par la professeure depuis l’import, laissés tels quels",
        named("edited"),
      ],
      ["Publiés, laissés tels quels", named("published")],
    ];
    console.log(`${parsed.length} document(s) lus.`);
    for (const [label, files] of lines) {
      if (files.length === 0) continue;
      console.log(`\n${label} : ${files.length}`);
      for (const file of files) console.log(`  ${file}`);
    }
    const kept = named("keep").length;
    if (kept > 0)
      console.log(`\n${kept} brouillon(s) inchangé(s) depuis l’import : --update les réécrit.`);
    if (!write) console.log("\nRien n’a été écrit : ajoutez --write pour importer.");
  }
} finally {
  await sql.end();
}
