import { LocalePrefix } from "next-intl/routing";

const localePrefix: LocalePrefix<[], "as-needed"> = "as-needed";

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
    defaultLocale: "ko",
    serviceName: "Sublog",
    websiteUrl: "https://sublog-app.vercel.app",
    operatorName: "SobaLab",
    operatorLocation: "Republic of Korea",
    contactEmail: "sobalab.labs@gmail.com",
    locales: [
        { id: "ko", name: "한국어" },
        { id: "jp", name: "日本語" },
        {
            id: "en",
            name: "English",
        },
    ],
};

export const AllLocales = AppConfig.locales.map((locale) => locale.id);
