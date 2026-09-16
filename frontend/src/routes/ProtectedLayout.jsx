import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FullScreenLoader from "../component/fullScreenLoader";

const ProtectedLayout = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <FullScreenLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // // Only customers can access customer protected routes
  if (user?.role !== "customer") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;

