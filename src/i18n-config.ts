
export const languages = [
  { locale: "en", name: "English" }, 
  { locale: "ja", name: "日本語" }, 
  { locale: "zh", name: "中文" }, 
  { locale: "de", name: "Deutsch" },
  { locale: "es", name: "Español" },
  { locale: "fr", name: "Français" },
  { locale: "ko", name: "한국어" },
]as const;


export const languagesKV = {
  en: "English", 
  ja: "日本語", 
  zh:  "中文", 
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  ko: "한국어",
};

export const i18n = {
    defaultLocale: "en",
    locales: languages.map(({ locale }) => locale),
  }as const;

export type Locale = (typeof i18n)["locales"][number];



import { enUS,frFR,deDE,zhCN,esES,jaJP,koKR } from "@clerk/localizations";

export const localizations = {
  en: enUS, 
  fr: frFR, 
  de: deDE, 
  zh: zhCN,
  es: esES,
  ja: jaJP,
  ko: koKR
}