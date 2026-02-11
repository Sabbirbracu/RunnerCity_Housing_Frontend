import { useTranslation } from "react-i18next";
import DemoMockup from "../../assets/demo.png";

export const DemoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t('demo.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('demo.subtitle')}
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-6xl mx-auto relative group">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/30 via-teal-400/20 to-cyan-400/30 opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500" />

          {/* Dashboard Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <img
              src={DemoMockup}
              alt="RCHMS Dashboard Interface"
              className="w-full h-auto"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </div>

          {/* Floating feature badges */}
          <div className="absolute -bottom-6 left-6 right-6 flex flex-wrap gap-3 justify-center">
            <div className="px-4 py-2 bg-white border border-gray-200 rounded-full shadow-md text-sm font-semibold text-gray-700">
              {t('demo.badge1')}
            </div>
            <div className="px-4 py-2 bg-white border border-gray-200 rounded-full shadow-md text-sm font-semibold text-gray-700">
              {t('demo.badge2')}
            </div>
            <div className="px-4 py-2 bg-white border border-gray-200 rounded-full shadow-md text-sm font-semibold text-gray-700">
              {t('demo.badge3')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
