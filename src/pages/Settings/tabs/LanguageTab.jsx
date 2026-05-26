import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "bn", label: "বাংলা", description: "Bengali (Default)" },
  { code: "en", label: "English", description: "English" },
];

const LanguageTab = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    document.documentElement.lang = code;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{t("settings.language.title")}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{t("settings.language.subtitle")}</p>
      </div>

      <div className="space-y-2">
        {languages.map((lang) => {
          const isActive = i18n.language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all text-left ${
                isActive
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div>
                <p className={`text-sm font-semibold ${isActive ? "text-emerald-800" : "text-gray-800"}`}>
                  {lang.label}
                </p>
                <p className="text-xs text-gray-500">{lang.description}</p>
              </div>
              {isActive && <Check className="w-5 h-5 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400">{t("settings.language.note")}</p>
    </div>
  );
};

export default LanguageTab;
