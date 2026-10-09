import { isValidElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { renderChatPreview } from "./text";

/** The parts of a preview: text as it is, a formula as « [math] ». */
function parts(node: ReactNode): string[] {
  return (node as ReactNode[]).map((part) => (isValidElement(part) ? "[math]" : String(part)));
}

describe("renderChatPreview", () => {
  it("keeps a short message whole, its formula rendered", () => {
    expect(parts(renderChatPreview("Oui, avec $q^n$ pour |q| < 1."))).toEqual([
      "Oui, avec ",
      "[math]",
      " pour |q| < 1.",
    ]);
  });

  it("cuts a long text and says so", () => {
    const preview = parts(renderChatPreview("a".repeat(500), { maxLength: 20 }));
    expect(preview).toEqual([`${"a".repeat(20)}…`]);
  });

  it("renders a few formulas at most, never a long run of them", () => {
    const source = Array.from({ length: 1000 }, (_, index) => `$x_${index}$`).join(" ");
    const preview = parts(renderChatPreview(source, { maxFormulas: 4 }));
    expect(preview.filter((part) => part === "[math]")).toHaveLength(4);
    expect(preview.at(-1)).toBe("…");
  });

  it("folds new lines into the one line the inbox shows", () => {
    expect(parts(renderChatPreview("Bonjour\n\nMadame"))).toEqual(["Bonjour Madame"]);
  });
});
