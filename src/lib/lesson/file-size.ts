import { siteConfig } from "@/config/site";

/** « 2,3 Mo », « 850 Ko »: how an attachment's size reads beside its name. */
export function formatFileSize(bytes: number): string {
  const show = (value: number, digits: number) =>
    new Intl.NumberFormat(siteConfig.defaultLocale, { maximumFractionDigits: digits }).format(
      value,
    );
  const megabytes = bytes / 1_048_576;
  return megabytes >= 1 ? `${show(megabytes, 1)} Mo` : `${show(Math.max(1, bytes / 1024), 0)} Ko`;
}
