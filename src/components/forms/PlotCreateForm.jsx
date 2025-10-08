import { useState } from "react";
import { useCreatePlotMutation } from "../../features/api/plotApi";

const PlotCreateForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    plot_no: "",
    owner_name: "",
    size: "",
    location: "",
  });

  const [createPlot, { isLoading }] = useCreatePlotMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlot(formData).unwrap();
      alert("✅ Plot created successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create plot.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["plot_no", "owner_name", "size", "location"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
            {field.replace("_", " ")}
          </label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3B82F6] outline-none"
          />
        </div>
      ))}

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
        >
          {isLoading ? "Creating..." : "Create Plot"}
        </button>
      </div>
    </form>
  );
};

export default PlotCreateForm;
