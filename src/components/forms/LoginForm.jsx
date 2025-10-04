import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast"; // <-- import toast
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/api/authApi";
import { setCredentials } from "../../features/auth/authSlice";

export const LoginForm = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      // Store token and user info in Redux
      dispatch(setCredentials({ token: res.token, user: res.user }));

      // Show success toast
      toast.success("Login successful!");

      // Redirect based on role
      if (res.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);

      // Show error toast
      toast.error(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-sm">
          Sign in to continue to your dashboard
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                outline-none transition-all text-gray-900 hover:shadow-md"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                outline-none transition-all text-gray-900 hover:shadow-md"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 
            text-white font-semibold hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-60"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Bottom Links */}
      <div className="flex justify-center items-center gap-6 text-sm mt-4">
        <button
          onClick={() => onSwitch("forgot")}
          className="text-emerald-600 font-medium hover:underline"
        >
          Forgot password?
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => onSwitch("signup")}
          className="text-emerald-600 font-medium hover:underline"
        >
          Create account
        </button>
      </div>
    </div>
  );
};
