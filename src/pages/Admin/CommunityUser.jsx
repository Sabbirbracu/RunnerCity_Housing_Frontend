// src/pages/Admin/CommunityUser.jsx
import { Users } from "lucide-react";
import { useState } from "react";
import { KPIWidget } from "../../components/admin/KPIWidget";

// Dummy Users Table component
const UsersTable = ({ users, onApprove, onReject }) => {
  return (
    <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b">
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2">{user.status}</td>
            <td className="px-4 py-2 space-x-2">
              {user.status === "pending" && (
                <>
                  <button onClick={() => onApprove(user.id)} className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm">Approve</button>
                  <button onClick={() => onReject(user.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm">Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CommunityUser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@test.com", role: "Member", status: "pending" },
    { id: 2, name: "Bob", email: "bob@test.com", role: "Member", status: "active" },
    { id: 3, name: "Charlie", email: "charlie@test.com", role: "Member", status: "pending" },
  ]);

  const handleApprove = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: "active" } : u));
  };

  const handleReject = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIWidget title="Total Users" value={users.length} change="+5%" icon={Users} color="#3B82F6" />
        <KPIWidget title="Pending Approvals" value={users.filter(u => u.status === "pending").length} change="-2%" icon={Users} color="#F59E0B" />
        <KPIWidget title="Active Users" value={users.filter(u => u.status === "active").length} change="+3%" icon={Users} color="#10B981" />
        <KPIWidget title="Admins" value={1} change="+0%" icon={Users} color="#EF4444" />
      </div>

      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name/email..."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 w-64"
        />
      </div>

      {/* Users Table */}
      <UsersTable users={users} onApprove={handleApprove} onReject={handleReject} />
    </div>
  );
};


export default CommunityUser;