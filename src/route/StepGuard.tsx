import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/lib/hooks/dispatch-hooks";

interface StepGuardProps {
  allowedStep: "verification" | "change-password";
  children: React.ReactNode;
}

const StepGuard: React.FC<StepGuardProps> = ({ allowedStep, children }) => {
  const { nextStep, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Admins should skip step-based routes entirely
  if (user?.role === "admin") {
    return <Navigate to="/" replace />;
  }

  // If the user’s step does not match this route’s step, redirect to the correct step
  if (nextStep && nextStep !== allowedStep) {
    if (
      nextStep === "verification" &&
      location.pathname !== "/verify-identity"
    ) {
      return <Navigate to="/verify-identity" replace />;
    }
    if (
      nextStep === "change-password" &&
      location.pathname !== "/change-password"
    ) {
      return <Navigate to="/change-password" replace />;
    }
    // If they’ve completed all steps (nextStep === null), go home
    if (!nextStep) return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default StepGuard;
