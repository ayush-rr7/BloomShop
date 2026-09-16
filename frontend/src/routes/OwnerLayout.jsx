import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FullScreenLoader from "../component/fullScreenLoader";

const OwnerLayout = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <FullScreenLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "owner") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default OwnerLayout;