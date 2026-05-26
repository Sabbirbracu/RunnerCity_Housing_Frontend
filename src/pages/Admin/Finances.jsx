import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useGetFinanceSummaryQuery,
  useGetFeesQuery,
  useGetExpensesQuery,
  useGetPayrollPaymentsQuery,
  useGetContributionsQuery,
} from "../../features/api/financeApi";
import CustomTable from "../../components/ui/CustomTable";

// --- Filter Bar Component ---
const FilterBar = ({ filters, activeFilters, onFilterChange, searchValue, onSearchChange, searchPlaceholder }) => (
  <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
    {/* Search */}
    <div className="relative flex-1 w-full sm:max-w-xs">
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={searchPlaceholder || "Search..."}
        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all shadow-sm"
      />
    </div>
    {/* Filter Pills */}
    <div className="flex items-center gap-2 flex-wrap">
      <Filter className="w-4 h-4 text-gray-500" />
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all shadow-sm ${
            activeFilters === f.value
              ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-200"
              : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400 hover:text-emerald-700 hover:shadow-md"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  </div>
);

// --- Monthly Comparison Chart ---
const MonthlyComparisonChart = ({ fees, expenses }) => {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-GB", { month: "short" }),
    });
  }

  const monthlyData = months.map((m) => {
    const monthFees = fees.filter((f) => f.month?.startsWith(m.key));
    const monthExpenses = expenses.filter((e) => e.payment_date?.startsWith(m.key));
    const collected = monthFees.reduce((sum, f) => sum + Number(f.amount_due || 0), 0);
    const spent = monthExpenses.reduce((sum, e) => sum + Number(e.total_amount || 0), 0);
    return { ...m, collected, spent };
  });

  const maxVal = Math.max(...monthlyData.map((d) => Math.max(d.collected, d.spent)), 1);
  const totalCollected = monthlyData.reduce((s, d) => s + d.collected, 0);
  const totalSpent = monthlyData.reduce((s, d) => s + d.spent, 0);

  // Y-axis ticks (4 levels)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((p) => Math.round(maxVal * p));

  // Format amount for Y-axis
  const formatAmount = (val) => {
    if (val >= 100000) return `৳${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `৳${(val / 1000).toFixed(0)}K`;
    return `৳${val}`;
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-200/50 via-teal-200/40 to-emerald-200/50 rounded-3xl blur-xl" />
      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Collection vs Expense</h3>
          <p className="text-xs text-gray-400 mt-0.5">Last 6 months comparison</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gradient-to-r from-emerald-500 to-emerald-600"></span>Collected</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gradient-to-r from-red-500 to-red-400"></span>Expense</span>
        </div>
      </div>

      {/* Summary line */}
      <div className="flex items-center gap-6 mb-5 text-xs">
        <span className="text-emerald-700 font-semibold">Total In: ৳{totalCollected.toLocaleString()}</span>
        <span className="text-red-600 font-semibold">Total Out: ৳{totalSpent.toLocaleString()}</span>
        <span className={`font-bold ${totalCollected - totalSpent >= 0 ? "text-emerald-700" : "text-red-600"}`}>
          Net: ৳{(totalCollected - totalSpent).toLocaleString()}
        </span>
      </div>

      {/* Chart with Y-axis */}
      <div className="flex gap-2">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between h-40 text-[10px] text-gray-400 font-medium pr-1 py-1">
          {[...yTicks].reverse().map((val, i) => (
            <span key={i} className="leading-none">{formatAmount(val)}</span>
          ))}
        </div>

        {/* Bars with grid lines */}
        <div className="flex-1 relative h-40 border-l border-b border-gray-100 pl-2 pb-1">
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <div
              key={percent}
              className="absolute left-0 right-0 border-t border-dashed border-gray-100"
              style={{ bottom: `${percent}%` }}
            />
          ))}

          {/* Bars */}
          <div className="relative flex items-end gap-2 md:gap-3 h-full z-10">
            {monthlyData.map((d) => (
              <div key={d.key} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end gap-0.5 h-[calc(100%-20px)]">
                  <div
                    className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all hover:opacity-80 shadow-sm cursor-default"
                    style={{ height: `${(d.collected / maxVal) * 100}%`, minHeight: d.collected > 0 ? "6px" : "0" }}
                    title={`Collected: ৳${d.collected.toLocaleString()}`}
                  />
                  <div
                    className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all hover:opacity-80 shadow-sm cursor-default"
                    style={{ height: `${(d.spent / maxVal) * 100}%`, minHeight: d.spent > 0 ? "6px" : "0" }}
                    title={`Expense: ৳${d.spent.toLocaleString()}`}
                  />
                </div>
                <span className="text-xs text-gray-600 font-semibold">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

// --- Quick Stats Card ---
const QuickStatsCard = ({ fees, expenses }) => {
  const totalPlots = 159;
  const paidCount = fees.filter((f) => f.status === "paid").length;
  const totalFees = fees.length;
  const collectionRate = totalFees > 0 ? ((paidCount / totalFees) * 100).toFixed(0) : 0;

  const now = new Date();
  const thisMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthKey = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`;

  const thisMonthIncome = fees.filter((f) => f.month?.startsWith(thisMonthKey) && f.status === "paid").reduce((s, f) => s + Number(f.amount_due || 0), 0);
  const lastMonthIncome = fees.filter((f) => f.month?.startsWith(lastMonthKey) && f.status === "paid").reduce((s, f) => s + Number(f.amount_due || 0), 0);
  const incomeChange = lastMonthIncome > 0 ? (((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100).toFixed(0) : 0;

  const catTotals = {};
  expenses.forEach((e) => {
    const cat = e.category || "other";
    catTotals[cat] = (catTotals[cat] || 0) + Number(e.total_amount || 0);
  });
  const topCategory = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];

  const stats = [
    { label: "Total Plots", value: totalPlots, sub: "in Runner City", color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-700" },
    { label: "Collection Rate", value: `${collectionRate}%`, sub: `${paidCount}/${totalFees} paid`, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", text: "text-emerald-700" },
    { label: "This Month", value: `৳${thisMonthIncome.toLocaleString()}`, sub: incomeChange >= 0 ? `↑ ${incomeChange}%` : `↓ ${Math.abs(incomeChange)}%`, color: "from-violet-500 to-violet-600", bg: "bg-violet-50", text: "text-violet-700" },
    { label: "Top Expense", value: topCategory ? topCategory[0].charAt(0).toUpperCase() + topCategory[0].slice(1) : "—", sub: topCategory ? `৳${topCategory[1].toLocaleString()}` : "", color: "from-amber-500 to-amber-600", bg: "bg-amber-50", text: "text-amber-700" },
  ];

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-200/50 via-blue-200/40 to-violet-200/50 rounded-3xl blur-xl" />
      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Quick Stats</h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-3.5 border border-white/60`}>
            <p className="text-[11px] text-gray-600 font-semibold uppercase tracking-wide">{s.label}</p>
            <p className={`text-xl font-extrabold ${s.text} mt-1`}>{s.value}</p>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

// --- Fees Tab with Filters ---
const FeesTab = ({ fees, isLoading }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = fees.filter((f) => {
    const matchSearch = !search || (f.user?.name || "").toLowerCase().includes(search.toLowerCase()) || (f.user?.plot_no || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || f.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns = [
    { header: "User", accessor: "user", headerClassName: "font-bold", cellClassName: "font-medium text-gray-900", render: (row) => {
      const name = row.user?.name || "—";
      const avatarUrl = row.user?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&size=32&bold=true`;
      return (
        <div className="flex items-center gap-2.5">
          <img src={avatarUrl} alt={name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          <span>{name}</span>
        </div>
      );
    }},
    { header: "Plot", accessor: "plot", headerClassName: "font-bold", cellClassName: "text-gray-600", render: (row) => row.user?.plot_no || "—" },
    { header: "Amount", accessor: "amount_due", headerClassName: "font-bold", cellClassName: "font-bold text-gray-900", render: (row) => `৳${Number(row.amount_due).toLocaleString()}` },
    { header: "Month", accessor: "month", headerClassName: "font-bold", cellClassName: "text-gray-600", render: (row) => new Date(row.month).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) },
    { header: "Status", accessor: "status", headerClassName: "font-bold", render: (row) => {
      const colors = { paid: "bg-emerald-50 text-emerald-700 ring-emerald-200", unpaid: "bg-red-50 text-red-700 ring-red-200", partial: "bg-amber-50 text-amber-700 ring-amber-200" };
      return <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full ring-1 ring-inset capitalize ${colors[row.status] || "bg-gray-100 text-gray-600 ring-gray-200"}`}>{row.status}</span>;
    }},
  ];

  return (
    <div>
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or plot..."
        filters={[
          { value: "all", label: "All" },
          { value: "paid", label: "Paid" },
          { value: "unpaid", label: "Unpaid" },
          { value: "partial", label: "Partial" },
        ]}
        activeFilters={statusFilter}
        onFilterChange={setStatusFilter}
      />
      <CustomTable columns={columns} data={filtered} isLoading={isLoading} emptyMessage="No fee records found" />
    </div>
  );
};

// --- Expenses Tab with Filters ---
const ExpensesTab = ({ expenses, isLoading }) => {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  const categories = [...new Set(expenses.map((e) => e.category))];
  const filtered = expenses.filter((e) => {
    const matchSearch = !search || (e.description || "").toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || e.category === catFilter;
    return matchSearch && matchCat;
  });

  const columns = [
    { header: "Category", accessor: "category", headerClassName: "font-bold", cellClassName: "capitalize font-medium text-gray-900" },
    { header: "Description", accessor: "description", headerClassName: "font-bold", cellClassName: "text-gray-600", render: (row) => row.description || "—" },
    { header: "Amount", accessor: "total_amount", headerClassName: "font-bold", cellClassName: "font-bold text-gray-900", render: (row) => `৳${Number(row.total_amount).toLocaleString()}` },
    { header: "Date", accessor: "payment_date", headerClassName: "font-bold", cellClassName: "text-gray-600", render: (row) => new Date(row.payment_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) },
    { header: "Paid By", accessor: "paid_by", headerClassName: "font-bold", cellClassName: "text-gray-600 capitalize" },
  ];

  return (
    <div>
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search expenses..."
        filters={[
          { value: "all", label: "All" },
          ...categories.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) })),
        ]}
        activeFilters={catFilter}
        onFilterChange={setCatFilter}
      />
      <CustomTable columns={columns} data={filtered} isLoading={isLoading} emptyMessage="No expenses recorded" />
    </div>
  );
};

// --- Payroll Tab with Filters ---
const PayrollTab = ({ payments, isLoading }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = payments.filter((p) => {
    const matchSearch = !search || (p.assignment?.staff?.name || "").toLowerCase().includes(search.toLowerCase()) || (p.assignment?.role || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns = [
    { header: "Staff", accessor: "staff", headerClassName: "font-bold", cellClassName: "font-medium text-gray-900", render: (row) => {
      const name = row.assignment?.staff?.name || "—";
      const avatarUrl = row.assignment?.staff?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&size=32&bold=true`;
      return (
        <div className="flex items-center gap-2.5">
          <img src={avatarUrl} alt={name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          <span>{name}</span>
        </div>
      );
    }},
    { header: "Role", accessor: "role", headerClassName: "font-bold", cellClassName: "capitalize text-gray-600", render: (row) => row.assignment?.role || "—" },
    { header: "Amount", accessor: "total_paid", headerClassName: "font-bold", cellClassName: "font-bold text-gray-900", render: (row) => `৳${Number(row.total_paid).toLocaleString()}` },
    { header: "Month", accessor: "month", headerClassName: "font-bold", cellClassName: "text-gray-600", render: (row) => new Date(row.month).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) },
    { header: "Status", accessor: "status", headerClassName: "font-bold", render: (row) => {
      const colors = { paid: "bg-emerald-50 text-emerald-700 ring-emerald-200", pending: "bg-amber-50 text-amber-700 ring-amber-200" };
      return <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full ring-1 ring-inset capitalize ${colors[row.status] || "bg-gray-100 text-gray-600 ring-gray-200"}`}>{row.status}</span>;
    }},
  ];

  return (
    <div>
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search staff..."
        filters={[
          { value: "all", label: "All" },
          { value: "paid", label: "Paid" },
          { value: "pending", label: "Pending" },
        ]}
        activeFilters={statusFilter}
        onFilterChange={setStatusFilter}
      />
      <CustomTable columns={columns} data={filtered} isLoading={isLoading} emptyMessage="No payroll records" />
    </div>
  );
};

// --- Contributions Tab ---
const ContributionsTab = ({ contributions, isLoading }) => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = contributions.filter((c) => statusFilter === "all" || c.status === statusFilter);

  const columns = [
    { header: "Title", accessor: "title", headerClassName: "font-bold", cellClassName: "font-medium text-gray-900" },
    { header: "Target", accessor: "target_amount", headerClassName: "font-bold", cellClassName: "text-gray-600", render: (row) => `৳${Number(row.target_amount).toLocaleString()}` },
    { header: "Collected", accessor: "collected_amount", headerClassName: "font-bold", cellClassName: "font-bold text-emerald-700", render: (row) => `৳${Number(row.collected_amount || 0).toLocaleString()}` },
    { header: "Progress", accessor: "progress", headerClassName: "font-bold", render: (row) => {
      const percent = row.target_amount > 0 ? Math.min(100, ((Number(row.collected_amount || 0) / Number(row.target_amount)) * 100)).toFixed(0) : 0;
      return (
        <div className="flex items-center gap-2">
          <div className="w-20 h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${Number(percent) >= 100 ? "bg-blue-500" : "bg-emerald-500"}`} style={{ width: `${percent}%` }} />
          </div>
          <span className="text-xs text-gray-600 font-semibold">{percent}%</span>
        </div>
      );
    }},
    { header: "Status", accessor: "status", headerClassName: "font-bold", render: (row) => {
      const colors = { active: "bg-emerald-50 text-emerald-700 ring-emerald-200", completed: "bg-blue-50 text-blue-700 ring-blue-200", closed: "bg-gray-100 text-gray-600 ring-gray-200" };
      return <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full ring-1 ring-inset capitalize ${colors[row.status] || "bg-gray-100 text-gray-600 ring-gray-200"}`}>{row.status}</span>;
    }},
  ];

  return (
    <div>
      <FilterBar
        searchValue=""
        onSearchChange={() => {}}
        searchPlaceholder="Search contributions..."
        filters={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "completed", label: "Completed" },
          { value: "closed", label: "Closed" },
        ]}
        activeFilters={statusFilter}
        onFilterChange={setStatusFilter}
      />
      <CustomTable columns={columns} data={filtered} isLoading={isLoading} emptyMessage="No contributions yet" />
    </div>
  );
};

// --- Main Finance Page ---
const Finances = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("fees");

  const { data: summary, isLoading: summaryLoading } = useGetFinanceSummaryQuery();
  const { data: feesData, isLoading: feesLoading } = useGetFeesQuery({});
  const { data: expensesData, isLoading: expensesLoading } = useGetExpensesQuery({});
  const { data: payrollData, isLoading: payrollLoading } = useGetPayrollPaymentsQuery();
  const { data: contribData, isLoading: contribLoading } = useGetContributionsQuery();

  const feesRaw = Array.isArray(feesData) ? feesData : [];
  const expensesRaw = Array.isArray(expensesData) ? expensesData : [];
  const payrollPayments = Array.isArray(payrollData) ? payrollData : [];
  const contributionsRaw = Array.isArray(contribData) ? contribData : [];

  // Dummy data for preview
  const dummyFees = [
    // May 2026 - high collection month
    { fee_id: 1, user: { name: "Md. Abdus Samad", plot_no: "D-3" }, amount_due: 3500, month: "2026-05-01", status: "paid" },
    { fee_id: 2, user: { name: "Rahim Molla", plot_no: "A-5" }, amount_due: 3500, month: "2026-05-01", status: "paid" },
    { fee_id: 3, user: { name: "Karim Uddin", plot_no: "B-2" }, amount_due: 3500, month: "2026-05-01", status: "paid" },
    { fee_id: 4, user: { name: "Jashim Uddin", plot_no: "F-1" }, amount_due: 3500, month: "2026-05-01", status: "paid" },
    { fee_id: 5, user: { name: "Halim Molla", plot_no: "C-05" }, amount_due: 4000, month: "2026-05-01", status: "paid" },
    { fee_id: 6, user: { name: "Nasir Ahmed", plot_no: "E-7" }, amount_due: 3500, month: "2026-05-01", status: "paid" },
    { fee_id: 7, user: { name: "Faruk Hossain", plot_no: "A-3" }, amount_due: 3500, month: "2026-05-01", status: "paid" },
    { fee_id: 8, user: { name: "Selim Khan", plot_no: "B-7" }, amount_due: 3500, month: "2026-05-01", status: "paid" },
    { fee_id: 9, user: { name: "Rafiq Islam", plot_no: "C-02" }, amount_due: 4000, month: "2026-05-01", status: "paid" },
    { fee_id: 10, user: { name: "Jahanara Begum", plot_no: "D-5" }, amount_due: 3500, month: "2026-05-01", status: "unpaid" },
    { fee_id: 11, user: { name: "Mokhles Mia", plot_no: "F-4" }, amount_due: 3500, month: "2026-05-01", status: "paid" },
    { fee_id: 12, user: { name: "Shahidul Alam", plot_no: "A-8" }, amount_due: 3500, month: "2026-05-01", status: "partial" },
    // April 2026
    { fee_id: 13, user: { name: "Md. Abdus Samad", plot_no: "D-3" }, amount_due: 3500, month: "2026-04-01", status: "paid" },
    { fee_id: 14, user: { name: "Rahim Molla", plot_no: "A-5" }, amount_due: 3500, month: "2026-04-01", status: "paid" },
    { fee_id: 15, user: { name: "Karim Uddin", plot_no: "B-2" }, amount_due: 3500, month: "2026-04-01", status: "paid" },
    { fee_id: 16, user: { name: "Jashim Uddin", plot_no: "F-1" }, amount_due: 3500, month: "2026-04-01", status: "paid" },
    { fee_id: 17, user: { name: "Halim Molla", plot_no: "C-05" }, amount_due: 4000, month: "2026-04-01", status: "paid" },
    { fee_id: 18, user: { name: "Nasir Ahmed", plot_no: "E-7" }, amount_due: 3500, month: "2026-04-01", status: "paid" },
    { fee_id: 19, user: { name: "Faruk Hossain", plot_no: "A-3" }, amount_due: 3500, month: "2026-04-01", status: "paid" },
    { fee_id: 20, user: { name: "Selim Khan", plot_no: "B-7" }, amount_due: 3500, month: "2026-04-01", status: "unpaid" },
    // March 2026
    { fee_id: 21, user: { name: "Md. Abdus Samad", plot_no: "D-3" }, amount_due: 3500, month: "2026-03-01", status: "paid" },
    { fee_id: 22, user: { name: "Rahim Molla", plot_no: "A-5" }, amount_due: 3500, month: "2026-03-01", status: "paid" },
    { fee_id: 23, user: { name: "Karim Uddin", plot_no: "B-2" }, amount_due: 3500, month: "2026-03-01", status: "paid" },
    { fee_id: 24, user: { name: "Jashim Uddin", plot_no: "F-1" }, amount_due: 3500, month: "2026-03-01", status: "paid" },
    { fee_id: 25, user: { name: "Halim Molla", plot_no: "C-05" }, amount_due: 4000, month: "2026-03-01", status: "paid" },
    { fee_id: 26, user: { name: "Nasir Ahmed", plot_no: "E-7" }, amount_due: 3500, month: "2026-03-01", status: "paid" },
    // Feb 2026 - lower collection
    { fee_id: 27, user: { name: "Md. Abdus Samad", plot_no: "D-3" }, amount_due: 3500, month: "2026-02-01", status: "paid" },
    { fee_id: 28, user: { name: "Rahim Molla", plot_no: "A-5" }, amount_due: 3500, month: "2026-02-01", status: "paid" },
    { fee_id: 29, user: { name: "Karim Uddin", plot_no: "B-2" }, amount_due: 3500, month: "2026-02-01", status: "paid" },
    { fee_id: 30, user: { name: "Jashim Uddin", plot_no: "F-1" }, amount_due: 3500, month: "2026-02-01", status: "paid" },
    // Jan 2026
    { fee_id: 31, user: { name: "Md. Abdus Samad", plot_no: "D-3" }, amount_due: 3500, month: "2026-01-01", status: "paid" },
    { fee_id: 32, user: { name: "Rahim Molla", plot_no: "A-5" }, amount_due: 3500, month: "2026-01-01", status: "paid" },
    { fee_id: 33, user: { name: "Karim Uddin", plot_no: "B-2" }, amount_due: 3500, month: "2026-01-01", status: "paid" },
    // Dec 2025
    { fee_id: 34, user: { name: "Md. Abdus Samad", plot_no: "D-3" }, amount_due: 3500, month: "2025-12-01", status: "paid" },
    { fee_id: 35, user: { name: "Rahim Molla", plot_no: "A-5" }, amount_due: 3500, month: "2025-12-01", status: "paid" },
  ];
  const dummyExpenses = [
    // May - heavy month
    { expense_id: 1, category: "electricity", description: "Common area electricity bill - May", total_amount: 14500, payment_date: "2026-05-15", paid_by: "committee" },
    { expense_id: 2, category: "maintenance", description: "Road repair near Block A", total_amount: 32000, payment_date: "2026-05-10", paid_by: "committee" },
    { expense_id: 3, category: "security", description: "CCTV maintenance & new camera", total_amount: 18000, payment_date: "2026-05-05", paid_by: "committee" },
    // April
    { expense_id: 4, category: "cleaning", description: "Monthly cleaning supplies", total_amount: 6500, payment_date: "2026-04-28", paid_by: "committee" },
    { expense_id: 5, category: "water", description: "Water pump motor replacement", total_amount: 22000, payment_date: "2026-04-20", paid_by: "committee" },
    // March
    { expense_id: 6, category: "electricity", description: "Street light repair - Block E", total_amount: 9500, payment_date: "2026-03-12", paid_by: "committee" },
    { expense_id: 7, category: "maintenance", description: "Drain cleaning all blocks", total_amount: 15000, payment_date: "2026-03-18", paid_by: "committee" },
    // Feb - event heavy
    { expense_id: 8, category: "event", description: "Eid Reunion event cost", total_amount: 28000, payment_date: "2026-02-10", paid_by: "fund" },
    { expense_id: 9, category: "gas", description: "Community kitchen gas bill", total_amount: 4500, payment_date: "2026-02-20", paid_by: "committee" },
    // Jan
    { expense_id: 10, category: "electricity", description: "Electricity bill - Jan", total_amount: 11000, payment_date: "2026-01-15", paid_by: "committee" },
    // Dec
    { expense_id: 11, category: "maintenance", description: "Boundary wall painting", total_amount: 45000, payment_date: "2025-12-22", paid_by: "committee" },
    { expense_id: 12, category: "security", description: "Guard uniform purchase", total_amount: 12000, payment_date: "2025-12-05", paid_by: "committee" },
  ];
  const dummyContributions = [
    { contribution_id: 1, title: "Ramadan Fund 2026", target_amount: 100000, collected_amount: 72000, status: "active" },
    { contribution_id: 2, title: "Eid Decoration", target_amount: 30000, collected_amount: 30000, status: "completed" },
    { contribution_id: 3, title: "Road Development Fund", target_amount: 500000, collected_amount: 185000, status: "active" },
    { contribution_id: 4, title: "Mosque Renovation", target_amount: 200000, collected_amount: 200000, status: "completed" },
    { contribution_id: 5, title: "Community Hall Construction", target_amount: 800000, collected_amount: 95000, status: "active" },
  ];
  const dummyPayroll = [
    { payment_id: 1, assignment: { staff: { name: "Abdul Karim" }, role: "guard" }, total_paid: 12000, month: "2026-05-01", status: "paid" },
    { payment_id: 2, assignment: { staff: { name: "Imam Hafiz" }, role: "imam" }, total_paid: 18000, month: "2026-05-01", status: "paid" },
    { payment_id: 3, assignment: { staff: { name: "Rina Begum" }, role: "cleaner" }, total_paid: 8000, month: "2026-05-01", status: "pending" },
    { payment_id: 4, assignment: { staff: { name: "Jamal Uddin" }, role: "guard" }, total_paid: 12000, month: "2026-05-01", status: "paid" },
    { payment_id: 5, assignment: { staff: { name: "Abdul Karim" }, role: "guard" }, total_paid: 12000, month: "2026-04-01", status: "paid" },
    { payment_id: 6, assignment: { staff: { name: "Imam Hafiz" }, role: "imam" }, total_paid: 18000, month: "2026-04-01", status: "paid" },
    { payment_id: 7, assignment: { staff: { name: "Rina Begum" }, role: "cleaner" }, total_paid: 8000, month: "2026-04-01", status: "paid" },
    { payment_id: 8, assignment: { staff: { name: "Mokhles Mia" }, role: "gardener" }, total_paid: 7000, month: "2026-03-01", status: "paid" },
  ];

  const fees = feesRaw.length > 0 ? feesRaw : dummyFees;
  const expenses = expensesRaw.length > 0 ? expensesRaw : dummyExpenses;
  const payrollFinal = payrollPayments.length > 0 ? payrollPayments : dummyPayroll;
  const contributionsFinal = contributionsRaw.length > 0 ? contributionsRaw : dummyContributions;

  if (summaryLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <CircularProgress color="secondary" size={60} thickness={5} />
      </div>
    );
  }

  const tabs = [
    { id: "fees", label: "Fees", count: fees.length },
    { id: "expenses", label: "Expenses", count: expenses.length },
    { id: "payroll", label: "Payroll", count: payrollFinal.length },
    { id: "contributions", label: "Contributions", count: contributionsFinal.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">{t("sidebar.finances")}</h1>

      {/* Chart + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <MonthlyComparisonChart fees={fees} expenses={expenses} />
        </div>
        <div className="lg:col-span-2">
          <QuickStatsCard fees={fees} expenses={expenses} />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "text-emerald-700 bg-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
              }`}
            >
              {/* Active indicator bar */}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-600 rounded-t-full" />
              )}
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-[11px] font-bold min-w-[20px] text-center px-1.5 py-0.5 rounded-md ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "fees" && <FeesTab fees={fees} isLoading={feesLoading} />}
        {activeTab === "expenses" && <ExpensesTab expenses={expenses} isLoading={expensesLoading} />}
        {activeTab === "payroll" && <PayrollTab payments={payrollFinal} isLoading={payrollLoading} />}
        {activeTab === "contributions" && <ContributionsTab contributions={contributionsFinal} isLoading={contribLoading} />}
      </div>
    </div>
  );
};

export default Finances;
