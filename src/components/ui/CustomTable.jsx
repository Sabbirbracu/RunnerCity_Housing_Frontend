// src/components/ui/CustomTable.jsx

const CustomTable = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = "No data available",
  onRowClick,
  className = "",
}) => {
  // Enhanced Loading State
  // Keeping this state clean and solid white for contrast
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center bg-white rounded-xl shadow-lg border border-gray-100">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-gray-600 font-medium">Loading data...</span>
      </div>
    );
  }

  // Improved Empty State
  if (!data || data.length === 0) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 text-center">
        <div className="text-4xl mb-3" role="img" aria-label="No Data">
          😔
        </div>
        <p className="text-gray-500 text-lg font-medium">
          {emptyMessage}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  // Main Table UI
  return (
    <div
      // KEY CHANGE: Removed solid bg-white, added border-opacity and a softer shadow
      // For true glass effect, add 'backdrop-blur-sm' if you have a background element behind this component.
      className={`bg-white/90 rounded-2xl shadow-2xl ring-1 ring-white/50 border border-white/80 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header (Thead) - Softened background and increased contrast */}
          <thead className="bg-white/80">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className={`px-6 py-3.5 text-left text-sm font-bold text-gray-800 uppercase tracking-wider ${
                    col.headerClassName || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body (Tbody) - Alternating rows with slight transparency, unique hover color */}
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || row.key || rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={`
                  ${onRowClick ? "cursor-pointer" : ""}
                  ${rowIndex % 2 === 0 ? "bg-white/80" : "bg-gray-100/70"} 
                  // SPECIAL HOVER: Brighter, more focused highlight color (e.g., sky-200)
                  hover:bg-sky-200/50 transition duration-200 ease-in-out
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800 ${
                      col.cellClassName || ""
                    }`}
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;