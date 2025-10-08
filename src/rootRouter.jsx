import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/adminLayout";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import CommunityPlots from "./pages/Admin/CommunityPlots";
import CommunityUser from "./pages/Admin/CommunityUser";
import { Dashboard } from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
export const RootRouter = () => {
  const { token, user } = useSelector((state) => state.auth);

  const isAdmin = token && user?.role === "admin";
  const isUser = token && user?.role !== "admin";

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={isUser ? <Dashboard /> : <Navigate to="/" replace />}
        />

        {/* Admin Protected Routes */}
        {isAdmin && (
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />}/>
            <Route path="/community/users" element={<CommunityUser />} />
            <Route path="/community/plots" element={<CommunityPlots />}/>
            {/* Add more admin pages here */}
          </Route>
        )}

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
