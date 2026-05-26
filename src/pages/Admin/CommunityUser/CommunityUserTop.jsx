// src/pages/Admin/CommunityUserTop.jsx
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { KPIWidget } from "../../../components/admin/KPIWidget";

const CommunityUserTop = ({ users }) => {
  const { t } = useTranslation();
  const totalUsers = users.filter((u) => u.status === "approved").length;
  const pendingApprovals = users.filter((u) => u.status === "pending").length;
  const committeeMembers = users.filter((u) => u.role === "committee").length;
  const rejectedUsers = users.filter((u) => u.status === "rejected").length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      <KPIWidget title={t("users.totalRegistered")} value={totalUsers} change="+5%" icon={Users} color="#3B82F6" />
      <KPIWidget title={t("users.pendingApprovals")} value={pendingApprovals} change="-2%" icon={Users} color="#F59E0B" />
      <KPIWidget title={t("users.committeeMembers")} value={committeeMembers} change="+1%" icon={Users} color="#10B981" />
      <KPIWidget title={t("users.rejectedUsers")} value={rejectedUsers} change="0%" icon={Users} color="#EF4444" />
    </div>
  );
};

export default CommunityUserTop;
