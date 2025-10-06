// src/pages/Admin/CommunityUser.jsx
import { useState } from "react";
import { useSelector } from "react-redux";
import { useApproveUserMutation, useDeleteUserMutation, useGetUsersQuery, useRejectUserMutation } from "../../features/api/userApi";

import CommunityUserBottom from "./CommunityUser/CommunityUserBottom";
import CommunityUserMiddle from "./CommunityUser/CommunityUserMiddle";
import CommunityUserTop from "./CommunityUser/CommunityUserTop";

const CommunityUser = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState("");

  // Fetch users
  const { data: users = [], isLoading, isError, error } = useGetUsersQuery();
  const [approveUser] = useApproveUserMutation();
  const [rejectUser] = useRejectUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Handlers
  const handleApprove = async (id) => { try { await approveUser(id).unwrap(); } catch (err) { console.error(err); } };
  const handleReject = async (id) => { try { await rejectUser(id).unwrap(); } catch (err) { console.error(err); } };
  const handleBlock = (id) => console.log("Block user", id);
  const handleUnblock = (id) => console.log("Unblock user", id);

    const handleDelete = async (id) => {
    try {
        await deleteUser(id).unwrap(); // unwrap throws error if API call fails
        console.log("User deleted successfully");
    } catch (err) {
        console.error("Delete failed:", err);
    }
    };

  const handleViewProfile = (id) => console.log("View Profile", id);

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div className="text-red-500">Error loading users. {error?.status && <span>Status: {error.status}</span>}</div>;

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      u.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <CommunityUserTop users={users} />
      <CommunityUserMiddle searchValue={searchValue} setSearchValue={setSearchValue} />
      <CommunityUserBottom
        users={filteredUsers}
        currentUser={currentUser}
        handleApprove={handleApprove}
        handleReject={handleReject}
        handleBlock={handleBlock}
        handleUnblock={handleUnblock}
        handleDelete={handleDelete}
        handleViewProfile={handleViewProfile}
      />
    </div>
  );
};

export default CommunityUser;
