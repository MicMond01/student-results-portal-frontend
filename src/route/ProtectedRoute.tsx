import React, { useEffect, useState } from "react";
import { useLazyGetLoggedInUserQuery } from "@/redux/query/auth";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatch-hooks";
import { setUser, exitUser } from "@/redux/slices/auth";

const useAuth = () => {
  const { token } = useAppSelector((state) => state.auth);
  return !!token;
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"admin" | "lecturer" | "student">;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const isTokenSet = useAuth();
  const { token, user, nextStep } = useAppSelector((state) => state.auth);
  const [getAuthUser] = useLazyGetLoggedInUserQuery();
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      if (!isTokenSet) return;

      try {
        const res = await getAuthUser().unwrap();
        if (res?.user) {
          dispatch(setUser(res.user));
        }
      } catch (err: any) {
        if (err?.status === 401) {
          setIsUnauthorized(true);
          dispatch(exitUser?.());
        }
      } finally {
        setAuthCheckComplete(true);
      }
    };

    verifyUser();
  }, [isTokenSet, token]);

  // --- Redirect if not logged in ---
  if (!isTokenSet || isUnauthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // --- Wait for authentication check to finish 
  if (!authCheckComplete) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  // --- Role restriction check ---
  if (allowedRoles && allowedRoles.length > 0) {
    if (
      !user ||
      !user.role ||
      !allowedRoles.includes(user.role as "admin" | "lecturer" | "student")
    ) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // ✅ --- Step protection (aligned with backend logic) ---
  if (user?.role !== "admin") {
    if (nextStep === "verification") {
      return <Navigate to="/verify-identity" replace />;
    }
    if (nextStep === "change-password") {
      return <Navigate to="/change-password" replace />;
    }
    if (nextStep === null) {
      // user not logged in properly
      return <Navigate to="/login" replace />;
    }
    if (nextStep !== "dashboard") {
      // safety fallback
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
