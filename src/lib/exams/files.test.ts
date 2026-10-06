import { describe, expect, it } from "vitest";
import { examFileName, examPaperSlug } from "./files";

describe("examPaperSlug", () => {
  it("names a paper by its year and session", () => {
    expect(examPaperSlug({ year: 2021, session: "normale", track: null })).toBe("2021-normale");
    expect(examPaperSlug({ year: 2014, session: "rattrapage", track: null })).toBe(
      "2014-rattrapage",
    );
  });

  it("adds the streams that sat it, without accents or punctuation", () => {
    expect(
      examPaperSlug({ year: 2019, session: "normale", track: "PC, SVT et Sciences agronomiques" }),
    ).toBe("2019-normale-pc-svt-et-sciences-agronomiques");
    expect(examPaperSlug({ year: 2017, session: "rattrapage", track: "STE et STM" })).toBe(
      "2017-rattrapage-ste-et-stm",
    );
  });
});

describe("examFileName", () => {
  it("names Équerre's correction apart from the ministry's files", () => {
    expect(
      examFileName(
        "2bac-economie",
        { year: 2010, session: "normale", track: null, language: "ar" },
        "corrige-equerre",
      ),
    ).toBe("examen-2010-normale-2bac-economie-corrige-equerre-arabe.pdf");
  });
});
