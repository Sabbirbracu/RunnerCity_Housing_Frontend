import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useChangePasswordMutation } from "../../../features/api/settingsApi";

const PasswordTab = () => {
  const { t } = useTranslation();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 8) {
      toast.error(t("settings.password.tooShort"));
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error(t("settings.password.mismatch"));
      return;
    }
    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }).unwrap();
      toast.success(t("settings.password.success"));
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err?.data?.message || t("settings.password.failed"));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{t("settings.password.title")}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{t("settings.password.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.password.currentLabel")}</label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.password.newLabel")}</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">{t("settings.password.minLength")}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.password.confirmLabel")}</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold
            hover:bg-emerald-700 transition-all shadow-sm disabled:opacity-60"
        >
          {isLoading ? t("settings.password.saving") : t("settings.password.save")}
        </button>
      </form>
    </div>
  );
};

export default PasswordTab;
