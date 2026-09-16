import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FullScreenLoader from "../component/fullScreenLoader";

const PublicLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <FullScreenLoader />;
  }

  return <Outlet />;
};

export default PublicLayout;

// import { Outlet, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PublicLayout = () => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <Outlet />;
//   }
//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// };

// export default PublicLayout;