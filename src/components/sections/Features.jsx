import {
  Calendar,
  CreditCard,
  DollarSign,
  Eye,
  Heart,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Online Fee Payments",
    description: "Pay instantly via SSLCommerz, bKash, Nagad. Receipts in real-time.",
  },
  {
    icon: DollarSign,
    title: "Payroll Made Simple",
    description: "Salaries for Imams, guards, and cleaners — digital, timely, easy.",
  },
  {
    icon: Eye,
    title: "Transparent Finances",
    description: "Real-time tracking for all residents. Trust everyone can see.",
  },
  {
    icon: Calendar,
    title: "Manage Events & Contributions",
    description: "Ramadan, Eid, charity drives, all tracked online.",
  },
  {
    icon: Heart,
    title: "Blood Donation & Campaigns",
    description: "Community health and charity at your fingertips.",
  },
  {
    icon: Shield,
    title: "AI-Powered Security",
    description: "Smart monitoring, alerts, predictive CCTV maintenance.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="relative py-32 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      
      {/* Floating Background Mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-100 rounded-full filter blur-3xl opacity-40 animate-blob-slow" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-100 rounded-full filter blur-3xl opacity-30 animate-blob-slow" />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Core Features
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Everything you need to manage your community efficiently and transparently
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Hover Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Card Content */}
              <div className="relative z-10 p-8 flex flex-col items-center gap-6 text-center">
                {/* Icon Container */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
