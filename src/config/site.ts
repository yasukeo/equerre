export const siteConfig = {
  brand: "Équerre",
  /** The tutor, as she signs her lessons and her corrections (DECISIONS.md, D-004). */
  tutorName: "Keltoum Gharbaoui",
  defaultLocale: "fr",
  locales: ["fr"],
  timeZone: "Africa/Casablanca",
  currency: "MAD",
} as const;

export type Locale = (typeof siteConfig.locales)[number];
