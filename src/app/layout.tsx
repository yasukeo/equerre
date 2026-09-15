import type { Metadata, Viewport } from "next";
import { Readex_Pro } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { publicEnv } from "@/lib/env";
import "./globals.css";

// One family for everything; the HEXP axis carries the two densities (DESIGN.md).
const readex = Readex_Pro({
  subsets: ["latin", "latin-ext"],
  axes: ["HEXP"],
  variable: "--font-readex",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
    title: { default: siteConfig.brand, template: `%s · ${siteConfig.brand}` },
    description: t("description"),
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#141e20" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.defaultLocale} dir="ltr" className={readex.variable}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
