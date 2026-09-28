import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import {
  amountInWords,
  coverageEnd,
  daysBetween,
  formatDay,
  formatHours,
  formatMad,
  nextDay,
  numberInWords,
  withFirst,
} from "./format";
import { buildReceiptPdf } from "./receipt";

// Money and hours as the tutor reads them, and subscription periods counted the way the
// database counts them (public.record_payment, DECISIONS.md D-087).

const plain = (text: string) => text.replace(/[  ]/g, " ");

describe("formatMad", () => {
  it("writes whole dirhams without centimes, and centimes when there are some", () => {
    expect(plain(formatMad(1500))).toBe("1 500 MAD");
    expect(plain(formatMad(1500.5))).toBe("1 500,50 MAD");
    expect(plain(formatMad(99.999))).toBe("100 MAD");
  });
});

describe("formatHours", () => {
  it("writes hours in French, signed with a true minus", () => {
    expect(plain(formatHours(10))).toBe("10 h");
    expect(plain(formatHours(2.5))).toBe("2,5 h");
    expect(plain(formatHours(-3))).toBe("−3 h");
    expect(plain(formatHours(1.5, { signed: true }))).toBe("+1,5 h");
    expect(plain(formatHours(0, { signed: true }))).toBe("0 h");
    expect(plain(formatHours(-0.001))).toBe("0 h");
  });
});

describe("calendar days", () => {
  it("counts days across months and years", () => {
    expect(daysBetween("2026-09-08", "2026-09-28")).toBe(20);
    expect(daysBetween("2026-12-31", "2027-01-01")).toBe(1);
    expect(nextDay("2026-09-30")).toBe("2026-10-01");
    expect(nextDay("2028-02-28")).toBe("2028-02-29");
  });

  it("ends a subscription the day before the same date, months later", () => {
    expect(coverageEnd("2026-09-01", 1)).toBe("2026-09-30");
    expect(coverageEnd("2026-09-15", 1)).toBe("2026-10-14");
    expect(coverageEnd("2026-09-01", 3)).toBe("2026-11-30");
    expect(coverageEnd("2026-11-01", 12)).toBe("2027-10-31");
  });

  it("ends on a short month's last day, as Postgres adds months", () => {
    // date '2027-01-31' + interval '1 month' is 2027-02-28; the period ends the day before.
    expect(coverageEnd("2027-01-31", 1)).toBe("2027-02-27");
    expect(coverageEnd("2028-01-31", 1)).toBe("2028-02-28");
    expect(coverageEnd("2026-12-31", 2)).toBe("2027-02-27");
  });
});

describe("dates in words", () => {
  it("writes the first of the month « 1er », and only the first", () => {
    expect(plain(formatDay("2026-10-01"))).toBe("1er octobre 2026");
    expect(plain(formatDay("2026-10-11"))).toBe("11 octobre 2026");
    expect(plain(formatDay("2026-10-21"))).toBe("21 octobre 2026");
    expect(plain(formatDay("2026-09-01", "d MMM yyyy"))).toBe("1er sept. 2026");
    expect(plain(formatDay("2026-09-11", "d MMM yyyy"))).toBe("11 sept. 2026");
    expect(plain(withFirst("du 1 septembre au 30 septembre, mardi 1 décembre"))).toBe(
      "du 1er septembre au 30 septembre, mardi 1er décembre",
    );
  });
});

describe("amounts in words", () => {
  it("writes numbers as a French receipt does", () => {
    expect(numberInWords(0)).toBe("zéro");
    expect(numberInWords(21)).toBe("vingt et un");
    expect(numberInWords(71)).toBe("soixante et onze");
    expect(numberInWords(80)).toBe("quatre-vingts");
    expect(numberInWords(81)).toBe("quatre-vingt-un");
    expect(numberInWords(97)).toBe("quatre-vingt-dix-sept");
    expect(numberInWords(200)).toBe("deux cents");
    expect(numberInWords(250)).toBe("deux cent cinquante");
    expect(numberInWords(1000)).toBe("mille");
    expect(numberInWords(1500)).toBe("mille cinq cents");
    expect(numberInWords(80_000)).toBe("quatre-vingt mille");
    expect(numberInWords(200_000)).toBe("deux cent mille");
    expect(numberInWords(2_300_000)).toBe("deux millions trois cent mille");
  });

  it("names dirhams and centimes", () => {
    expect(amountInWords(1)).toBe("un dirham");
    expect(amountInWords(1500)).toBe("mille cinq cents dirhams");
    expect(amountInWords(1500.5)).toBe("mille cinq cents dirhams et cinquante centimes");
    expect(amountInWords(0.01)).toBe("zéro dirhams et un centime");
    expect(amountInWords(1_000_000)).toBe("un million de dirhams");
  });
});

describe("buildReceiptPdf", () => {
  const content = {
    brand: "Équerre",
    tutorLine: "Keltoum Gharbaoui · Cours de mathématiques",
    title: "Reçu n° 2026-0007",
    issuedOn: "Établi le 28 septembre 2026",
    amount: formatMad(1500),
    amountCaption: "Montant reçu",
    amountInWords: "Arrêté à la somme de mille cinq cents dirhams.",
    signature: "Signature",
    rows: [
      { label: "Élève", value: "Salma Alaoui" },
      { label: "Objet", value: "Pack 10 heures" },
      { label: "Objet long", value: "Séance de rattrapage ".repeat(6) },
      { label: "Période", value: "du 1er septembre 2026 au 30 novembre 2026, pour toutes" },
      { label: "Mode", value: "Chèque" },
      { label: "Payé le", value: "28 septembre 2026" },
      {
        label: "Note",
        value: `Chèque n° 123
${"— « MERCI » ; سلمى ".repeat(20)}`,
        maxLines: 3,
      },
    ],
    voided: {
      title: "ANNULÉ",
      detail: `Ce reçu a été annulé le 29 septembre 2026. Motif : ${"SAISI DEUX FOIS ".repeat(20)}`,
    },
    footer: "Ce reçu atteste la somme reçue.",
    subject: "Paiement de Salma Alaoui",
    createdAt: new Date("2026-09-28T10:00:00Z"),
  };

  it("lays out one A5 page, even with long text and letters Helvetica cannot draw", async () => {
    const bytes = await buildReceiptPdf(content);
    expect(new TextDecoder().decode(bytes.slice(0, 5))).toBe("%PDF-");
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(1);
    const { width, height } = doc.getPage(0).getSize();
    expect([Math.round(width), Math.round(height)]).toEqual([420, 595]);
    expect(doc.getTitle()).toBe("Reçu n° 2026-0007 — Équerre");
  });

  it("is the same file for the same payment", async () => {
    const [first, second] = await Promise.all([buildReceiptPdf(content), buildReceiptPdf(content)]);
    expect(first.length).toBe(second.length);
  });
});
