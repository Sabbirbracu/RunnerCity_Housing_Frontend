// src/components/RecentTransactionsTable.jsx
import { ChevronDown, MoreHorizontal, Search, SlidersHorizontal } from 'lucide-react';

// --- Reusable Status Badge Component ---
const StatusBadge = ({ status }) => {
  let colorClass = '';
  switch (status) {
    case 'Paid':
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'Pending':
      colorClass = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Failed':
      colorClass = 'bg-red-100 text-red-800';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};


// --- Main Table Component ---
export const RecentTransactionsTable = () => {

  const transactionsData = [
    { id: 'T9876', date: '2025-10-04', description: 'Monthly Fee', amount: 550.00, status: 'Paid' },
    { id: 'T9875', date: '2025-10-03', description: 'Event Registration', amount: 45.50, status: 'Paid' },
    { id: 'T9874', date: '2025-10-02', description: 'Maintenance Charge', amount: 120.00, status: 'Pending' },
    { id: 'T9873', date: '2025-10-02', description: 'Annual Membership', amount: 1500.00, status: 'Paid' },
    { id: 'T9872', date: '2025-10-01', description: 'Late Fee Penalty', amount: 15.00, status: 'Failed' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* Table Header and Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
        <div className="flex space-x-3">
          {/* Search Input (Replicating "Type Product...") */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Transaction ID..."
              className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm w-48"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Filter Button */}
          <button className="flex items-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </button>
          
          {/* CRITICAL CHANGE: Green Gradient Button */}
          <button className="flex items-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium text-white 
                             bg-gradient-to-r from-emerald-500 to-green-400 
                             hover:from-emerald-600 hover:to-green-500 transition-all duration-200 shadow-md">
            + Record Payment
          </button>
        </div>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-50">
            <tr>
              {/* Checkbox Column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </th>
              {/* Data Columns - Adjusted widths for better distribution */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12 cursor-pointer hover:text-gray-700">
                <div className="flex items-center">Txn ID <ChevronDown size={14} className="ml-1" /></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12 cursor-pointer hover:text-gray-700">
                <div className="flex items-center">Date <ChevronDown size={14} className="ml-1" /></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12 cursor-pointer hover:text-gray-700">
                <div className="flex items-center">Description <ChevronDown size={14} className="ml-1" /></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12 cursor-pointer hover:text-gray-700">
                <div className="flex items-center">Amount <ChevronDown size={14} className="ml-1" /></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12 cursor-pointer hover:text-gray-700">
                <div className="flex items-center">Status <ChevronDown size={14} className="ml-1" /></div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                Action
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {transactionsData.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                {/* Checkbox */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </td>
                
                {/* Txn ID */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <p className="font-semibold text-gray-800">{txn.id}</p>
                </td>
                {/* Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {txn.date}
                </td>

                {/* Description */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <p className="font-medium">{txn.description}</p>
                </td>
                
                {/* Amount */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span className="font-semibold text-gray-800">${txn.amount.toFixed(2)}</span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={txn.status} />
                </td>

                {/* Action (Three Dots) */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};