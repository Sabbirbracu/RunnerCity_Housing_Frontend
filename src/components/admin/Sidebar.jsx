import {
  BarChart3,
  Bell,
  ChevronDown,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [openSubmenu, setOpenSubmenu] = useState(null);

  // --- Main Menu ---
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin-dashboard",
    },
    { id: "finances", label: "Finances", icon: <CreditCard size={20} />, path: "/admin/finances" },
    { id: "payroll", label: "Payroll", icon: <Wallet size={20} />, path: "/admin/payroll" },
    { id: "community", label: "Community", icon: <Users size={20} />, hasSubmenu: true },
    { id: "security", label: "Security", icon: <ShieldCheck size={20} />, path: "/admin/security" },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} />, path: "/admin/analytics" },
  ];

  // --- Submenus (With Paths) ---
  const subMenuItems = {
    community: [
      { id: "community-users", label: "Users", path: "/community/users" },
      { id: "community-events", label: "Events & Campaigns", path: "/community/events" },
      { id: "community-funds", label: "Funds & Expenses", path: "/community/funds" },
      { id: "community-polls", label: "Polls & Voting", path: "/community/polls" },
      { id: "community-blood", label: "Blood Donor Registry", path: "/community/blood" },
      { id: "community-gallery", label: "Announcements / Gallery", path: "/community/gallery" },
    ],
  };

  const supportItems = [
    { id: "settings", label: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} />, path: "/admin/notifications" },
    { id: "help", label: "Help Center", icon: <HelpCircle size={20} />, path: "/admin/help" },
  ];

  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-64 h-screen flex flex-col justify-between bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-tr-4xl rounded-br-4xl shadow-2xl">
      {/* Logo */}
      <div className="px-6 py-4 flex items-center gap-2">
        <span className="text-emerald-600 font-extrabold text-xl">🏘 RCHMS</span>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-3 mt-4 overflow-y-auto">
        <p className="text-xs text-gray-400 uppercase mb-2 ml-4">Main Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.id}>
                <button
                  onClick={() =>
                    item.hasSubmenu ? toggleSubmenu(item.id) : handleNavigate(item.path)
                  }
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full text-left transition ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-green-400 text-white font-semibold shadow-md"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={`ml-auto transform transition-transform ${
                        openSubmenu === item.id ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  )}
                </button>

                {/* Submenu Rendering */}
                {item.hasSubmenu && openSubmenu === item.id && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {subMenuItems[item.id]?.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;

                      return (
                        <li key={subItem.id}>
                          <button
                            onClick={() => handleNavigate(subItem.path)}
                            className={`block w-full text-left text-sm px-4 py-2 rounded-lg ${
                              isSubActive
                                ? "bg-gradient-to-r from-emerald-500 to-green-400 text-white font-semibold"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {subItem.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Support Section */}
        <p className="text-xs text-gray-400 uppercase mt-6 mb-2 ml-4">Support</p>
        <ul className="space-y-1">
          {supportItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full text-left transition ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-green-400 text-white font-semibold shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm mb-3">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-medium text-gray-800 text-sm">Admin User</p>
              <p className="text-xs text-gray-500">admin@rchms.com</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-4">
          <button
            onClick={() => {
              dispatch(logout()); 
              toast.success("Logged out successfully");
              navigate("/");  
                       // redirect to homepage/login
            }}
            className="text-sm text-gray-600 hover:text-emerald-600 hover:font-bold flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>

          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only" />
            <div className="w-10 h-5 bg-gray-300 rounded-full p-1 flex items-center">
              <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>
          </label>
        </div>
      </div>
    </aside>
  );
};
