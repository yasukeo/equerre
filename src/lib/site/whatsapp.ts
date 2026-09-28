// The WhatsApp button of the public site (DECISIONS.md, D-090).

/**
 * A Moroccan number as WhatsApp wants it, digits only with the country code: « 06 61 23 45 67 »,
 * « +212 6 61 23 45 67 », « 00212 661 234 567 » and « +212 06 61… » all give 212661234567. Null
 * for anything that is not a Moroccan mobile or landline (nine digits after the country code).
 */
export function whatsappNumber(number: string): string | null {
  let digits = number.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("212")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return /^[5-7]\d{8}$/.test(digits) ? `212${digits}` : null;
}

export function whatsappHref(number: string): string | null {
  const international = whatsappNumber(number);
  return international ? `https://wa.me/${international}` : null;
}
