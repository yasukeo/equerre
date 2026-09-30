import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

// Search engines read the public site and nothing behind the sign-in (D-089).
export default function robots(): MetadataRoute.Robots {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/prof",
        "/eleve",
        "/parent",
        "/agenda",
        "/recus",
        // A PDF or a print sheet repeats a page that is indexed already.
        "/pdf",
        "/imprimer",
        "/api",
        "/auth",
        "/connexion",
        "/inscription",
        "/mot-de-passe-oublie",
        "/nouveau-mot-de-passe",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
