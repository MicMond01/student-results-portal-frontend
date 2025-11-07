import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/lib/hooks/dispatch-hooks";

const useAuth = () => {
  const { token, nextStep, user } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!token;
  return { isAuthenticated, nextStep, user };
};

const OpenRouteChecker = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated, nextStep, user } = useAuth();

  if (!isAuthenticated) return children;

  if (user?.role === "admin") {
    return <Navigate to="/" replace />;
  }

  if (nextStep === "verification") {
    return <Navigate to="/verify-identity" replace />;
  }

  if (nextStep === "change-password") {
    return <Navigate to="/change-password" replace />;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default OpenRouteChecker;
