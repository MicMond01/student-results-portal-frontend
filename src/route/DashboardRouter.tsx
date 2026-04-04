// src/routes/DashboardRouter.tsx
import { Navigate, useNavigate } from "react-router-dom";
import { useGetLoggedInUserQuery } from "@/redux/query/auth";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const DashboardRouter = () => {
  const token = useSelector((s: RootState) => s.auth.token);
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetLoggedInUserQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
  }

  useEffect(() => {
    if (!error) return;

    if (isFetchBaseQueryError(error)) {
      if (error.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      }

      if (error.status === 429) {
        toast.error("Too many attempts. Please wait 15 minutes.");
      }

      if (error.status === 500) {
        toast.error("Server error. Try later.");
      }
    }
  }, [error, navigate]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );

  const role = data?.user?.role;

  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (role === "lecturer") return <Navigate to="/lecturer/dashboard" replace />;
  if (role === "student") return <Navigate to="/student/dashboard" replace />;

  return <Navigate to="/login" replace />;
};

export default DashboardRouter;
