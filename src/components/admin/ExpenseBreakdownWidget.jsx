// src/components/ExpenseBreakdownWidget.jsx
import { ChevronDown } from 'lucide-react';

// --- Individual Breakdown Item Component ---
const BreakdownItem = ({ label, value, percentage, color1, color2 }) => {

  const progressBarStyles = {
    background: `
      repeating-linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.45), 
        rgba(255, 255, 255, 0.45) 2px, 
        transparent 2px,
        transparent 8px 
      ),
      linear-gradient(90deg, ${color1}, ${color2})`, 
      
    backgroundSize: '100% 100%, 8px 8px',
    backgroundRepeat: 'no-repeat, repeat',
    width: `${percentage}%`,
  };

  return (
    // Reinstated mb-4 for standard spacing, no longer relying on flex-grow for spacing
    <div className="mb-4"> 
      <div className="flex justify-between items-center mb-1 text-sm text-gray-700">
        <span className="font-medium">{label}</span>
        <span className="font-semibold text-gray-800">৳ {value.toLocaleString('en-US')}</span>
      </div>
      {/* Progress Bar Container (h-3 retained) */}
      <div className="h-3 rounded-full bg-gray-200/50 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-700 ease-out`}
          style={progressBarStyles}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

// --- Main Expense Breakdown Component (Gross Volume Style) ---
export const ExpenseBreakdownWidget = () => {
  const expenseData = [
    { label: "Salaries", value: 55000, percentage: 75, color1: "#059669", color2: "#10B981" }, 
    { label: "Maintenance", value: 30000, percentage: 52, color1: "#1D4ED8", color2: "#3B82F6" },  
    { label: "Events", value: 15000, percentage: 35, color1: "#E11D48", color2: "#F43F5E" },    
  ];

  const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);
  const changePercent = "+15"; 
  const isPositive = changePercent.startsWith("+");

  const trendPillClass = isPositive ? "text-emerald-600 bg-emerald-100/70" : "text-red-600 bg-red-100/70";

  return (
    // Card Container: Removed flex-col, adjusted min-h for balance
    // Changed p-6 to px-6 py-4 for reduced top/bottom padding
    <div className="bg-white rounded-2xl shadow-2xl px-6 py-4 relative min-h-[390px]"> 
      
      {/* Widget Header (Increased top space with mt-2) */}
      <div className="flex justify-between items-start pt-5 mb-4">
        <h2 className="text-xl font-normal text-black">Expense Breakdown</h2>
        <div className="relative">
          <select
            className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-1 px-3 pr-6 rounded-lg text-sm leading-tight focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
            defaultValue="Monthly"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Main Total Value (Adjusted font size from text-3xl to text-2xl) */}
      <div className="flex items-center pt-5 mb-8">
        <span className="text-3xl font-bold text-gray-900">৳ {totalExpense.toLocaleString('en-US')}</span>
        <span className={`flex items-center text-sm font-semibold px-2 py-0.5 ml-3 rounded-full ${trendPillClass}`}>
          {isPositive ? "▲" : "▼"} {changePercent.replace(/[^0-9.%]/g, '')}%
        </span>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-200/70 mb-8"></div>

      {/* Breakdown Bars: Back to standard space-y-4 for tighter grouping */}
      <div className="space-y-6"> 
        {expenseData.map((item) => (
          <BreakdownItem
            key={item.label}
            label={item.label}
            value={item.value}
            percentage={item.percentage}
            color1={item.color1}
            color2={item.color2}
          />
        ))}
      </div>
      
      {/* Adding a flexible spacer div here to push the content up and use the min-h space */}
      <div className="flex-grow"></div> 
    </div>
  );
};