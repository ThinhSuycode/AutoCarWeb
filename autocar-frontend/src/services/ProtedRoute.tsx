import { Navigate } from "react-router-dom";
import { config } from "../config";
import { getMeApi } from "./auth.service";
import { useEffect, useState } from "react";
import type { UserType } from "../types/users";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user" | "staff";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [account, setAccount] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Không có token → không cần gọi API
    if (!token) {
      setIsLoading(false);
      return;
    }

    const getMe = async () => {
      try {
        const data = await getMeApi();
        setAccount(data ?? null);
      } catch {
        // Token hết hạn hoặc lỗi → xóa token
        localStorage.removeItem("token");
        setAccount(null);
      } finally {
        setIsLoading(false);
      }
    };

    getMe();
  }, []);

  if (isLoading) {
    return null;
  }

  // Chưa đăng nhập → về trang Login
  if (!account) {
    return <Navigate to={config.Routes.Login} replace />;
  }

  if (requiredRole && account.role !== requiredRole) {
    return <Navigate to={config.Routes.Home} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
