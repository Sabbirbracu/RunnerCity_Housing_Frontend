import { Building2, Globe, Key, Lock, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProfileTab from "./tabs/ProfileTab";
import PasswordTab from "./tabs/PasswordTab";
import LanguageTab from "./tabs/LanguageTab";
import NotificationsTab from "./tabs/NotificationsTab";
import CommunityTab from "./tabs/CommunityTab";

const Settings = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: t("settings.tabs.profile"), icon: User },
    { id: "password", label: t("settings.tabs.password"), icon: Lock },
    { id: "language", label: t("settings.tabs.language"), icon: Globe },
    { id: "notifications", label: t("settings.tabs.notifications"), icon: Key },
    ...(isAdmin ? [{ id: "community", label: t("settings.tabs.community"), icon: Building2 }] : []),
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user} />;
      case "password":
        return <PasswordTab />;
      case "language":
        return <LanguageTab />;
      case "notifications":
        return <NotificationsTab userId={user?.user_id} />;
      case "community":
        return isAdmin ? <CommunityTab /> : null;
      default:
        return <ProfileTab user={user} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">{t("settings.title")}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="md:w-56 flex-shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
