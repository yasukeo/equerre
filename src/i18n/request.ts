import { getRequestConfig } from "next-intl/server";
import { siteConfig } from "@/config/site";

// v1 ships French only, so the locale is fixed rather than read from the request.
// Adding Arabic means adding `messages/ar.json`, a locale segment and `dir="rtl"`.
export default getRequestConfig(async () => {
  const locale = siteConfig.defaultLocale;

  return {
    locale,
    timeZone: siteConfig.timeZone,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
