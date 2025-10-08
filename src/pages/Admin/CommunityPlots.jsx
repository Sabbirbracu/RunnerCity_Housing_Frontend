import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useSelector } from "react-redux";
import PermissionModal from "../../components/modal/PermissionModal";
import {
    useCreatePlotMutation,
    useDeletePlotMutation,
    useGetPlotsQuery,
} from "../../features/api/plotApi";
import PlotInfoBottom from "./CommunityPlots/PlotInfoBottom";
import PlotInfoMiddle from "./CommunityPlots/PlotInfoMiddle";
import PlotInfoTop from "./CommunityPlots/PlotInfoTop";

const CommunityPlots = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState("");
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data: plots = [], isLoading, isError, error } = useGetPlotsQuery();
  const [createPlot] = useCreatePlotMutation();
  const [deletePlot] = useDeletePlotMutation();

  // --- Loading State ---
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <CircularProgress color="secondary" size={60} />
      </div>
    );

  // --- Error State ---
  if (isError)
    return (
      <div className="flex items-center justify-center h-[70vh] text-red-500 text-lg font-medium">
        Failed to load plots. {error?.status && `Status: ${error.status}`}
      </div>
    );

  // --- Filtered Search ---
  const filteredPlots = plots.filter(
    (p) =>
      p.plot_no.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.owner_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // --- Delete Logic ---
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
      console.error("Failed to delete plot:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Summary Section */}
      <PlotInfoTop plots={plots} />

      {/* Search / Filter Section */}
      <PlotInfoMiddle setSearchValue={setSearchValue} />

      {/* Table / Data Section */}
      <PlotInfoBottom
        plots={filteredPlots}
        currentUser={currentUser}
        handleDelete={handleDeleteClick}
        handleEdit={(plot) => console.log("Edit Plot:", plot)}
      />

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <PermissionModal
          title="Delete Plot"
          message={`Are you sure you want to delete plot #${selectedPlot?.plot_no}? This action cannot be undone.`}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default CommunityPlots;
