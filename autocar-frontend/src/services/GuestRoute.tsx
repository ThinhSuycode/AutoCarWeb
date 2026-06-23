import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../queries/useCurrentUser";
import { config } from "../config";

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const isLoggined = !!localStorage.getItem("token");
  const { data: account, isLoading } = useCurrentUser(isLoggined);

  if (isLoading) return null;

  if (account) {
    return <Navigate to={config.Routes.Home} replace></Navigate>;
  }
  return <>{children}</>;
};

export default GuestRoute;
