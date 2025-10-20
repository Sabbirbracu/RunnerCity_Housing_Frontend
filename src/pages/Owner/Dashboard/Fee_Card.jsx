import { TrendingUp } from "lucide-react";

/**
 * FeeCard Component
 * Green gradient "Outstanding Fees Due" card with Pay Now button.
 */
export const FeeCard = () => {
  return (
    <div
      className="relative w-full max-w-sm p-6 overflow-hidden rounded-2xl shadow-xl
                 bg-gradient-to-br from-emerald-400 to-green-500 text-white
                 transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer
                 h-full min-h-[180px]"
    >
      {/* Background chart-like SVG */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 300 150" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="white"
            strokeWidth="5"
            points="0,150 50,80 100,100 150,50 200,85 250,60 300,100"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Title and Amount */}
        <div>
          <h3 className="text-lg font-semibold tracking-wide">Monthly Fees Due</h3>
          <p className="text-5xl font-extrabold mt-1 mb-6">৳2,500</p>
        </div>

        {/* Button and Icon */}
        <div className="flex items-end justify-between mt-auto">
          <button
            className="px-6 py-2.5 bg-white text-emerald-600 font-bold rounded-xl shadow-lg
                       hover:bg-gray-50 transition transform hover:scale-[1.05] text-base"
          >
            Pay Now
          </button>

          <div className="p-2 bg-white/30 rounded-full flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
