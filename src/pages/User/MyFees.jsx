import { CheckCircle, Clock, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CustomTable from "../../components/ui/CustomTable";

// Dummy data — replace with useGetMyFeesQuery when API is wired
const dummyFees = [
  { fee_id: 1, amount_due: 3500, month: "2026-05-01", status: "unpaid", feePayments: [] },
  { fee_id: 2, amount_due: 3500, month: "2026-04-01", status: "paid", feePayments: [{ payment_date: "2026-04-05", payment_method: "bKash" }] },
  { fee_id: 3, amount_due: 3500, month: "2026-03-01", status: "paid", feePayments: [{ payment_date: "2026-03-08", payment_method: "cash" }] },
  { fee_id: 4, amount_due: 3500, month: "2026-02-01", status: "paid", feePayments: [{ payment_date: "2026-02-10", payment_method: "Nagad" }] },
  { fee_id: 5, amount_due: 3500, month: "2026-01-01", status: "paid", feePayments: [{ payment_date: "2026-01-12", payment_method: "bKash" }] },
  { fee_id: 6, amount_due: 3500, month: "2025-12-01", status: "paid", feePayments: [{ payment_date: "2025-12-07", payment_method: "cash" }] },
];

const MyFees = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  const fees = dummyFees; // Replace with API data
  const totalPaid = fees.filter((f) => f.status === "paid").reduce((s, f) => s + Number(f.amount_due), 0);
  const totalDue = fees.filter((f) => f.status !== "paid").reduce((s, f) => s + Number(f.amount_due), 0);

  const columns = [
    {
      header: "Month",
      accessor: "month",
      headerClassName: "font-bold",
      cellClassName: "font-medium text-gray-900",
      render: (row) => new Date(row.month).toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    },
    {
      header: "Amount",
      accessor: "amount_due",
      headerClassName: "font-bold",
      cellClassName: "font-bold text-gray-900",
      render: (row) => `৳${Number(row.amount_due).toLocaleString()}`,
    },
    {
      header: "Status",
      accessor: "status",
      headerClassName: "font-bold",
      render: (row) => {
        const colors = { paid: "bg-emerald-50 text-emerald-700 ring-emerald-200", unpaid: "bg-red-50 text-red-700 ring-red-200", partial: "bg-amber-50 text-amber-700 ring-amber-200" };
        return <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full ring-1 ring-inset capitalize ${colors[row.status] || "bg-gray-100 text-gray-600"}`}>{row.status}</span>;
      },
    },
    {
      header: "Paid On",
      accessor: "paid_on",
      headerClassName: "font-bold",
      cellClassName: "text-gray-600",
      render: (row) => row.feePayments?.[0]?.payment_date ? new Date(row.feePayments[0].payment_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—",
    },
    {
      header: "Method",
      accessor: "method",
      headerClassName: "font-bold",
      cellClassName: "text-gray-600 capitalize",
      render: (row) => row.feePayments?.[0]?.payment_method || "—",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">{t("sidebar.myFees")}</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Paid</p>
            <p className="text-lg font-bold text-gray-900">৳{totalPaid.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Due Amount</p>
            <p className="text-lg font-bold text-red-600">৳{totalDue.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 col-span-2 md:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Plot</p>
            <p className="text-lg font-bold text-gray-900">{user?.plot_no || "—"}</p>
          </div>
        </div>
      </div>

      {/* Fees Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <CustomTable columns={columns} data={fees} emptyMessage="No fee records found" />
      </div>
    </div>
  );
};

export default MyFees;
