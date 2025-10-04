// src/components/admin/CollectionExpenseOvertimeChart.jsx
import { BarChart3, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

// --- 1. Custom Bar Shape for Rounded Top and 3D/Embossed Look ---
const CustomRoundedBar = (props) => {
  const { x, y, width, height, fill, index, isMouseOver } = props;
  const radius = 6;
  
  if (height <= 0) return null;

  // SVG Path to draw a rectangle with rounded top corners
  const pathD = `M${x},${y + radius}
                 a${radius},${radius} 0 0 1 ${radius},-${radius}
                 h${width - 2 * radius}
                 a${radius},${radius} 0 0 1 ${radius},${radius}
                 v${height - radius}
                 h-${width}
                 Z`;

  return (
    <g>
      {/* 1. The main gradient bar */}
      <path d={pathD} fill={fill} />

      {/* 2. White Highlight/Embossed Border */}
      <path 
        d={`M${x},${y + radius} L${x},${y} L${x + width},${y}`}
        fill="none"
        stroke="rgba(255, 255, 255, 0.9)" // INCREASED OPACITY (0.5 -> 0.7) for clarity
        strokeWidth={1.5} // INCREASED STROKE WIDTH (1 -> 1.5) for crispness
      />
      
      {/* 3. Repeating White Diagonal Hatch Pattern*/}
      <rect 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        fill="url(#diagonalHatchPattern)" 
        opacity={0.7} // OPACITY to make lines stand out
      />

      {/* 4. Hover Highlight Effect (Light border/glow around the bar when hovered) */}
      {isMouseOver && (
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.9)" 
          strokeWidth={3}
        />
      )}
    </g>
  );
};

// --- Custom Tooltip Component (for the interaction box) ---
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const collectionData = payload.find(p => p.dataKey === 'collection');
    
    const collectionValue = collectionData ? `৳${(collectionData.value / 1000).toFixed(1)}K` : 'N/A';
    const complianceRate = '89%'; 
    const tooltipLabel = `${collectionValue} Collection | Compliance: ${complianceRate}`; 

    return (
      <div className="bg-white p-2 rounded-md shadow-lg border border-gray-300 text-xs font-medium relative">
        {tooltipLabel}
      </div>
    );
  }
  return null;
};


// --- Main Chart Component ---
export const CollectionExpenseOvertimeChart = () => {
  const [timeframe, setTimeframe] = useState('Monthly'); 
  const [hoveredBar, setHoveredBar] = useState(null);

  const data = [
    { month: 'Jan', collection: 44800, expense: 25000, monthLabel: 'Opening Coll.' },
    { month: 'Feb', collection: 36200, expense: 22000, monthLabel: '2nd Interval' },
    { month: 'Mar', collection: 29700, expense: 15000, monthLabel: 'Midpoint Coll.' },
    { month: 'Apr', collection: 21500, expense: 12000, monthLabel: 'Fee Drop' }, 
    { month: 'May', collection: 14100, expense: 10000, monthLabel: 'Late Coll.' },
    { month: 'Jun', collection: 8100, expense: 5000, monthLabel: 'Closing Coll.' },
  ];
  
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 relative">

      {/* Chart Header */}
      <div className="flex justify-between items-center pt-1">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <BarChart3 size={24} className="mr-2 text-gray-600" />
          Collection vs Expense Overtime
        </h2>
        <div className="relative">
          <select
            className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 0, left: 0, bottom: 5 }}
          barCategoryGap="10%" // DECREASED GAP (15% -> 10%) for wider look
          onMouseLeave={() => setHoveredBar(null)}
        >
          <CartesianGrid vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} hide={true} />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 50000]} 
            tickCount={6}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} 
            className="text-sm text-gray-600"
          />
          
          {/* Sky Blue highlight on hover */}
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: '#E0F2FE', fillOpacity: 0.8 }} 
          />

          {/* SVG Definitions for Gradients and Patterns */}
          <defs>
            {/* 1. Bar Gradient */}
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.5} />
            </linearGradient>

            {/* 2. Diagonal Hatch Pattern (The 3D line texture) */}
            <pattern 
              id="diagonalHatchPattern" 
              patternUnits="userSpaceOnUse" 
              width="6" 
              height="6" 
              patternTransform="rotate(45)"
            >
              {/* INCREASED STROKE WIDTH (1 -> 1.5) for sharper lines */}
              <line x1="0" y1="0" x2="0" y2="6" stroke="white" strokeWidth="1.9" /> 
            </pattern>
          </defs>

          {/* Bar Chart Data */}
          <Bar 
            dataKey="collection" 
            fill="url(#barGradient)" 
            barSize={70} // INCREASED BAR SIZE (60 -> 70) for wider columns
            shape={(props) => <CustomRoundedBar {...props} isMouseOver={props.month === hoveredBar} />} 
            onMouseEnter={(data) => setHoveredBar(data.month)}
          />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Custom X-Axis Labels (Mimic the labels above the chart) */}
      <div className="absolute top-20 left-16 right-0 grid grid-cols-6 text-center text-xs font-medium">
        {data.map((item) => (
          <div 
            key={item.month} 
            className={`pb-2 transition-colors duration-150 ${item.month === hoveredBar ? 'text-blue-600 font-bold bg-white/50 backdrop-blur-sm' : 'text-gray-500'}`}
            style={{ width: '100%' }}
            onMouseEnter={() => setHoveredBar(item.month)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <p className="font-bold">{item.monthLabel}</p>
            <p className="text-sm">৳{(item.collection / 1000).toFixed(1)}K</p>
          </div>
        ))}
      </div>

      {/* "What would you like to explore next?" section */}
    </div>
  );
};