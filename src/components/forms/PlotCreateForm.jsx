import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreatePlotMutation, useUpdatePlotMutation } from "../../features/api/plotApi";

const PlotForm = ({ onClose, mode = "create", initialData = {} }) => {
  const [formData, setFormData] = useState({
    plot_no: "",
    owner_name: "",
    size: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [createPlot, { isLoading: isCreating }] = useCreatePlotMutation();
  const [updatePlot, { isLoading: isUpdating }] = useUpdatePlotMutation();

  // pre-fill data in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        plot_no: initialData.plot_no || "",
        owner_name: initialData.owner_name || "",
        size: initialData.size !== undefined && initialData.size !== null ? String(initialData.size) : "",
      });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";

    if (name === "plot_no") {
      const pattern = /^[A-Z]-\d{3}$/;
      if (value && !pattern.test(value)) {
        errorMsg = "Format must be A-000 (e.g., B-300)";
      }
    }

    if (name === "size") {
      const pattern = /^\d*\.?\d+$/;
      if (!pattern.test(value) || parseFloat(value) <= 0) {
        errorMsg = "Size must be a positive numeric value.";
      }
    }

    setFormErrors((prev) => ({ ...prev, [name]: errorMsg }));
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(formErrors).some((msg) => msg);
    if (hasErrors) {
      toast.error("Please fix form errors before submitting.");
      return;
    }

    // Prepare payload with correct types
    const payload = {
      ...formData,
      size: parseFloat(formData.size),
    };

    try {
      if (mode === "edit") {
        await updatePlot({ id: initialData.id, ...formData }).unwrap();
        toast.success("Plot Updated Successfully!");
      } else {
        await createPlot(formData).unwrap();
        toast.success("Plot Created Successfully!");
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${mode === "edit" ? "update" : "create"} plot.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
  {["plot_no", "owner_name", "size"].map((field) => (
    <div key={field}>
      <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
        {field.replace("_", " ")}
      </label>
      <input
        type={field === "size" ? "number" : "text"} // <-- conditionally set type
        step={field === "size" ? "0.01" : undefined} // optional for decimals
        min={field === "size" ? "0" : undefined} // optional for positive numbers only
        name={field}
        value={formData[field]}
        onChange={handleChange}
        required
        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none ${
          formErrors[field]
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-[#3B82F6]"
        }`}
      />
      {formErrors[field] && (
        <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
      )}
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
      disabled={isCreating || isUpdating}
      className="px-4 py-2 rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
    >
      {isCreating || isUpdating
        ? `${mode === "edit" ? "Updating..." : "Creating..."}`
        : mode === "edit"
        ? "Update Plot"
        : "Create Plot"}
    </button>
  </div>
</form>

  );
};

export default PlotForm;
