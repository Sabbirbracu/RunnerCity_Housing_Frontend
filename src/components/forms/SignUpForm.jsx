import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../../features/api/authApi";
import { setCredentials } from "../../features/auth/authSlice";

export const SignupForm = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const [signup, { isLoading, error }] = useSignupMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plot_no: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form).unwrap();
      console.log("Signup success:", res);

      // Store token/user in Redux slice if backend returns token
      dispatch(setCredentials({ user: res.user }));

      // Optionally switch to login or close modal
      // onSwitch("login");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Create Account 🚀
        </h2>
        <p className="text-gray-500 text-sm">
          Join our community and claim your plot
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
              outline-none transition-all text-gray-900 hover:shadow-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
              outline-none transition-all text-gray-900 hover:shadow-md"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+8801XXXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
              outline-none transition-all text-gray-900 hover:shadow-md"
          />
        </div>

        {/* Plot Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plot Number
          </label>
          <input
            type="text"
            name="plot_no"
            placeholder="e.g., P-101"
            value={form.plot_no}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
              outline-none transition-all text-gray-900 hover:shadow-md"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
              outline-none transition-all text-gray-900 hover:shadow-md"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-1">
            {error.data?.message || "Signup failed. Please check your input."}
          </p>
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
