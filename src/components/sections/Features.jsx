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

// 'use client'; 

// import {
//   Calendar,
//   CreditCard,
//   DollarSign,
//   Eye,
//   Heart,
//   Shield,
// } from "lucide-react";
// import { useRef } from "react";

// const features = [
//     // ... (feature data remains the same)
//   {
//     icon: CreditCard,
//     title: "Online Fee Payments",
//     description: "Pay instantly via SSLCommerz, bKash, Nagad. Receipts in real-time.",
//   },
//   {
//     icon: DollarSign,
//     title: "Payroll Made Simple",
//     description: "Salaries for Imams, guards, and cleaners — digital, timely, easy.",
//   },
//   {
//     icon: Eye,
//     title: "Transparent Finances",
//     description: "Real-time tracking for all residents. Trust everyone can see.",
//   },
//   {
//     icon: Calendar,
//     title: "Manage Events & Contributions",
//     description: "Ramadan, Eid, charity drives, all tracked online.",
//   },
//   {
//     icon: Heart,
//     title: "Blood Donation & Campaigns",
//     description: "Community health and charity at your fingertips.",
//   },
//   {
//     icon: Shield,
//     title: "AI-Powered Security",
//     description: "Smart monitoring, alerts, predictive CCTV maintenance.",
//   },
// ];

// const FeatureCard = ({ feature, index }) => {
//   const cardRef = useRef(null);

//   const handleMouseMove = (e) => {
//     if (!cardRef.current) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     cardRef.current.style.setProperty("--x", `${x}px`);
//     cardRef.current.style.setProperty("--y", `${y}px`);
//   };

//   return (
//     <div
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       style={{ animationDelay: `${index * 150}ms` }}
//       // --- CHANGE IS HERE ---
//       className="group relative p-6 bg-white rounded-lg shadow-sm border border-gray-200/80
//                  border-t-4 border-t-emerald-500
//                  card-fade-in /* Replaced 'opacity-0 animate-fade-in' */
//                  transition-all duration-300 ease-in-out
//                  hover:shadow-xl hover:-translate-y-2"
//     >
//       {/* ... rest of the component remains the same ... */}
//       <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 
//                    bg-[radial-gradient(500px_circle_at_var(--x)_var(--y),_rgba(16,185,129,0.1),_transparent_80%)]
//                    transition-opacity duration-300 group-hover:opacity-100" />

//       <div className="relative z-10 w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center
//                    transition-all duration-300 ease-in-out
//                    group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:scale-110">
//         <feature.icon className="w-8 h-8 text-emerald-600 transition-colors duration-300 group-hover:text-white" />
//       </div>

//       <div className="relative z-10 mt-5 text-left">
//           <h3 className="text-lg font-semibold text-gray-900">
//             {feature.title}
//           </h3>
//           <p className="mt-2 text-gray-600 leading-relaxed">
//             {feature.description}
//           </p>
//       </div>
//     </div>
//   );
// };

// export const Features = () => {
//   return (
//     <section id="features" className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
//        {/* Background decorative blobs */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-100/50 rounded-full filter blur-3xl opacity-50" />
//         <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-100/50 rounded-full filter blur-3xl opacity-50" />
//       </div>

//       <div className="container mx-auto px-4 max-w-7xl">
//         <div className="text-center mb-16 md:mb-20">
//           <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
//             Core Features
//           </h2>
//           <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
//             Everything you need to manage your community efficiently and transparently.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <FeatureCard key={index} feature={feature} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };