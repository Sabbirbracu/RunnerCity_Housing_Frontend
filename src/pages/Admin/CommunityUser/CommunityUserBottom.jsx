// src/components/CommunityUserBottom.jsx

import { useState } from "react";
import PermissionModal from "../../../components/modal/PermissionModal";
import CustomTable from "../../../components/ui/CustomTable";
import { DropdownMenu, DropdownMenuItem } from "../../../components/ui/DropdownMenu";

// IMPORTED REACT ICONS (using Heroicons/Solid as an example)
import {
  HiBan,
  HiCheckCircle,
  HiEye,
  HiOutlineRefresh,
  HiTrash,
  HiXCircle
} from 'react-icons/hi';


// --- Helper function for modern status badges (No change here) ---
const StatusBadge = ({ status }) => {
  const baseClasses = "inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full capitalize transition-colors duration-200"; // Changed font-semibold to font-bold for stronger visual weight
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


  const columns = [
    { 
      // IMPROVEMENT: Added 'font-bold' to headerClassName
      header: "Name", 
      accessor: "name", 
      headerClassName: "w-1/4 font-bold", 
      cellClassName: "font-medium text-gray-900",
    },
    { 
      // IMPROVEMENT: Added 'font-bold' to headerClassName
      header: "Email", 
      accessor: "email",
      headerClassName: "font-bold",
      cellClassName: "text-gray-600",
    },
    { 
      // IMPROVEMENT: Added 'font-bold' to headerClassName
      header: "Role", 
      accessor: "role",
      headerClassName: "font-bold",
      cellClassName: "capitalize text-gray-700",
    },
    {
      // IMPROVEMENT: Added 'font-bold' to headerClassName
      header: "Status",
      accessor: "status",
      headerClassName: "font-bold",
      render: (user) => <StatusBadge status={user.status} />,
      cellClassName: "w-[120px]",
    },
    {
      // IMPROVEMENT: Added 'font-bold' to headerClassName
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
                  onClick={() => handleApprove(userId)} 
                  className="text-green-600 hover:bg-green-50"
                >
                  <HiCheckCircle className="w-4 h-4 mr-2 text-green-500" /> Approve User
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleReject(userId)} 
                  className="text-red-600 hover:bg-red-50"
                >
                  <HiXCircle className="w-4 h-4 mr-2 text-red-500" /> Reject
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
      {/* IMPROVEMENT: Removed padding from container and moved it to the table 
        component, which often gives the table a cleaner full-width look within
        a card-style wrapper. 
      */}
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
         <CustomTable columns={columns} data={users} />
      </div>

      {modalOpen && selectedUser && (
        <PermissionModal
          title="Confirm Deletion"
          message={`Are you absolutely sure you want to delete ${selectedUser.name}'s account? This action is permanent and cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default CommunityUserBottom;