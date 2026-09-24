// Deletes lesson images and PDFs that no lesson or exercise refers to any more (DECISIONS.md,
// D-054). Run by hand:
//
//   pnpm storage:sweep            lists what would be deleted, and deletes nothing
//   pnpm storage:sweep --delete   deletes it
//
// It needs SUPABASE_SECRET_KEY: drafts and exercises are invisible to anyone but the tutor, and
// a reference the sweep cannot read is an object it would delete. Deleting goes through the
// Storage API, never through SQL on storage.objects, which would leave the bytes behind.
//
// The buckets are listed before the documents are read. An object uploaded after the listing
// is not considered at all, and a save made before the reading is seen.

import { createClient } from "@supabase/supabase-js";
import {
  collectReferences,
  emptyReferences,
  imageObjectName,
  isDeletion,
  planSweep,
  SWEEP_SAFETY_WINDOW_MS,
  SWEPT_BUCKETS,
  type StoredObject,
  type SweptBucket,
  type Verdict,
} from "../src/lib/storage-sweep";
import type { Database } from "../src/types/database";

const flags = process.argv.slice(2);
const unknown = flags.filter((flag) => flag !== "--delete");
if (unknown.length > 0) {
  console.error(`Unknown option ${unknown.join(" ")}. The only option is --delete.`);
  process.exit(1);
}
const deleting = flags.includes("--delete");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
if (!url || !secretKey?.startsWith("sb_secret_")) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY (sb_secret_…) must be set in .env.local." +
      "\nThe publishable key would not see drafts, and the sweep would delete their files.",
  );
  process.exit(1);
}

const supabase = createClient<Database>(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const PAGE = 1000;

/** Every object in a bucket, with its full name, walking folders one level at a time. */
async function listBucket(bucket: SweptBucket): Promise<StoredObject[]> {
  const objects = new Map<string, StoredObject>();
  const folders = [""];
  for (let prefix = folders.pop(); prefix !== undefined; prefix = folders.pop()) {
    for (let offset = 0; ; offset += PAGE) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(prefix, { limit: PAGE, offset, sortBy: { column: "name", order: "asc" } });
      if (error) throw new Error(`Could not list ${bucket}/${prefix}: ${error.message}`);

      for (const entry of data) {
        const name = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
        if (entry.id === null) {
          folders.push(name);
        } else {
          const size = entry.metadata?.size;
          objects.set(name, {
            bucket,
            name,
            createdAt: entry.created_at,
            size: typeof size === "number" ? size : null,
          });
        }
      }
      if (data.length < PAGE) break;
    }
  }
  return [...objects.values()];
}

/**
 * Every row of a table, a page at a time, keyed on the primary key rather than an offset: a row
 * deleted while the pages are read cannot make the next page skip one, and a skipped row is a
 * set of references the sweep would not see.
 */
async function readAll<Row>(
  table: string,
  page: (
    after: string | null,
  ) => PromiseLike<{ data: Row[] | null; error: { message: string } | null }>,
  keyOf: (row: Row) => string,
): Promise<Row[]> {
  const rows: Row[] = [];
  let after: string | null = null;
  for (;;) {
    const { data, error } = await page(after);
    if (error || !data) throw new Error(`Could not read ${table}: ${error?.message ?? "no data"}`);
    rows.push(...data);
    const last = data.at(-1);
    if (data.length < PAGE || last === undefined) return rows;
    after = keyOf(last);
  }
}

const objects = (await Promise.all(SWEPT_BUCKETS.map(listBucket))).flat();

// No filter on status or visibility: a draft's files are as much in use as a published lesson's.
const [lessons, exercises, solutions] = await Promise.all([
  readAll(
    "lessons",
    (last) => {
      let query = supabase.from("lessons").select("id, content, updated_at");
      if (last !== null) query = query.gt("id", last);
      return query.order("id").limit(PAGE);
    },
    (row) => row.id,
  ),
  readAll(
    "exercises",
    (last) => {
      let query = supabase.from("exercises").select("id, statement, figure_path, updated_at");
      if (last !== null) query = query.gt("id", last);
      return query.order("id").limit(PAGE);
    },
    (row) => row.id,
  ),
  readAll(
    "exercise_solutions",
    (last) => {
      let query = supabase.from("exercise_solutions").select("exercise_id, solution, updated_at");
      if (last !== null) query = query.gt("exercise_id", last);
      return query.order("exercise_id").limit(PAGE);
    },
    (row) => row.exercise_id,
  ),
]);

const references = emptyReferences();
const owners = new Map<string, string>();
const saved = (id: string, at: string) => {
  const known = owners.get(id);
  if (known === undefined || Date.parse(at) > Date.parse(known)) owners.set(id, at);
};

for (const lesson of lessons) {
  collectReferences(lesson.content, references);
  saved(lesson.id, lesson.updated_at);
}
for (const exercise of exercises) {
  collectReferences(exercise.statement, references);
  // Unused so far; if it ever holds a figure, the figure is kept.
  if (exercise.figure_path) {
    references.images.add(imageObjectName(exercise.figure_path) ?? exercise.figure_path);
  }
  saved(exercise.id, exercise.updated_at);
}
for (const solution of solutions) {
  collectReferences(solution.solution, references);
  saved(solution.exercise_id, solution.updated_at);
}

if (owners.size === 0 && objects.length > 0) {
  console.error(
    `Read ${objects.length} objects but no lesson and no exercise: refusing to call every one an orphan.`,
  );
  process.exit(1);
}

const now = new Date();
const plan = planSweep({ objects, references, owners, now });
const doomed = plan.filter((object) => isDeletion(object.verdict));

const days = (from: string | null) =>
  from === null ? "?" : `${Math.floor((now.getTime() - Date.parse(from)) / 86_400_000)} d`;
const kilobytes = (size: number | null) => (size === null ? "?" : `${Math.ceil(size / 1024)} KB`);

console.log(
  `Read ${lessons.length} lessons, ${exercises.length} exercises and ${solutions.length} solutions;` +
    ` listed ${objects.length} objects. Window: ${SWEEP_SAFETY_WINDOW_MS / 86_400_000} days.\n`,
);

const counts = new Map<Verdict, number>();
for (const { verdict } of plan) counts.set(verdict, (counts.get(verdict) ?? 0) + 1);
for (const [verdict, count] of [...counts].sort(([a], [b]) => a.localeCompare(b))) {
  console.log(`  ${isDeletion(verdict) ? "delete" : "keep  "}  ${verdict.padEnd(22)} ${count}`);
}

const unexpected = plan.filter((object) => object.verdict === "unexpected-name");
if (unexpected.length > 0) {
  console.log("\nLeft alone, not a name the app writes:");
  for (const object of unexpected) console.log(`  ${object.bucket}/${object.name}`);
}

if (doomed.length === 0) {
  console.log("\nNothing to delete.");
  process.exit(0);
}

const total = doomed.reduce((sum, object) => sum + (object.size ?? 0), 0);
console.log(
  `\n${deleting ? "Deleting" : "Would delete"} ${doomed.length} objects (${kilobytes(total)}):`,
);
for (const object of doomed) {
  console.log(
    `  ${`${object.bucket}/${object.name}`.padEnd(93)} ${kilobytes(object.size).padStart(9)}` +
      `  ${days(object.createdAt).padStart(6)}  ${object.verdict}`,
  );
}

if (!deleting) {
  console.log("\nDry run: nothing was deleted. Run again with --delete to delete these objects.");
  process.exit(0);
}

let deleted = 0;
for (const bucket of SWEPT_BUCKETS) {
  const names = doomed.filter((object) => object.bucket === bucket).map((object) => object.name);
  for (let start = 0; start < names.length; start += 100) {
    const batch = names.slice(start, start + 100);
    const { data, error } = await supabase.storage.from(bucket).remove(batch);
    if (error) {
      console.error(
        `\nStopped: ${bucket} refused a batch: ${error.message}. ${deleted} deleted so far.`,
      );
      process.exit(1);
    }
    deleted += data.length;
  }
}
console.log(`\nDeleted ${deleted} of ${doomed.length} objects.`);
