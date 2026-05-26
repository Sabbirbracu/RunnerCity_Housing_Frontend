import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/adminLayout";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import CommunityPlots from "./pages/Admin/CommunityPlots";
import CommunityUser from "./pages/Admin/CommunityUser";
import Finances from "./pages/Admin/Finances";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Dashboard } from "./pages/Owner/Dashboard";
import Settings from "./pages/Settings/Settings";
export const RootRouter = () => {
  const { token, user } = useSelector((state) => state.auth);

  const isAdmin = token && user?.role === "admin";
  const isLoggedIn = token && user?.role !== "admin";

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Admin Dashboard */}
        {isAdmin && (
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />}/>
            <Route path="/admin/finances" element={<Finances />}/>
            <Route path="/community/users" element={<CommunityUser />} />
            <Route path="/community/plots" element={<CommunityPlots />}/>
            <Route path="/settings" element={<Settings />} />
          </Route>
        )}

        {/* Non-admin logged-in users */}
        {isLoggedIn && (
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/settings" element={<Settings />} />
          </Route>
        )}

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
