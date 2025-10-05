// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/admin/Sidebar";

export const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - fixed on the left */}
      <Sidebar />

      {/* Page Content */}
      <div className="ml-5 rounded-tl-4xl rounded-tr-4xl mt-4 mr-5 flex-1 overflow-y-auto p-6 shadow-2xl">
        <Outlet />
      </div>
    </div>
  );
};
