import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  useGetCommunitySettingsQuery,
  useUpdateCommunitySettingsMutation,
} from "../../../features/api/settingsApi";

const CommunityTab = () => {
  const { t } = useTranslation();
  const { data: settings, isLoading } = useGetCommunitySettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateCommunitySettingsMutation();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (settings) {
      setForm({
        name: settings.name || "",
        address: settings.address || "",
        phone: settings.phone || "",
        email: settings.email || "",
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(form).unwrap();
      toast.success(t("settings.community.success"));
    } catch (err) {
      toast.error(err?.data?.message || t("settings.community.failed"));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{t("settings.community.title")}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{t("settings.community.title")}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{t("settings.community.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.community.nameLabel")}</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("settings.community.namePlaceholder")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.community.addressLabel")}</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder={t("settings.community.addressPlaceholder")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.community.phoneLabel")}</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={t("settings.community.phonePlaceholder")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.community.emailLabel")}</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("settings.community.emailPlaceholder")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold
            hover:bg-emerald-700 transition-all shadow-sm disabled:opacity-60"
        >
          {isSaving ? t("settings.community.saving") : t("settings.community.save")}
        </button>
      </form>
    </div>
  );
};

export default CommunityTab;
