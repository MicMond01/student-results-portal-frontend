import React, { useCallback, useEffect, useState } from "react";
import { useLazyGetLoggedInUserQuery } from "@/redux/query/auth";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatch-hooks";
import { setUser } from "@/redux/slices/auth";

const useAuth = () => {
  const { token } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!token;
  return isAuthenticated;
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"admin" | "lecturer" | "student">;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const isTokenSet = useAuth();
  const { token, user } = useAppSelector((state) => state.auth);
  const [getAuthUser] = useLazyGetLoggedInUserQuery();
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const dispatch = useAppDispatch();

  const confirmUser = useCallback(async () => {
    const res = await getAuthUser().unwrap();
    if (res && "user" in res) {
      dispatch(setUser(res.user));

      setAuthCheckComplete(true);
    }
  }, [token]);

  useEffect(() => {
    if (isTokenSet) setTimeout(() => confirmUser(), 1000);
  }, [isTokenSet]);

  if (!isTokenSet) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!authCheckComplete) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // No user data after auth check
    if (!user || !user.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    const isValidRole = (r: string): r is "admin" | "lecturer" | "student" =>
      ["admin", "lecturer", "student"].includes(r);

    if (!isValidRole(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  if (authCheckComplete) return children;
};

export default ProtectedRoute;
