import type messages from "../../messages/fr.json";
import type errors from "../../messages/fr.errors.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: "fr";
    Messages: typeof messages & typeof errors;
  }
}
