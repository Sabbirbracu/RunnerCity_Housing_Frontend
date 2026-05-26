import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  useGetUserPreferencesQuery,
  useUpdateUserPreferencesMutation,
} from "../../../features/api/settingsApi";

const ToggleSwitch = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
    </div>
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        enabled ? "bg-emerald-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

const NotificationsTab = ({ userId }) => {
  const { t } = useTranslation();
  const { data: prefs, isLoading } = useGetUserPreferencesQuery(userId, { skip: !userId });
  const [updatePrefs, { isLoading: isSaving }] = useUpdateUserPreferencesMutation();

  const [form, setForm] = useState(null);

  if (prefs && !form) {
    setForm({
      email_fees: prefs.email_fees ?? true,
      email_notices: prefs.email_notices ?? true,
      email_events: prefs.email_events ?? true,
      sms_fees: prefs.sms_fees ?? false,
      sms_notices: prefs.sms_notices ?? false,
      sms_events: prefs.sms_events ?? false,
    });
  }

  const handleToggle = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form) return;
    try {
      await updatePrefs({ userId, ...form }).unwrap();
      toast.success(t("settings.notifications.success"));
    } catch (err) {
      toast.error(err?.data?.message || t("settings.notifications.failed"));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{t("settings.notifications.title")}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  const currentForm = form || {
    email_fees: true, email_notices: true, email_events: true,
    sms_fees: false, sms_notices: false, sms_events: false,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{t("settings.notifications.title")}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{t("settings.notifications.subtitle")}</p>
      </div>

      {/* Email */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t("settings.notifications.email")}</p>
        <div className="bg-gray-50 rounded-xl p-4 divide-y divide-gray-100">
          <ToggleSwitch
            label={t("settings.notifications.feeReminders")}
            description={t("settings.notifications.feeRemindersDesc")}
            enabled={currentForm.email_fees}
            onChange={(v) => handleToggle("email_fees", v)}
          />
          <ToggleSwitch
            label={t("settings.notifications.notices")}
            description={t("settings.notifications.noticesDesc")}
            enabled={currentForm.email_notices}
            onChange={(v) => handleToggle("email_notices", v)}
          />
          <ToggleSwitch
            label={t("settings.notifications.events")}
            description={t("settings.notifications.eventsDesc")}
            enabled={currentForm.email_events}
            onChange={(v) => handleToggle("email_events", v)}
          />
        </div>
      </div>

      {/* SMS */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t("settings.notifications.sms")}</p>
        <div className="bg-gray-50 rounded-xl p-4 divide-y divide-gray-100">
          <ToggleSwitch
            label={t("settings.notifications.smsFees")}
            description={t("settings.notifications.smsFeesDesc")}
            enabled={currentForm.sms_fees}
            onChange={(v) => handleToggle("sms_fees", v)}
          />
          <ToggleSwitch
            label={t("settings.notifications.smsNotices")}
            description={t("settings.notifications.smsNoticesDesc")}
            enabled={currentForm.sms_notices}
            onChange={(v) => handleToggle("sms_notices", v)}
          />
          <ToggleSwitch
            label={t("settings.notifications.smsEvents")}
            description={t("settings.notifications.smsEventsDesc")}
            enabled={currentForm.sms_events}
            onChange={(v) => handleToggle("sms_events", v)}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold
          hover:bg-emerald-700 transition-all shadow-sm disabled:opacity-60"
      >
        {isSaving ? t("settings.notifications.saving") : t("settings.notifications.save")}
      </button>
    </div>
  );
};

export default NotificationsTab;
