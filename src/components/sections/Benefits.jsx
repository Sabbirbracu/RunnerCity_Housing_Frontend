import { CheckCircle2, Shield, TrendingUp, Zap } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle2,
    title: "Transparency First",
    description: "Everyone sees exactly where money goes.",
  },
  {
    icon: Zap,
    title: "No More Hassle",
    description: "Payments and salaries, effortless.",
  },
  {
    icon: Shield,
    title: "Smart & Secure",
    description: "AI keeps our housing safe.",
  },
  {
    icon: TrendingUp,
    title: "Scalable & Flexible",
    description: "Built for Runner City, ready to grow.",
  },
];

export const Benefits = () => {
  return (
    <section id="benefits" className="relative py-32 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full filter blur-3xl opacity-40 animate-blob-slow" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-red-100 rounded-full filter blur-3xl opacity-30 animate-blob-slow" />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why We Use RCHMS
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            The benefits that make our community management seamless
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Card Content */}
              <div className="relative z-10 p-6 flex flex-col items-center text-center gap-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl md:text-xl font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-snug text-sm md:text-base">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
