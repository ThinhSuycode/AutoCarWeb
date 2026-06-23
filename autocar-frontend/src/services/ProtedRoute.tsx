import { Navigate } from "react-router-dom";
import { config } from "../config";
import { useCurrentUser } from "../queries/useCurrentUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user" | "staff";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const isLoggedIn = !!localStorage.getItem("token");

  const { data: account, isLoading } = useCurrentUser(isLoggedIn);

  if (isLoading) return null;

  if (!account) {
    return <Navigate to={config.Routes.Login} replace />;
  }

  if (requiredRole && account.role !== requiredRole) {
    return <Navigate to={config.Routes.Home} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
