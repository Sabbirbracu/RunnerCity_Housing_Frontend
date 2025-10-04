import {
    BarChart3,
    Bell,
    ChevronUp,
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

export const Sidebar = () => {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "finances", label: "Finances", icon: <CreditCard size={20} /> },
    { id: "payroll", label: "Payroll", icon: <Wallet size={20} /> },
    { id: "community", label: "Community", icon: <Users size={20} /> },
    { id: "security", label: "Security", icon: <ShieldCheck size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
  ];

  const supportItems = [
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { id: "help", label: "Help Center", icon: <HelpCircle size={20} /> },
  ];

  return (
    // CRITICAL CHANGE: Applied rounded-tr/br, removed border/shadow, and added light gradient background
    <aside className="w-64 h-screen flex flex-col justify-between border-none
                      bg-gradient-to-br from-white via-gray-50 to-gray-100 
                      rounded-tr-2xl rounded-br-2xl shadow-xl">
      
      {/* Logo */}
      <div className="px-6 py-4 flex items-center gap-2">
        <span className="text-emerald-600 font-extrabold text-xl">🏘 RCHMS</span>
      </div>

      {/* Main Menu (Enabled overflow-y-auto to ensure scrolling works if content exceeds height) */}
      <nav className="flex-1 px-3 mt-4 overflow-y-auto">
        <p className="text-xs text-gray-400 uppercase mb-2 ml-4">Main Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full text-left transition ${
                  // CRITICAL CHANGE: Applied green gradient to active link
                  active === item.id
                    ? "bg-gradient-to-r from-emerald-500 to-green-400 text-white font-semibold shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Support */}
        <p className="text-xs text-gray-400 uppercase mt-6 mb-2 ml-4">Support</p>
        <ul className="space-y-1">
          {supportItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full text-left transition ${
                  active === item.id
                    ? "bg-gradient-to-r from-emerald-500 to-green-400 text-white font-semibold shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile + Dark Mode (Styling adjusted to resemble a contained card) */}
      <div className="p-4 border-t border-gray-200">
        
        {/* Profile Card (Using a rounded container similar to the reference image) */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm cursor-pointer mb-3">
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
            <ChevronUp size={16} className="text-gray-500" />
        </div>

        {/* Logout and Dark Mode (Removed LogOut button from bottom and merged it into a single line for better aesthetics) */}
        <div className="flex justify-between items-center px-4">
          <button className="text-sm text-gray-600 hover:text-emerald-600 flex items-center gap-2">
             <LogOut size={18} /> Logout
          </button>

          {/* Dark Mode Toggle Placeholder */}
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