import "server-only";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

// The receipt as a one-page A5 PDF (DECISIONS.md, D-087, D-088). Everything it says arrives
// already written in French; this file only lays it out. The standard Helvetica faces need no
// font file on the server and carry every French letter, « » and the typographic apostrophe;
// a character they cannot draw (Arabic, say) becomes « ? » rather than breaking the receipt.
// Each row has a number of lines it may take, ended by « … », and nothing is drawn below the
// signature, so the longest note and reason still fit the page.

export type ReceiptContent = {
  brand: string;
  tutorLine: string;
  title: string;
  issuedOn: string;
  amount: string;
  amountCaption: string;
  amountInWords: string;
  rows: { label: string; value: string; maxLines?: number }[];
  /** A voided receipt says so first, above the amount, and why. */
  voided: { title: string; detail: string } | null;
  signature: string;
  footer: string;
  /** Document properties: who it is for, and when it was recorded. */
  subject: string;
  createdAt: Date;
};

const A5: [number, number] = [419.53, 595.28];
const MARGIN = 36;
const INK = rgb(0x13 / 255, 0x20 / 255, 0x33 / 255);
const SOFT = rgb(0x4e / 255, 0x5d / 255, 0x73 / 255);
const RULE = rgb(0xd3 / 255, 0xde / 255, 0xea / 255);
const RED = rgb(0xbe / 255, 0x2f / 255, 0x26 / 255);

/** What the font can draw: spaces of every width become one space, the rest a question mark. */
function drawable(font: PDFFont): (text: string) => string {
  const known = new Set(font.getCharacterSet());
  return (text) =>
    [...text.replace(/[    ]/g, " ").replace(/−/g, "-")]
      .map((char) => (known.has(char.codePointAt(0) ?? 0) ? char : "?"))
      .join("");
}

/**
 * Splits a text into lines that fit a width: on its own line breaks first, then on spaces; a
 * word too long is cut. Past `maxLines`, the last line ends with « … ».
 */
function wrap(
  text: string,
  clean: (text: string) => string,
  font: PDFFont,
  size: number,
  width: number,
  maxLines = Infinity,
): string[] {
  const fits = (value: string) => font.widthOfTextAtSize(value, size) <= width;
  const lines: string[] = [];
  for (const paragraph of text.split(/\r?\n/)) {
    let line = "";
    for (const word of clean(paragraph).split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (fits(candidate)) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      let rest = word;
      while (!fits(rest) && rest.length > 1) {
        let cut = rest.length - 1;
        while (cut > 1 && !fits(rest.slice(0, cut))) cut -= 1;
        lines.push(rest.slice(0, cut));
        rest = rest.slice(cut);
      }
      line = rest;
    }
    if (line) lines.push(line);
  }
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  let last = `${kept[maxLines - 1]}…`;
  while (!fits(last) && last.length > 1) last = `${last.slice(0, -2)}…`;
  kept[maxLines - 1] = last;
  return kept;
}

export async function buildReceiptPdf(content: ReceiptContent): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const clean = drawable(regular);

  doc.setTitle(clean(`${content.title} — ${content.brand}`));
  doc.setSubject(clean(content.subject));
  doc.setAuthor(clean(content.tutorLine));
  doc.setCreator(content.brand);
  doc.setProducer(content.brand);
  doc.setLanguage("fr-FR");
  doc.setCreationDate(content.createdAt);
  doc.setModificationDate(content.createdAt);

  const page: PDFPage = doc.addPage(A5);
  const [width, height] = A5;
  const inner = width - MARGIN * 2;
  let y = height - MARGIN;

  const text = (
    value: string,
    options: { x?: number; size: number; font?: PDFFont; color?: typeof INK; right?: boolean },
  ) => {
    const font = options.font ?? regular;
    const clear = clean(value);
    const x = options.right
      ? width - MARGIN - font.widthOfTextAtSize(clear, options.size)
      : (options.x ?? MARGIN);
    page.drawText(clear, { x, y, size: options.size, font, color: options.color ?? INK });
  };
  const rule = (thickness = 0.75, color = RULE) => {
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: width - MARGIN, y },
      thickness,
      color,
    });
  };

  // The foot of the page first: what this document is, and where she signs. Nothing above
  // may come down into it.
  const footer = wrap(content.footer, clean, regular, 8, inner, 3);
  let footerY = MARGIN;
  for (const line of [...footer].reverse()) {
    page.drawText(line, { x: MARGIN, y: footerY, size: 8, font: regular, color: SOFT });
    footerY += 11;
  }
  const signatureY = footerY + 30;
  page.drawLine({
    start: { x: width - MARGIN - 150, y: signatureY },
    end: { x: width - MARGIN, y: signatureY },
    thickness: 0.75,
    color: SOFT,
  });
  page.drawText(clean(content.signature), {
    x: width - MARGIN - 150,
    y: signatureY - 12,
    size: 9,
    font: regular,
    color: SOFT,
  });
  const floor = signatureY + 24;

  // Who issues it, and which receipt it is.
  y -= 16;
  text(content.brand, { size: 16, font: bold });
  text(content.title, { size: 12, font: bold, right: true });
  y -= 14;
  text(content.tutorLine, { size: 9, color: SOFT });
  text(content.issuedOn, { size: 9, color: SOFT, right: true });
  y -= 14;
  rule();

  // A voided receipt says so before anything else.
  if (content.voided) {
    y -= 24;
    text(content.voided.title, { size: 18, font: bold, color: RED });
    for (const line of wrap(content.voided.detail, clean, regular, 10, inner, 3)) {
      y -= 14;
      text(line, { size: 10, color: RED });
    }
    y -= 12;
    rule(1, RED);
  }

  // The amount, the one figure that matters, and in words.
  y -= 36;
  text(content.amount, { size: 26, font: bold, color: content.voided ? SOFT : INK });
  y -= 16;
  text(content.amountCaption, { size: 9, color: SOFT });
  for (const line of wrap(content.amountInWords, clean, regular, 9, inner, 2)) {
    y -= 12;
    text(line, { size: 9, color: SOFT });
  }
  y -= 14;
  rule();

  // What it was for, line by line, for as long as the page has room.
  const labelWidth = 104;
  const valueWidth = inner - labelWidth;
  for (const row of content.rows) {
    const lines = wrap(row.value, clean, regular, 11, valueWidth, row.maxLines ?? 2);
    const needed = 20 + (lines.length - 1) * 14 + 8;
    if (y - needed < floor) break;
    y -= 20;
    text(row.label, { size: 9, color: SOFT });
    lines.forEach((line, index) => {
      if (index > 0) y -= 14;
      text(line, { x: MARGIN + labelWidth, size: 11 });
    });
    y -= 8;
    rule(0.5);
  }

  return doc.save();
}
