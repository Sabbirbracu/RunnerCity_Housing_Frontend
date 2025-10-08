// src/pages/Admin/PlotInfo/PlotInfoTop.jsx
import { Home, MapPin, Users } from "lucide-react";
import { KPIWidget } from "../../../components/admin/KPIWidget"; // Adjust path if different

const PlotInfoTop = ({ plots }) => {
  const total = plots.length;
  const assigned = plots.filter((p) => p.is_assigned).length;
  const unassigned = total - assigned;

  // --- Basic Percentage Change Logic (for future analytics) ---
  const assignedPercent =
    total > 0 ? ((assigned / total) * 100).toFixed(1) + "%" : "0%";
  const unassignedPercent =
    total > 0 ? ((unassigned / total) * 100).toFixed(1) + "%" : "0%";

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Total Plots */}
      <KPIWidget
        title="Total Plots"
        value={total}
        change={`+${assignedPercent}`} // arbitrary growth display
        icon={Home}
        color="#3B82F6" // Blue
      />

      {/* Assigned Plots */}
      <KPIWidget
        title="Assigned Plots"
        value={assigned}
        change={`+${assignedPercent}`}
        icon={Users}
        color="#10B981" // Green
      />

      {/* Unassigned Plots */}
      <KPIWidget
        title="Unassigned Plots"
        value={unassigned}
        change={`-${unassignedPercent}`}
        icon={MapPin}
        color="#F59E0B" // Yellow
      />
    </div>
  );
};

export default PlotInfoTop;
