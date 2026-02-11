import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      quoteKey: "testimonials.items.testimonial1.quote",
      authorKey: "testimonials.items.testimonial1.author",
      roleKey: "testimonials.items.testimonial1.role",
    },
    {
      quoteKey: "testimonials.items.testimonial2.quote",
      authorKey: "testimonials.items.testimonial2.author",
      roleKey: "testimonials.items.testimonial2.role",
    },
    {
      quoteKey: "testimonials.items.testimonial3.quote",
      authorKey: "testimonials.items.testimonial3.author",
      roleKey: "testimonials.items.testimonial3.role",
    },
  ];
  return (
    <section id="testimonials" className="relative py-32 px-4 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 overflow-hidden">
      
      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-3xl border border-gray-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center transition-colors">
                <Quote className="w-7 h-7 text-emerald-500 opacity-60" />
              </div>

              {/* Quote */}
              <div className="pt-8">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                  "{t(testimonial.quoteKey)}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 mt-6 border-t border-gray-200">
                <p className="font-bold text-gray-900 text-lg">{t(testimonial.authorKey)}</p>
                <p className="text-sm text-gray-500 mt-1">{t(testimonial.roleKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
