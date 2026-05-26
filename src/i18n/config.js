import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bn from "./locales/bn.json";
import en from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    bn: { translation: bn },
    en: { translation: en },
  },
  lng: localStorage.getItem("lang") || "bn", // Persist user's choice
  fallbackLng: "bn",
  interpolation: {
    escapeValue: false,
  },
});

// Set html lang attribute on init and on language change
document.documentElement.lang = i18n.language;
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("lang", lng);
});

export default i18n;
