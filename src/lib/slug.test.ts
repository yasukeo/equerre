import { describe, expect, it } from "vitest";
import { slugify } from "./slug";

const CONSTRAINT = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe("slugify", () => {
  it.each([
    ["Théorème des valeurs intermédiaires", "theoreme-des-valeurs-intermediaires"],
    ["Nombres premiers et PGCD", "nombres-premiers-et-pgcd"],
    ["Limite d’une fonction", "limite-d-une-fonction"],
    ["Le cœur du problème", "le-coeur-du-probleme"],
    ["  Dérivée : f′(x) = 2x !  ", "derivee-f-x-2x"],
    ["Chapitre 3 — Suites", "chapitre-3-suites"],
  ])("turns %j into %j", (title, slug) => {
    expect(slugify(title)).toBe(slug);
    expect(slug).toMatch(CONSTRAINT);
  });

  it("returns an empty string when nothing readable is left", () => {
    expect(slugify("∫∑π")).toBe("");
  });

  it("never ends on a dash when it has to cut", () => {
    const slug = slugify("a ".repeat(60), 11);
    expect(slug).toMatch(CONSTRAINT);
    expect(slug.length).toBeLessThanOrEqual(11);
  });
});
