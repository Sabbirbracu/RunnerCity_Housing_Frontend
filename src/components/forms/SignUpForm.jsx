import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../features/api/authApi";
import { setCredentials } from "../../features/auth/authSlice";

export const SignupForm = ({ onSwitch, onSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plot_no: "",
    password: "",
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError(null); // clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form).unwrap(); // unwrapping RTK Query result
      dispatch(setCredentials({ user: res.user }));

      toast.success("Account created successfully! 🎉");

      if (onSuccess) onSuccess(); // parent can close modal
      navigate("/"); // redirect to home page
    } catch (err) {
      console.error("Signup error:", err);
      // RTK Query error might be nested differently
      const message =
        err?.data?.message || err?.error || "Signup failed. Please check your input.";
      setFormError(message);
      toast.error(message);
    }
  };

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Create Account 🚀
        </h2>
        <p className="text-gray-500 text-sm">Join our community and claim your plot</p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {[
          { label: "Full Name", name: "name", type: "text", placeholder: "Your Name" },
          { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com" },
          { label: "Phone Number", name: "phone", type: "tel", placeholder: "+8801XXXXXXXXX" },
          { label: "Plot Number", name: "plot_no", type: "text", placeholder: "e.g., P-101" },
          { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                outline-none transition-all text-gray-900 hover:shadow-md"
            />
          </div>
        ))}

        {/* Error */}
        {formError && (
          <p className="text-red-500 text-sm text-center mt-1">{formError}</p>
        )}

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 
            text-white font-semibold hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-60"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      {/* Bottom Link */}
      <div className="text-center text-sm mt-4">
        <span>Already have an account? </span>
        <button
          onClick={() => onSwitch("login")}
          className="text-emerald-600 font-medium hover:underline"
        >
          Login
        </button>
      </div>
    </div>
  );
};
