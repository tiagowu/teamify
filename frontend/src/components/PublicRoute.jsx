import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
  const { auth } = useAuth();
  return auth?.accessToken ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
