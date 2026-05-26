// src/components/CommunityUserBottom.jsx

import { useState } from "react";
import PermissionModal from "../../../components/modal/PermissionModal";
import { Modal } from "../../../components/modal/modal";
import CustomTable from "../../../components/ui/CustomTable";
import { DropdownMenu, DropdownMenuItem } from "../../../components/ui/DropdownMenu";

import {
  HiBan,
  HiCheckCircle,
  HiEye,
  HiOutlineRefresh,
  HiTrash,
  HiXCircle
} from 'react-icons/hi';


// --- Helper function for modern status badges ---
const StatusBadge = ({ status }) => {
  const baseClasses = "inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full capitalize transition-colors duration-200";
  let colorClasses = "";

  switch (status) {
    case "approved":
      colorClasses = "bg-green-100 text-green-800 ring-1 ring-inset ring-green-200";
      break;
    case "pending":
      colorClasses = "bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-200";
      break;
    case "rejected": 
      colorClasses = "bg-red-100 text-red-800 ring-1 ring-inset ring-red-200";
      break;
    case "blocked":
      colorClasses = "bg-gray-700 text-white ring-1 ring-inset ring-gray-800"; 
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-200";
  }

  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};


// --- User Details Modal ---
const UserDetailsModal = ({ user, isOpen, onClose, onApprove, onReject }) => {
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (!user) return null;

  const handleReject = () => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }
    onReject(user.user_id, rejectReason);
    setShowRejectInput(false);
    setRejectReason("");
    onClose();
  };

  const handleApprove = () => {
    onApprove(user.user_id);
    onClose();
  };

  const roleLabels = {
    full_owner: "Full Owner",
    flat_owner: "Flat Owner",
    family_resident: "Family/Resident",
    tenant: "Tenant",
    caretaker: "Caretaker",
    admin: "Admin",
  };

  const roleBadgeColors = {
    full_owner: "bg-blue-50 text-blue-700 ring-blue-200",
    flat_owner: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    family_resident: "bg-purple-50 text-purple-700 ring-purple-200",
    tenant: "bg-orange-50 text-orange-700 ring-orange-200",
    caretaker: "bg-teal-50 text-teal-700 ring-teal-200",
    admin: "bg-gray-800 text-white ring-gray-900",
  };

  const statusColors = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    rejected: "bg-red-50 text-red-700 ring-red-200",
    blocked: "bg-gray-100 text-gray-700 ring-gray-300",
  };

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="space-y-5 -mt-2">
        {/* Profile Header */}
        <div className="flex flex-col items-center pt-2 pb-4">
          {/* Avatar */}
          <div className="w-18 h-18 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg mb-3">
            <span className="text-white text-xl font-bold">{initials}</span>
          </div>
          {/* Name & Status */}
          <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset capitalize ${statusColors[user.status] || "bg-gray-100 text-gray-600 ring-gray-200"}`}>
              {user.status}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset ${roleBadgeColors[user.role] || "bg-gray-100 text-gray-600 ring-gray-200"}`}>
              {roleLabels[user.role] || user.role}
            </span>
          </div>
        </div>

        {/* Info Sections */}
        <div className="space-y-3">
          {/* Contact Section */}
          <div className="bg-gray-50/80 rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-2 bg-gray-100/60 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Information</p>
            </div>
            <div className="px-4 py-1 divide-y divide-gray-100">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs text-gray-500 font-medium">Email</span>
                <span className="text-sm text-gray-900 font-medium">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs text-gray-500 font-medium">Phone</span>
                <span className="text-sm text-gray-900 font-medium">{user.phone || "—"}</span>
              </div>
            </div>
          </div>

          {/* Property Section */}
          <div className="bg-gray-50/80 rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-2 bg-gray-100/60 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property Details</p>
            </div>
            <div className="px-4 py-1 divide-y divide-gray-100">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs text-gray-500 font-medium">Plot No</span>
                <span className="text-sm text-gray-900 font-bold bg-emerald-50 px-2 py-0.5 rounded">{user.plot_no || "—"}</span>
              </div>
              {(user.role === "family_resident" || user.role === "caretaker") && (
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs text-gray-500 font-medium">Relationship</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {user.relationship_type
                      ? user.relationship_type.charAt(0).toUpperCase() + user.relationship_type.slice(1)
                      : "Not provided"}
                  </span>
                </div>
              )}
              {user.role === "flat_owner" && (
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs text-gray-500 font-medium">Flats Owned</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {user.flat_count ? `${user.flat_count}` : "Not provided"}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs text-gray-500 font-medium">
                  {user.status === "pending" ? "Requested" : "Joined"}
                </span>
                <span className="text-sm text-gray-900 font-medium">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reject Reason Input */}
        {showRejectInput && (
          <div className="animate-fadeIn">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Rejection Reason (optional)
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Duplicate request, invalid plot claim..."
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white
                focus:ring-2 focus:ring-red-200 focus:border-red-300 outline-none resize-none
                placeholder:text-gray-400"
            />
          </div>
        )}

        {/* Action Buttons — only for pending users */}
        {user.status === "pending" && (
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleReject}
              className="flex-1 py-2.5 px-4 rounded-xl border-2 border-red-200 text-red-600 font-semibold text-sm
                hover:bg-red-50 hover:border-red-300 transition-all"
            >
              <HiXCircle className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              {showRejectInput ? "Confirm Reject" : "Reject"}
            </button>
            <button
              onClick={handleApprove}
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-sm
                hover:bg-emerald-700 transition-all shadow-sm"
            >
              <HiCheckCircle className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              Approve
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};


// --- Component Implementation ---

const CommunityUserBottom = ({
  users,
  currentUser,
  handleApprove,
  handleReject,
  handleBlock,
  handleUnblock,
  handleDelete,
  handleViewProfile,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsUser, setDetailsUser] = useState(null);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      const userId = Number(selectedUser.user_id);
      if (!isNaN(userId)) {
        await handleDelete(userId);
      }
      setModalOpen(false);
      setSelectedUser(null);
    }
  };

  const openDetailsModal = (user) => {
    setDetailsUser(user);
    setDetailsModalOpen(true);
  };

  const handleRejectWithReason = async (userId, reason) => {
    try {
      await handleReject({ id: userId, reason });
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { 
      header: "Name", 
      accessor: "name", 
      headerClassName: "w-1/4 font-bold", 
      cellClassName: "font-medium text-gray-900",
    },
    { 
      header: "Email", 
      accessor: "email",
      headerClassName: "font-bold",
      cellClassName: "text-gray-600",
    },
    { 
      header: "Role", 
      accessor: "role",
      headerClassName: "font-bold",
      cellClassName: "capitalize text-gray-700",
    },
    {
      header: "Status",
      accessor: "status",
      headerClassName: "font-bold",
      render: (user) => <StatusBadge status={user.status} />,
      cellClassName: "w-[120px]",
    },
    {
      header: "Actions",
      accessor: "actions",
      headerClassName: "text-right font-bold",
      cellClassName: "text-right",
      render: (user) => {
        if (currentUser?.role !== "admin") {
          return <span className="text-gray-400">-</span>;
        }

        const userId = Number(user.user_id);
        if (isNaN(userId)) return <span className="text-red-500">Error ID</span>;

        return (
          <DropdownMenu
            trigger={
              <button className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-sm hover:bg-indigo-100 transition shadow-sm border border-indigo-200">
                Select
              </button>
            }
            align="right"
          >
            
            {user.status === "pending" && (
              <>
                <DropdownMenuItem 
                  onClick={() => openDetailsModal(user)} 
                  className="text-indigo-600 hover:bg-indigo-50"
                >
                  <HiEye className="w-4 h-4 mr-2 text-indigo-500" /> View Details
                </DropdownMenuItem>
              </>
            )}
            
            {user.status === "approved" && (
              <>
                <DropdownMenuItem onClick={() => openDetailsModal(user)}>
                  <HiEye className="w-4 h-4 mr-2 text-indigo-500" /> View Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleBlock(userId)} 
                  className="text-yellow-700 hover:bg-yellow-50"
                >
                  <HiBan className="w-4 h-4 mr-2 text-yellow-500" /> Block User
                </DropdownMenuItem>
              </>
            )}
            
            {user.status === "blocked" && (
              <DropdownMenuItem 
                onClick={() => handleUnblock(userId)} 
                className="text-blue-600 hover:bg-blue-50"
              >
                <HiOutlineRefresh className="w-4 h-4 mr-2 text-blue-500" /> Unblock User
              </DropdownMenuItem>
            )}

            <hr className="my-1 border-gray-100" />
            <DropdownMenuItem 
              onClick={() => openDeleteModal(user)} 
              className="text-red-600 hover:bg-red-50 font-medium"
            >
              <HiTrash className="w-4 h-4 mr-2 text-red-500" /> Delete User
            </DropdownMenuItem>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
         <CustomTable columns={columns} data={users} />
      </div>

      {/* Delete Confirmation Modal */}
      {modalOpen && selectedUser && (
        <PermissionModal
          title="Confirm Deletion"
          message={`Are you absolutely sure you want to delete ${selectedUser.name}'s account? This action is permanent and cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setModalOpen(false)}
        />
      )}

      {/* User Details Modal for Pending Users */}
      <UserDetailsModal
        user={detailsUser}
        isOpen={detailsModalOpen}
        onClose={() => { setDetailsModalOpen(false); setDetailsUser(null); }}
        onApprove={(id) => handleApprove(id)}
        onReject={handleRejectWithReason}
      />
    </>
  );
};

export default CommunityUserBottom;
