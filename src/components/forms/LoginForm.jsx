import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/api/authApi";
import { setCredentials } from "../../features/auth/authSlice";

export const LoginForm = ({ onSwitch }) => {
  const { t } = useTranslation();
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
      toast.success(t("login.loginSuccess"));

      // Redirect based on role
      if (res.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (res.user.role === "full_owner" || res.user.role === "flat_owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      const backendMsg = err?.data?.message || "";
      const backendStatus = err?.data?.status || "";
      const backendReason = err?.data?.reason || "";

      // Map backend English messages to i18n keys
      const messageMap = {
        "Your account is pending admin approval.": t("login.statusPending"),
        "Your account has been suspended.": t("login.statusSuspended"),
        "Your account is inactive.": t("login.statusInactive"),
        "This account is no longer active.": t("login.statusDeceased"),
        "User not found.": t("login.userNotFound"),
        "Invalid credentials.": t("login.invalidCredentials"),
      };

      let localizedMsg;

      // Special handling for rejected — include reason
      if (backendStatus === "rejected" || backendMsg.includes("rejected")) {
        localizedMsg = t("login.statusRejected");
        if (backendReason) {
          localizedMsg += `\n${t("login.rejectionReason")}: ${backendReason}`;
        }
      } else {
        localizedMsg = messageMap[backendMsg] || backendMsg || t("login.loginFailed");
      }

      toast.error(localizedMsg, { duration: 40000 });
    }
  };

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {t("login.welcomeBack")}
        </h2>
        <p className="text-gray-500 text-sm">
          {t("login.subtitle")}
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("login.emailLabel")}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder={t("login.emailPlaceholder")}
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
            {t("login.passwordLabel")}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder={t("login.passwordPlaceholder")}
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
          {isLoading ? t("login.signingIn") : t("login.signIn")}
        </button>
      </form>

      {/* Bottom Links */}
      <div className="flex justify-center items-center gap-6 text-sm mt-4">
        <button
          onClick={() => onSwitch("forgot")}
          className="text-emerald-600 font-medium hover:underline"
        >
          {t("login.forgotPassword")}
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => onSwitch("signup")}
          className="text-emerald-600 font-medium hover:underline"
        >
          {t("login.createAccount")}
        </button>
      </div>
    </div>
  );
};
