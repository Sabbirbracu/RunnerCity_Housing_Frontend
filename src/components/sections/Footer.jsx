import { Building2, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-100 py-16 px-4 border-t border-gray-700">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold">{t('footer.brand')}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-500">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {t('footer.features')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-500">{t('footer.resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {t('footer.documentation')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {t('footer.support')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {t('footer.faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-500">{t('footer.contactUs')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 mt-1 text-emerald-500 flex-shrink-0" />
                <p className="text-gray-400">
                  {t('footer.address')}
                  <br />
                  {t('footer.city')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a
                  href="mailto:info@runnercityhousing.com"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  info@runnercityhousing.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
<div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-center items-center gap-2">
  <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
  <span className="hidden md:inline">|</span>
  <p>
    {t('footer.developedBy')}{" "}
    <a 
      href="https://sabbirahmad.qullia.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-accent hover:underline font-bold hover:text-white transition-colors"
    >
      Sabbir Ahmad
    </a>
  </p>
</div>

      </div>
    </footer>
  );
};
