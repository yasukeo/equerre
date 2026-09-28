import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { getViewer } from "@/lib/auth";
import {
  amountInWords,
  formatDate,
  formatDay,
  formatHours,
  formatMad,
} from "@/lib/payments/format";
import { getPayment } from "@/lib/payments/queries";
import { buildReceiptPdf } from "@/lib/payments/receipt";

/**
 * One payment's receipt as a PDF, for whoever may read the payment (D-087): the tutor, or the
 * student it is for. The row is read with the cookie-bound client, so the payments policy
 * decides: someone else's receipt is not found. It opens in the browser's viewer, which on a
 * phone is where a parent looks for it; saving it is one tap from there.
 */
export async function GET(_request: Request, context: RouteContext<"/recus/[id]">) {
  const viewer = await getViewer();
  if (!viewer) redirect("/connexion");
  const { id } = await context.params;
  if (!z.uuid().safeParse(id).success) notFound();

  const payment = await getPayment(id);
  if (!payment) notFound();
  const [t, tMethod, tScope] = await Promise.all([
    getTranslations("payments.pdf"),
    getTranslations("payments.method"),
    getTranslations("payments.scope"),
  ]);
  const voided = payment.voidedAt !== null;

  const pdf = await buildReceiptPdf({
    brand: siteConfig.brand,
    tutorLine: t("tutorLine", { tutor: siteConfig.tutorName }),
    title: voided
      ? t("titleVoided", { number: payment.receiptNumber })
      : t("title", { number: payment.receiptNumber }),
    issuedOn: t("issuedOn", { date: formatDate(payment.createdAt) }),
    amount: formatMad(payment.amountMad),
    amountCaption: voided ? t("amountCaptionVoided") : t("amountCaption"),
    amountInWords: t("inWords", { words: amountInWords(payment.amountMad) }),
    rows: [
      payment.guardianName
        ? {
            label: t("payer"),
            value: t("payerValue", { name: payment.guardianName, student: payment.studentName }),
          }
        : { label: t("student"), value: payment.studentName },
      { label: t("item"), value: payment.label },
      ...(payment.hoursCredited > 0
        ? [{ label: t("hours"), value: formatHours(payment.hoursCredited) }]
        : []),
      ...(payment.coversFrom && payment.coversTo && payment.coversScope
        ? [
            {
              label: t("period"),
              value: t("periodValue", {
                from: formatDay(payment.coversFrom),
                to: formatDay(payment.coversTo),
                scope: tScope(payment.coversScope),
              }),
            },
          ]
        : []),
      { label: t("method"), value: tMethod(payment.method) },
      { label: t("paidOn"), value: formatDay(payment.paidOn) },
      ...(payment.note ? [{ label: t("note"), value: payment.note, maxLines: 3 }] : []),
    ],
    voided: voided
      ? {
          title: t("voidedTitle"),
          detail: t("voidedDetail", {
            date: formatDate(payment.voidedAt!),
            reason: payment.voidReason ?? "",
          }),
        }
      : null,
    signature: t("signature"),
    footer: t("footer", { tutor: siteConfig.tutorName, brand: siteConfig.brand }),
    subject: t("subject", { student: payment.studentName }),
    createdAt: new Date(payment.createdAt),
  });

  return new Response(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="recu-${payment.receiptNumber}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
