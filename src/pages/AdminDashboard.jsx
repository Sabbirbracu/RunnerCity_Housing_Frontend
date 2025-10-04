// src/pages/AdminDashboard.jsx
import { AlertCircle, BarChart, DollarSign, TrendingDown } from "lucide-react";
import { CollectionExpenseOvertimeChart } from "../components/admin/CollectionExpenseOvertimeChart";
import { ExpenseBreakdownWidget } from "../components/admin/ExpenseBreakdownWidget";
import { KPIWidget } from "../components/admin/KPIWidget";
import { RecentTransactionsTable } from "../components/admin/RecentTransactionsTable";
import { Sidebar } from "../components/admin/Sidebar";

export const AdminDashboard = () => {
  return (
    // CRITICAL FIX: Changed min-h-screen to h-screen to constrain the overall height
    <div className="flex h-screen bg-gray-50"> 
      {/* Sidebar (Fixed due to h-screen on the container and on the aside itself) */}
      <Sidebar />

      {/* Main Content (Must take up remaining space and allow its internal content to scroll) */}
      <main className="flex-1 flex flex-col overflow-hidden"> {/* Added overflow-hidden to main */}
        {/* Top Navbar: Fixed height and stays at the top */}
        <header className="h-16 bg-white shadow-sm px-6 flex items-center justify-between flex-shrink-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </header>

        {/* Dashboard Content: Takes the remaining height (flex-1) and handles the scrolling (overflow-y-auto) */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto"> 
         
          {/* KPI Widgets Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPIWidget
              title="Total Collected Fees (৳)"
              value="৳1,25,000"
              change="+12%"
              icon={DollarSign}
              color="#3B82F6"
            />

            <KPIWidget
              title="Total Expenses (৳)"
              value="৳65,000"
              change="-5%"
              icon={TrendingDown}
              color="#F59E0B"
            />

            <KPIWidget
              title="Net Balance (৳)"
              value="৳60,000"
              change="+7%"
              icon={BarChart}
              color="#10B981"
            />

            <KPIWidget
              title="Pending Fees"
              value="15" 
              change="-3%"
              icon={AlertCircle}
              color="#EF4444"
            />
          </div>


          {/* Charts & Breakdown Section (2:1 Ratio - col-span-4 and col-span-2) */}
          <div className="grid grid-cols-6 gap-6"> 
            {/* Collection Overtime Chart: Takes 4 out of 6 columns (66.6% width) */}
            <div className="col-span-4">
                <CollectionExpenseOvertimeChart />
            </div>

            {/* Expense Breakdown Widget: Takes 2 out of 6 columns (33.3% width) */}
            <div className="col-span-2">
                <ExpenseBreakdownWidget />
            </div>
          </div>

          {/* New: Recent Transactions Table */}
          <div className="w-full">
            <RecentTransactionsTable />
          </div>

        </div>
      </main>
    </div>
  );
};