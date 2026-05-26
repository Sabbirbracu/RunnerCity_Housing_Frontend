// src/layouts/AdminLayout.jsx
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/admin/Sidebar";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, slide-in when toggled */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Page Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <span className="text-emerald-600 font-extrabold text-lg">🏘 RCHMS</span>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:ml-5 lg:rounded-tl-4xl lg:rounded-tr-4xl lg:mt-4 lg:mr-5 lg:shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
