import { describe, expect, it } from "vitest";
import {
  isLessonFileName,
  isLessonImageName,
  isLessonImageUrl,
  isSubmissionPageName,
} from "./storage-paths";

const a = "0f8b8a4e-3c1d-4a9e-9b1f-2d3c4b5a6f70";
const b = "1a2b3c4d-5e6f-4a1b-8c2d-3e4f5a6b7c8d";
const c = "9d8c7b6a-5f4e-4d3c-a2b1-0f9e8d7c6b5a";

describe("isLessonFileName", () => {
  it("accepts the one shape the app writes", () => {
    expect(isLessonFileName(`${a}/${b}.pdf`)).toBe(true);
  });

  it.each([
    // What Next hands the route once it has decoded %2F and %3F inside a segment.
    "../../../../../auth/v1/logout?scope=global",
    `${a}/../../../../auth/v1/logout`,
    `${a}/${b}.pdf?download`,
    `/${a}/${b}.pdf`,
    `${a}//${b}.pdf`,
    `${a}/${b}/${c}.pdf`,
    `${a.toUpperCase()}/${b}.pdf`,
    `${a}/${b}.pdf `,
    `${a}/Séance 1 — corrigé.pdf`,
    `${a}/${b}.html`,
    "",
  ])("refuses %j", (name) => {
    expect(isLessonFileName(name)).toBe(false);
  });
});

describe("lesson images", () => {
  const library = "https://abc.supabase.co/storage/v1/object/public/lesson-assets";

  it.each(["webp", "jpg", "png"])("accepts a .%s image in the library", (ext) => {
    expect(isLessonImageName(`${a}/${b}.${ext}`)).toBe(true);
    expect(isLessonImageUrl(`${library}/${a}/${b}.${ext}`)).toBe(true);
  });

  it.each([
    `${a}/${b}.svg`,
    `${a}/${b}.gif`,
    `${a}/figure.png`,
    `${a}/../${b}.png`,
    `${a}/${b}/${c}.png`,
  ])("refuses the name %j", (name) => {
    expect(isLessonImageName(name)).toBe(false);
    expect(isLessonImageUrl(`${library}/${name}`)).toBe(false);
  });

  it.each([
    `https://x.test/${a}/${b}.png`,
    `https://abc.supabase.co/storage/v1/object/public/submissions/${a}/${b}.png`,
    `https://abc.supabase.co/storage/v1/object/sign/lesson-assets/${a}/${b}.png`,
    `${library}/${a}/${b}.png?token=x`,
    `${library}/${a}/${b}.png#x`,
    `//abc.supabase.co/storage/v1/object/public/lesson-assets/${a}/${b}.png`,
    `javascript://abc.supabase.co/storage/v1/object/public/lesson-assets/${a}/${b}.png`,
  ])("refuses the address %j", (src) => {
    expect(isLessonImageUrl(src)).toBe(false);
  });
});

describe("isSubmissionPageName", () => {
  it.each(["webp", "jpg", "jpeg", "png", "heic", "heif"])("accepts a .%s page", (ext) => {
    expect(isSubmissionPageName(`${a}/${b}/${c}.${ext}`)).toBe(true);
  });

  it.each([
    `${a}/${b}/../../../auth/v1/logout?scope=global`,
    `${a}/../${b}/${c}.webp`,
    `${a}/${b}/${c}.webp?x=1`,
    `${a}/${b}/${c}.svg`,
    `${a}/${b}.webp`,
    `${a}/ref/page-1.webp`,
    `${a}x/${b}/${c}.webp`,
  ])("refuses %j", (name) => {
    expect(isSubmissionPageName(name)).toBe(false);
  });
});
