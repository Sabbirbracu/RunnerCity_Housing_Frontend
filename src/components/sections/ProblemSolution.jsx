import { CheckCircle, XCircle } from "lucide-react";
import problemImage from "../../assets/problem-illustration.jpg";
import solutionImage from "../../assets/solution-illustration.jpg";

export const ProblemSolution = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-transparent opacity-50" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-gray-900">
          Transforming Community Management
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Problem Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-red-500/5 rounded-3xl blur-xl group-hover:bg-red-500/10 transition-all duration-500" />
            <div className="relative">
              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl mb-6 shadow-2xl">
                <img
                  src={problemImage}
                  alt="Manual community management challenges"
                  className="w-full h-[320px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/25 to-transparent" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-100/50 text-red-600 rounded-full text-sm font-semibold backdrop-blur-sm shadow-sm">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  The Challenge
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  Manual Management Creates Chaos
                </h3>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    Managing a housing community manually creates overwhelming complexity — from fees to staff coordination and facility maintenance.
                  </p>
                  <ul className="space-y-2 pl-5 list-none">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Paper-based records lead to errors and disputes
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Time-consuming manual processes for everything
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Lack of transparency breeds mistrust
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-xl group-hover:bg-emerald-500/10 transition-all duration-500" />
            <div className="relative">
              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl mb-6 shadow-2xl">
                <img
                  src={solutionImage}
                  alt="RCHMS digital solution"
                  className="w-full h-[320px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/25 to-transparent" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-100/50 text-emerald-700 rounded-full text-sm font-semibold backdrop-blur-sm shadow-sm">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                  Our Solution
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  RCHMS Brings Digital Excellence
                </h3>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    Our platform digitalizes every aspect of community management, bringing transparency, efficiency, and peace of mind.
                  </p>
                  <ul className="space-y-2 pl-5 list-none">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      Automated payments and digital record-keeping
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      Real-time transparency for all residents
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      AI-powered security and intelligent insights
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
