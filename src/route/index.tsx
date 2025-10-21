import { Routes, Route } from "react-router-dom";
import { routeData, authRouteData } from "./data";
import AppLayout from "@/layout/AppLayout";
import { Suspense } from "react";

const Fallback = () => (
  <div className="p-6 text-sm text-muted-foreground">Loading…</div>
);
const AppRoutes = () => {
  return (
    <Routes>
      {authRouteData.map((route) => (
        <Route
          key={route.link}
          path={route.link}
          element={<route.component />}
        />
      ))}

      {routeData.map((route) => (
        <Route key={route.link} element={<AppLayout />}>
          <Route
            key={route.link}
            path={route.link}
            element={
              <Suspense fallback={<Fallback />}>
                <route.component />
              </Suspense>
            }
          />
        </Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;
