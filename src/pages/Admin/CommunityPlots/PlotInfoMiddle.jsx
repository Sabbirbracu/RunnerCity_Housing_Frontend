import { useState } from "react";
import PlotCreateForm from "../../../components/forms/PlotCreateForm"; // new form component
import { Modal } from "../../../components/modal/modal"; // your existing modal component
import Button  from "../../../components/ui/button"; // adjust this import if needed

const PlotInfoMiddle = ({ setSearchValue }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Plot No. or Owner Name..."
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition"
      />

      {/* Create Plot Button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium"
      >
        + Create Plot
      </Button>

      {/* Modal for Creating Plot */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Plot"
      >
        <PlotCreateForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default PlotInfoMiddle;
