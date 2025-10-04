import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Dots } from "./Dots";

// --- Color and Style Mapping (RCHMS Dashboard) ---
const getThemeColors = (primaryColor) => {
  const colorMap = {
    '#3B82F6': { // Blue Theme → Total Collected Fees
      gradientStart: "#3B82F6", gradientEnd: "#60A5FA",
      shadowColor: "rgba(59, 130, 246, 0.6)",
      innerWash: "rgba(59, 130, 246, 0.05)", // Retain for potential use, though not used in new ::before style
      washColor: "rgba(59, 130, 246, 0.03)", // Very light blue for the axial gradient
      dot1: "rgba(59, 130, 246, 1)",
      dot2: "rgba(59, 130, 246, 0.3)",
      sparklineData: [50, 40, 60, 55, 70, 60, 80],
      glowClass: 'bg-gradient-to-br from-blue-300/60 to-white/0',
    },
    '#F59E0B': { // Yellow/Orange Theme → Total Expenses
      gradientStart: "#F59E0B", gradientEnd: "#FBBF24",
      shadowColor: "rgba(245, 158, 11, 0.6)",
      innerWash: "rgba(245, 158, 11, 0.05)",
      washColor: "rgba(245, 158, 11, 0.03)", // Very light orange for the axial gradient
      dot1: "rgba(245, 158, 11, 1)",
      dot2: "rgba(245, 158, 11, 0.3)",
      sparklineData: [30, 25, 35, 40, 30, 45, 40],
      glowClass: 'bg-gradient-to-br from-yellow-300/60 to-white/0',
    },
    '#10B981': { // Green Theme → Net Balance
      gradientStart: "#10B981", gradientEnd: "#34D399",
      shadowColor: "rgba(16, 185, 129, 0.6)",
      innerWash: "rgba(16, 185, 129, 0.05)",
      washColor: "rgba(16, 185, 129, 0.03)", // Very light green for the axial gradient
      dot1: "rgba(16, 185, 129, 1)",
      dot2: "rgba(16, 185, 129, 0.3)",
      sparklineData: [20, 30, 25, 40, 35, 50, 45],
      glowClass: 'bg-gradient-to-br from-emerald-300/60 to-white/0',
    },
    '#EF4444': { // Red Theme → Pending Fees
      gradientStart: "#EF4444", gradientEnd: "#F87171",
      shadowColor: "rgba(239, 68, 68, 0.6)",
      innerWash: "rgba(239, 68, 68, 0.05)",
      washColor: "rgba(239, 68, 68, 0.03)", // Very light red for the axial gradient
      dot1: "rgba(239, 68, 68, 1)",
      dot2: "rgba(239, 68, 68, 0.3)",
      sparklineData: [5, 8, 3, 6, 4, 7, 5],
      glowClass: 'bg-gradient-to-br from-red-300/60 to-white/0',
    },
    default: {
      gradientStart: "#9f7aea", gradientEnd: "#c4b5fd",
      shadowColor: "rgba(167, 139, 250, 0.6)",
      innerWash: "rgba(167, 139, 250, 0.05)",
      washColor: "rgba(167, 139, 250, 0.03)",
      dot1: "rgba(167, 139, 250, 1)",
      dot2: "rgba(167, 139, 250, 0.3)",
      sparklineData: [1, 2, 1, 2, 1, 2, 1],
      glowClass: 'bg-gradient-to-br from-violet-300/60 to-white/0',
    },
  };
  return colorMap[primaryColor] || colorMap['default'];
};

// --- Core KPI Widget Component ---
const _KPIWidgetCore = ({ title, value, change, icon: Icon, themeColors }) => {
  const isPositive = change.startsWith("+");
  const changePercent = change.replace(/[^0-9.%]/g, '');

  const gradientStyle = {
    background: `linear-gradient(145deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
  };

  // Positive is Green, Negative is Red (matching the dashboard image)
  const pillColorClass = isPositive ? "text-emerald-600 bg-emerald-100/70" : "text-red-600 bg-red-100/70";

  const coreCardStyle = {
    // New variable for the axial gradient wash
    '--kpi-wash-gradient-color': themeColors.washColor,
    // Existing variable for the sharp top-left glow
    '--kpi-shadow-color': themeColors.gradientStart,
  };

  return (
    <div
      className="bg-white rounded-2xl p-6 relative overflow-hidden transition-shadow duration-300 hover:shadow-lg kpi-card-effects"
      style={coreCardStyle}
    >
      {/* Top Row: Icon and Percentage Change */}
      <div className="flex items-center justify-between mb-4">
        {/* Icon Circle */}
        <div className="p-3 rounded-full flex items-center justify-center shadow-md" style={gradientStyle}>
          <Icon size={24} className="text-white" />
        </div>

        {/* Percentage Change */}
        <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${pillColorClass}`}>
          {isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
          {changePercent}
        </span>
      </div>

      {/* Middle Section: Title, Value, and Sparkline */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          <Dots colors={themeColors} dotsData={themeColors.sparklineData} />
        </div>
      </div>
    </div>
  );
};

// --- Wrapper KPI Widget Component with Hover Gradient Shadow ---
export const KPIWidget = ({ title, value, change, icon, color }) => {
  const themeColors = getThemeColors(color);
  const glowClass = themeColors.glowClass;

  return (
    <div className="relative group w-full">
      <div className="relative z-10">
        <_KPIWidgetCore
          title={title}
          value={value}
          change={change}
          icon={icon}
          themeColors={themeColors}
        />
      </div>

      {/* Hover Gradient Shadow */}
      <div
        className={`absolute inset-0 rounded-2xl -m-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 filter blur-xl ${glowClass}`}
        style={{ zIndex: 0 }}
      ></div>
    </div>
  );
};