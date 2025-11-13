// src/routes/DashboardRouter.tsx
import { Navigate } from "react-router-dom";
import { useGetLoggedInUserQuery } from "@/redux/query/auth";
import { Loader2 } from "lucide-react";

const DashboardRouter = () => {
  const { data, isLoading } = useGetLoggedInUserQuery();

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
