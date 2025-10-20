import { FaRegCalendarAlt, FaTint, FaTools } from 'react-icons/fa';
import CustomTable from "../../components/ui/CustomTable";
import { DynamicAnnouncementBar } from './Dashboard/AnnouncementBar';
import { KPI_Cards } from "./Dashboard/KPI_section";
import { NormalCard } from "./Dashboard/NormalCard";
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

  // Announcement Data
  const announcementMessage = (
    <>
      <span className="text-white">New Campaign:</span> Road Repair Fund is 
      <span className="text-green-400"> 75% funded.</span>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ========== Row 1: Redesigned Dynamic Announcement Bar ========== */}
      <DynamicAnnouncementBar 
        message={announcementMessage}
        ctaText="Contribute Now"
        ctaLink="#"
      />

      {/* ========== Row 2: KPI Cards (Modular Component) ========== */}
      <KPI_Cards />

      {/* ========== Rows 3 + 4 Combined Grid ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mt-6">

        <div className="lg:col-span-3 space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"> {/* Increased gap for better separation */}
            
            {/* 1. Upcoming Events */}
            <NormalCard 
              title="Upcoming Event" 
              content="Football Tournament" 
              subContent="Registration closes next week"
              button_txt="Register Now"
              icon={FaRegCalendarAlt}
              iconBgColor="bg-teal-100" // Use your primary accent color
              iconTextColor="text-teal-600"
            />

            {/* 3. Maintenance Status */}
            <NormalCard 
              title="Maintenance" 
              content="Street Lights: 1 Reported"
              subContent="Last update: Oct 20"
              button_txt="View Reports"
              icon={FaTools}
              iconBgColor="bg-blue-100" 
              iconTextColor="text-blue-600"
            />
            
            {/* 4. Blood Status Card */}
            <NormalCard 
              title="Blood Donation" 
              content="Emergency Need (A+)" 
              subContent="1 new request nearby"
              button_txt="Donate Now"
              icon={FaTint}
              iconBgColor="bg-red-100" 
              iconTextColor="text-red-600"
            />
          </div>

          {/* Row 4 – Recent Transactions Table */}
          <div className="bg-white p-6 rounded-2xl shadow-lg"> {/* Added background and shadow to match card style */}
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
        <div className="lg:col-span-1">
          <PrayerCard />
        </div>
      </div>
    </div>
  );
};