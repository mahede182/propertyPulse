import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { frTranslations } from "./FR/fr";
import { enTranslations } from "./EN/en";

export const defaultNS = "en";
export const resources = {
  en: {
    translation: enTranslations,
  },
  fr: {
    translation: frTranslations,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: defaultNS,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v3",
});

export default i18n;