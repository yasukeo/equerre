export const siteConfig = {
  brand: "Équerre",
  /** Placeholder until the tutor's real name is provided (DECISIONS.md, D-004). */
  tutorName: "Prénom Nom",
  defaultLocale: "fr",
  locales: ["fr"],
  timeZone: "Africa/Casablanca",
  currency: "MAD",
} as const;

export type Locale = (typeof siteConfig.locales)[number];
