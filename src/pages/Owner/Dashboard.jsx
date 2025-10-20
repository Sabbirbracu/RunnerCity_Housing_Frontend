import CustomTable from "../../components/ui/CustomTable";
import { KPI_Cards } from "./Dashboard/KPI_section";
import { PrayerCard } from "./Dashboard/Prayer_card";

export const Dashboard = () => {
  // Table Schema
  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Description", accessor: "description" },
    { header: "Amount", accessor: "amount" },
    { header: "Status", accessor: "status" },
  ];

  // Table Data
  const data = [
    {
      id: 1,
      date: "Oct 1, 2024",
      description: "Road Repair Fund",
      amount: "৳2,500",
      status: (
        <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-xs">
          Paid
        </span>
      ),
    },
    {
      id: 2,
      date: "Sep 10, 2024",
      description: "Community Event",
      amount: "৳1,000",
      status: (
        <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-xs">
          Paid
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== Row 1: Announcement Bar ========== */}
      <div className="rounded-xl bg-green-50 px-5 py-3 text-center font-semibold text-green-800 mb-6">
        Current Campaign:{" "}
        <span className="text-green-900">Road Repair Fund</span> is 75% funded.{" "}
        <a
          href="#"
          className="underline text-green-700 hover:text-green-900 transition-colors"
        >
          Click to Contribute
        </a>
      </div>

      {/* ========== Row 2: KPI Cards (Modular Component) ========== */}
      <KPI_Cards />

      {/* ========== Rows 3 + 4 Combined Grid ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mt-6">
        {/* ===== Left 4 Columns ===== */}
        <div className="lg:col-span-4 space-y-5">
          {/* Row 3 – Community Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition-shadow">
              <h3 className="text-gray-500 text-sm mb-1">Upcoming Events</h3>
              <p className="text-gray-800 font-semibold">
                Football Tournament — Nov 1
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition-shadow">
              <h3 className="text-gray-500 text-sm mb-1">Active Campaigns</h3>
              <p className="text-gray-800 font-semibold">
                Vote: Security Cameras
              </p>
              <p className="text-xs text-gray-500">Deadline: Oct 31</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition-shadow">
              <h3 className="text-gray-500 text-sm mb-1">Maintenance Status</h3>
              <p className="text-gray-800 font-semibold">
                Street Lights: 1 Reported
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition-shadow">
              <h3 className="text-gray-500 text-sm mb-1">Community Notices</h3>
              <p className="text-gray-800 font-semibold">
                Blood Donation Drive – Oct 25
              </p>
            </div>
          </div>

          {/* Row 4 – Using CustomTable Component */}
          <div className="bg-transparent rounded-2xl">
            <h3 className="text-gray-700 text-lg font-semibold mb-4">
              Recent Transactions
            </h3>
            <CustomTable
              columns={columns}
              data={data}
              isLoading={false}
              emptyMessage="No transactions found"
            />
          </div>
        </div>

        {/* ===== Right Column: Prayer Card (Modularized) ===== */}
        <PrayerCard />
      </div>
    </div>
  );
};
