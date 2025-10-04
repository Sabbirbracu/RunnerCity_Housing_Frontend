import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Dashboard } from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const RootRouter = () => {
  const { token } = useSelector((state) => state.auth); // auth token
  const {user} = useSelector((state) => state.auth); // user info
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route: Home */}
        <Route path="/" element={<Home />} />

        {/* Protected Route: Dashboard */}
        <Route
          path="/dashboard"
          element={token && user?.role !== "admin" ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin-dashboard"
          element={token && user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" replace />}
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
