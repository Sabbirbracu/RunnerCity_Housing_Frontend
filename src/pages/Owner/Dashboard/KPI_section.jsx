import { DollarSign, HousePlus, TrendingUp } from "lucide-react";
import { KPIWidget } from "../../../components/admin/KPIWidget";
import { FeeCard } from "./Fee_Card"; 

export const KPI_Cards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* 1️⃣ Outstanding Fees Card (Custom FeeCard) */}
      <FeeCard />

      {/* 2️⃣ Total Collected Fees */}
      <KPIWidget
        title="My Contributions YTD"
        value="৳ 56,200"
        change="+8.3%"
        icon={DollarSign}
        color="#3B82F6" // Blue Theme
      />

      {/* 3️⃣ Total Expenses */}
      <KPIWidget
        title="RCHMS Community Funds"
        value="৳ 32,850"
        change="-2.1%"
        icon={TrendingUp}
        color="#F59E0B" // Orange Theme
      />

      {/* 4️⃣ Net Balance */}
      <KPIWidget
        title="Mosque Fund Balance"
        value="৳ 23,350"
        change="+5.4%"
        icon={HousePlus}
        color="#10B981" // Green Theme
      />
    </div>
  );
};
