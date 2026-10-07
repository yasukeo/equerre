// French typography for text typed by hand (DECISIONS.md, D-089): the space before « : ; ! ? »
// and « % », and inside « », becomes non-breaking, so no line of a title starts with a colon.

export function frenchSpaces(text: string): string {
  return text.replace(/ +([:;!?»%])/g, " $1").replace(/« +/g, "« ");
}

type Messages = { [key: string]: unknown };

/** The same through a whole dictionary: every message the interface shows (D-104). */
export function frenchSpacesDeep<Tree extends Messages>(tree: Tree): Tree {
  return Object.fromEntries(
    Object.entries(tree).map(([key, value]) => [
      key,
      typeof value === "string"
        ? frenchSpaces(value)
        : value && typeof value === "object"
          ? frenchSpacesDeep(value as Messages)
          : value,
    ]),
  ) as Tree;
}
