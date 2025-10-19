import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "../../../components/modal/modal";
import CustomTable from "../../../components/ui/CustomTable";

const PlotInfoBottom = ({ plots, isLoading, handleDelete, handleEdit }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);

  /**
   * Handles edit action
   * Triggers parent callback if provided
   */
  const openEditModal = (plot) => {
    setSelectedPlot(plot);
    setIsEditOpen(true);

    // Notify parent (for external modal handling)
    if (handleEdit) handleEdit(plot);
  };

  /**
   * Table column configuration
   */
  const columns = [
    { header: "Plot No", accessor: "plot_no" },
    { header: "Owner Name", accessor: "owner_name" },
    { header: "Plot Size(dcimal)", accessor: "size" },
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
        plot.assignedUser?.name ? (
          <span className="text-gray-800 font-medium">
            {plot.assignedUser.name}
          </span>
        ) : (
          <span className="text-gray-400 font-medium">—</span>
        ),
    },
    {
      header: "Actions",
      accessor: "actions",
      headerClassName: "text-center",
      render: (plot) => (
        <div className="flex items-center justify-center gap-3">
          {/* Edit Button */}
          <button
            onClick={() => openEditModal(plot)}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            title="Edit Plot"
          >
            <Pencil size={18} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(plot)}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Delete Plot"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  /**
   * Render
   */
  return (
    <div className="mt-6">
      <CustomTable
        columns={columns}
        data={plots}
        isLoading={isLoading}
        emptyMessage="No plot records found 😔"
      />

      {/* Optional Inline Edit Modal */}
      {isEditOpen && !handleEdit && (
        <Modal
          title={`Edit Plot - ${selectedPlot?.plot_no || ""}`}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        >
          <div className="p-4 text-gray-700">
            {/* Replace this section with <PlotForm mode="edit" initialData={selectedPlot} /> */}
            <p className="text-sm">
              <span className="font-medium text-gray-800">
                Inline Edit Placeholder
              </span>
              <br />
              You can pass <code>selectedPlot</code> data here for inline editing,
              or let the parent handle the modal externally via <code>handleEdit()</code>.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PlotInfoBottom;
