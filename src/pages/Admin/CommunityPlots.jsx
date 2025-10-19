import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "../../components/modal/modal";
import PermissionModal from "../../components/modal/PermissionModal";
import PlotInfoBottom from "./CommunityPlots/PlotInfoBottom";
import PlotInfoMiddle from "./CommunityPlots/PlotInfoMiddle";
import PlotInfoTop from "./CommunityPlots/PlotInfoTop";

import PlotForm from "../../components/forms/PlotCreateForm";
import { useDeletePlotMutation, useGetPlotsQuery } from "../../features/api/plotApi";

const CommunityPlots = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  // 🔹 Local State
  const [searchValue, setSearchValue] = useState("");
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // 🔹 API Hooks
  const { data: plots = [], isLoading, isError, error } = useGetPlotsQuery();
  const [deletePlot] = useDeletePlotMutation();

  // ===============================
  // 🔸 Loading & Error
  // ===============================
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <CircularProgress color="secondary" size={60} />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-[70vh] text-red-500 text-lg font-medium">
        Failed to load plots. {error?.status && `Status: ${error.status}`}
      </div>
    );

  // ===============================
  // 🔸 Filtered Plots
  // ===============================
  const filteredPlots = plots.filter(
    (p) =>
      p.plot_no.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.owner_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // ===============================
  // 🔸 Delete Handlers
  // ===============================
  const handleDeleteClick = (plot) => {
    setSelectedPlot(plot);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPlot) return;
    try {
      await deletePlot(selectedPlot.plot_no).unwrap();
      setIsConfirmOpen(false);
      setSelectedPlot(null);
    } catch (err) {
      console.error("❌ Failed to delete plot:", err);
    }
  };

  // ===============================
  // 🔸 Edit Handler
  // ===============================
  const handleEditClick = (plot) => {
    setSelectedPlot(plot);
    console.log("Editing plot:", plot);
    setIsEditOpen(true);
  };

  // ===============================
  // 🔸 Render
  // ===============================
  return (
    <div className="space-y-6">
      {/* Top / Summary */}
      <PlotInfoTop plots={plots} />

      {/* Search / Filter */}
      <PlotInfoMiddle setSearchValue={setSearchValue} />

      {/* Data Table */}
      <PlotInfoBottom
        plots={filteredPlots}
        currentUser={currentUser}
        handleDelete={handleDeleteClick}
        handleEdit={handleEditClick} // triggers Modal + PlotForm
      />

      {/* Delete Confirmation Modal */}
      {isConfirmOpen && (
        <PermissionModal
          title="Delete Plot"
          message={`Are you sure you want to delete plot "${selectedPlot?.plot_no}"? This action cannot be undone.`}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={confirmDelete}
        />
      )}

      {/* Edit Modal with Form */}
      {isEditOpen && selectedPlot && (
        <Modal
          title={`Edit Plot - ${selectedPlot.plot_no}`}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        >
          <div className="p-4">
            <PlotForm
              mode="edit"
              initialData={selectedPlot}
              onClose={() => setIsEditOpen(false)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommunityPlots;
