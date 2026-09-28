// French typography for text typed by hand (DECISIONS.md, D-089): the space before « : ; ! ? »
// and inside « » becomes non-breaking, so no line of a title starts with a colon.

export function frenchSpaces(text: string): string {
  return text.replace(/ +([:;!?»])/g, " $1").replace(/« +/g, "« ");
}
