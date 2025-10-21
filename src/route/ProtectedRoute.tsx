import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useSelector((state: any) => state.auth);

  if (!token) {
    // Redirect to login if no token
    return <Navigate to="/login" replace />;
  }

  // If children provided, render them; otherwise render Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;