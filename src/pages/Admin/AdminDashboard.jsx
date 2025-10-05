// src/pages/Admin/AdminDashboard.jsx
import { AlertCircle, BarChart, DollarSign, TrendingDown } from "lucide-react";
import { CollectionExpenseOvertimeChart } from "../../components/admin/CollectionExpenseOvertimeChart";
import { ExpenseBreakdownWidget } from "../../components/admin/ExpenseBreakdownWidget";
import { KPIWidget } from "../../components/admin/KPIWidget";
import { RecentTransactionsTable } from "../../components/admin/RecentTransactionsTable";

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* KPI Widgets */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 lg:col-span-4">
          <CollectionExpenseOvertimeChart />
        </div>

        <div className="col-span-6 lg:col-span-2">
          <ExpenseBreakdownWidget />
        </div>
      </div>

      {/* Transactions Table */}
      <RecentTransactionsTable />
    </div>
  );
};
