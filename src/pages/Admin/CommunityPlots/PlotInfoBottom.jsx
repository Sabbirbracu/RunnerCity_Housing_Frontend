// src/pages/Admin/PlotInfo/PlotInfoBottom.jsx
import { Pencil, Trash2 } from "lucide-react";
import CustomTable from "../../../components/ui/CustomTable";

const PlotInfoBottom = ({ plots, isLoading, handleDelete, handleEdit }) => {
  // Define table columns
  const columns = [
    { header: "Plot No", accessor: "plot_no" },
    { header: "Owner Name", accessor: "owner_name" },
    {
      header: "Assigned",
      accessor: "is_assigned",
      render: (plot) =>
        plot.is_assigned ? (
          <span className="text-green-600 font-medium">Yes</span>
        ) : (
          <span className="text-yellow-600 font-medium">No</span>
        ),
    },
    {
      header: "Assigned To",
      accessor: "assignedUser",
      render: (plot) =>
        plot.assignedUser?.name || (
          <span className="text-gray-400 font-medium">—</span>
        ),
    },
    {
      header: "Actions",
      accessor: "actions",
      headerClassName: "text-center",
      render: (plot) => (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleEdit(plot)}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDelete(plot.plot_no)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6">
      <CustomTable
        columns={columns}
        data={plots}
        isLoading={isLoading}
        emptyMessage="No plot records found 😔"
      />
    </div>
  );
};

export default PlotInfoBottom;
