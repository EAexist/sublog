// https://next-intl.dev/docs/routing/setup#i18n-routing

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ko", "jp", "en"],

  // Used when no locale matches
  defaultLocale: "ko",
});
