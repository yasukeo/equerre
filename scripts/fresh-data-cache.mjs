// Runs before `next build` (DECISIONS.md, D-089). The public pages are prerendered from
// "use cache" reads of the database, and Next keeps their results in .next/cache/fetch-cache
// from one build to the next; Vercel restores that folder too. A post published or a plan
// changed since the last build would then be prerendered as it was. The build reads the
// database afresh instead: the folder holds data, not compiled code, so nothing else slows.
import { rmSync } from "node:fs";

rmSync(new URL("../.next/cache/fetch-cache", import.meta.url), { recursive: true, force: true });
