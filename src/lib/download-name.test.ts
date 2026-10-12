import { describe, expect, it } from "vitest";
import { pdfFileName, withDownloadName } from "./download-name";

describe("pdfFileName", () => {
  it.each([
    ["Série 1 — suites numériques", "Série 1 — suites numériques.pdf"],
    ["Examen blanc n°1 : analyse", "Examen blanc n°1 analyse.pdf"],
    ['Fiche "3" / corrigé?', "Fiche 3 corrigé.pdf"],
    ["  ligne\nsuivante\t", "ligne suivante.pdf"],
  ])("turns %j into %j", (name, file) => {
    expect(pdfFileName(name, "document")).toBe(file);
  });

  it("falls back when nothing usable is left", () => {
    expect(pdfFileName(null, "sujet")).toBe("sujet.pdf");
    expect(pdfFileName(" :/\\ ", "document")).toBe("document.pdf");
  });

  it("keeps the name short", () => {
    expect(pdfFileName("a".repeat(300), "document")).toHaveLength(124);
  });
});

describe("withDownloadName", () => {
  const signed = "https://x.supabase.co/storage/v1/object/sign/b/f.pdf?token=abc";

  it("encodes the name exactly once", () => {
    const url = new URL(withDownloadName(signed, "Série 1 — suites.pdf"));
    expect(url.searchParams.get("download")).toBe("Série 1 — suites.pdf");
    expect(url.searchParams.get("token")).toBe("abc");
  });

  it("keeps characters that would end the parameter inside it", () => {
    const url = new URL(withDownloadName(signed, "a&b=c #1.pdf"));
    expect(url.searchParams.get("download")).toBe("a&b=c #1.pdf");
  });
});
