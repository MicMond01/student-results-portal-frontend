import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/lib/hooks/dispatch-hooks";

const useAuth = () => {
  const { token } = useAppSelector((state)=> state.auth)

  const isAuthenticated = !!token

  return isAuthenticated
};

const OpenRouteChecker = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const  isAuthenticated = useAuth();

  return !isAuthenticated ? children : ( <Navigate to="/" state={{ from: location }} />)
};

export default OpenRouteChecker;
