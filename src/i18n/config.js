import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bn from "./locales/bn.json";
import en from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    bn: { translation: bn },
    en: { translation: en },
  },
  lng: "bn", // Default language is Bangla
  fallbackLng: "bn", // Fallback to Bangla if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
