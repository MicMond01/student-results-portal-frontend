import { Routes, Route, Navigate } from "react-router-dom";
import { routeData, authRouteData } from "./data";
import AppLayout from "@/layout/AppLayout";
import { Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import OpenRouteChecker from "./OpenRouteChecker";
import UnauthorizedPage from "@/screens/Authentication/UnauthorizedPage";

const Fallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {authRouteData.map((route) => (
        <Route
          key={route.link}
          path={route.link}
          element={
            <OpenRouteChecker>
              <route.component />
            </OpenRouteChecker>
          }
        />
      ))}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {routeData.map((route) => (
          <Route
            key={route.link}
            path={route.link}
            element={
              <ProtectedRoute allowedRoles={route.allowedRoles}>
                <Suspense fallback={<Fallback />}>
                  <route.component />
                </Suspense>
              </ProtectedRoute>
            }
          />
        ))}
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
