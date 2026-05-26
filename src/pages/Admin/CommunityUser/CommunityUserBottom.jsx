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


// --- User Details Modal for Pending Users ---
const UserDetailsModal = ({ user, isOpen, onClose, onApprove, onReject }) => {
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (!user) return null;

  // Debug: log what data we have for this user
  console.log("UserDetailsModal - user data:", JSON.stringify(user, null, 2));

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
  };

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value || "—"}</span>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="space-y-5">
        {/* Header */}
        <div className="text-center pb-4 border-b border-gray-100">
          <div className="w-16 h-16 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-3">
            <HiEye className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Registration Request</h3>
          <p className="text-sm text-gray-500 mt-1">Review this user's signup details</p>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-0">
          <InfoRow label="Name" value={user.name} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Phone" value={user.phone} />
          <InfoRow label="Plot No" value={user.plot_no} />
          <InfoRow label="Claimed Role" value={roleLabels[user.role] || user.role} />
          {(user.role === "family_resident" || user.role === "caretaker") && (
            <InfoRow
              label="Relationship with Owner"
              value={user.relationship_type
                ? user.relationship_type.charAt(0).toUpperCase() + user.relationship_type.slice(1)
                : "Not provided"}
            />
          )}
          {user.role === "flat_owner" && (
            <InfoRow
              label="Number of Flats"
              value={user.flat_count ? `${user.flat_count} flat(s)` : "Not provided"}
            />
          )}
          <InfoRow
            label="Requested On"
            value={user.created_at ? new Date(user.created_at).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
            }) : "—"}
          />
        </div>

        {/* Reject Reason Input */}
        {showRejectInput && (
          <div className="animate-fadeIn">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Rejection reason (optional)
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Duplicate request, invalid plot claim..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm
                focus:ring-2 focus:ring-red-300 focus:border-red-400 outline-none resize-none"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
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
                <DropdownMenuItem onClick={() => handleViewProfile(userId)}>
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
