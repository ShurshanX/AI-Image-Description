
export const languages = [
  { locale: "en", name: "English" }
]as const;


export const languagesKV = {
  en: "English"
};

export const i18n = {
    defaultLocale: "en",
    locales: languages.map(({ locale }) => locale),
  }as const;

export type Locale = (typeof i18n)["locales"][number];



import { enUS} from "@clerk/localizations";

export const localizations = {
  en: enUS
}