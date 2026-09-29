import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import dictionary from "../../messages/fr.json";
import errors from "../../messages/fr.errors.json";
import { CLIENT_NAMESPACES, isCovered, pickMessages, type ClientArea } from "./client-namespaces";

// A client component that asks for a namespace its part of the app does not hand over would
// show raw keys. This reads every client component and checks its namespaces are listed.

const SRC = join(__dirname, "..");
// What the request config hands next-intl: the dictionary and the error screens' file.
const messages = { ...dictionary, ...errors };
const ALL: ClientArea[] = ["base", "auth", "tutor", "student"];

/** Which parts of the app a client file renders in, from where it lives. */
const AREAS: [prefix: string, areas: ClientArea[]][] = [
  ["app/prof/", ["tutor"]],
  ["app/eleve/", ["student"]],
  ["app/parent/", ["base"]],
  ["app/(auth)/", ["auth"]],
  ["app/(site)/", ["base"]],
  ["app/cours/", ["base"]],
  ["app/error.tsx", ["base"]],
  ["components/chat/", ["tutor", "student"]],
  ["components/notifications/", ["tutor", "student"]],
  ["components/editor/", ["tutor"]],
  ["components/error-view.tsx", ALL],
  ["components/shell/", ALL],
  ["components/ui/", ALL],
];

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return files(path);
    return /\.tsx?$/.test(entry.name) && !entry.name.includes(".test.") ? [path] : [];
  });
}

const clientFiles = files(SRC)
  .map((path) => ({
    path: relative(SRC, path).split(sep).join("/"),
    source: readFileSync(path, "utf8"),
  }))
  .filter(({ source }) => /^["']use client["']/m.test(source))
  .map(({ path, source }) => ({
    path,
    namespaces: [...source.matchAll(/useTranslations\(([^)]*)\)/g)].map((match) => match[1]!),
  }))
  .filter(({ namespaces }) => namespaces.length > 0);

function exists(path: string): boolean {
  let node: unknown = messages;
  for (const key of path.split(".")) {
    if (typeof node !== "object" || node === null || !(key in node)) return false;
    node = (node as Record<string, unknown>)[key];
  }
  return true;
}

describe("client messages", () => {
  it("finds the client components", () => {
    expect(clientFiles.length).toBeGreaterThan(30);
  });

  it.each(clientFiles)("hands $path the namespaces it asks for", ({ path, namespaces }) => {
    const areas = AREAS.find(([prefix]) => path.startsWith(prefix))?.[1];
    // A new place for client components: say which parts of the app it renders in.
    expect(areas, `${path} is in no area of AREAS`).toBeDefined();
    for (const raw of namespaces) {
      // A namespace built at run time cannot be checked: name it as a literal.
      expect(raw, `${path}: useTranslations(${raw})`).toMatch(/^"[\w.]+"$/);
      const namespace = raw.slice(1, -1);
      expect(exists(namespace), `${namespace} is not in fr.json`).toBe(true);
      for (const area of areas!) {
        expect(
          isCovered(namespace, CLIENT_NAMESPACES[area]),
          `${path} needs ${namespace} in CLIENT_NAMESPACES.${area}`,
        ).toBe(true);
      }
    }
  });

  it.each(Object.entries(CLIENT_NAMESPACES))(
    "lists only namespaces that exist, none inside another (%s)",
    (_area, listed) => {
      for (const path of listed) {
        expect(exists(path), `${path} is not in fr.json`).toBe(true);
        const others = listed.filter((other) => other !== path);
        expect(isCovered(path, others), `${path} is already inside another`).toBe(false);
      }
    },
  );

  it("picks the listed namespaces, at their place, and nothing else", () => {
    const picked = pickMessages({ a: { b: { c: "1" }, d: "2" }, e: "3" }, ["a.b", "e"]);
    expect(picked).toEqual({ a: { b: { c: "1" } }, e: "3" });
  });

  it("sends the public pages a small part of the dictionary", () => {
    const whole = JSON.stringify(messages).length;
    const base = JSON.stringify(pickMessages(messages, CLIENT_NAMESPACES.base)).length;
    expect(base).toBeLessThan(whole / 20);
  });
});
