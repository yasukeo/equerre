import { getRequestConfig } from "next-intl/server";
import { siteConfig } from "@/config/site";

// v1 ships French only, so the locale is fixed rather than read from the request.
// Adding Arabic means adding `messages/ar.json` and `messages/ar.errors.json`, a locale
// segment and `dir="rtl"`.
//
// The error screens' strings live in their own small file: the root error boundary replaces
// the layout, so it reads its strings without the provider, and importing all of fr.json there
// would ship the whole dictionary with every page (D-092).
export default getRequestConfig(async () => {
  const locale = siteConfig.defaultLocale;
  const [messages, errors] = await Promise.all([
    import(`../../messages/${locale}.json`),
    import(`../../messages/${locale}.errors.json`),
  ]);

  return {
    locale,
    timeZone: siteConfig.timeZone,
    messages: { ...messages.default, ...errors.default },
  };
});
