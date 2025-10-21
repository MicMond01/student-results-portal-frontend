import AuthenticationPage from "@/screens/Authentication/login";
// src/router/routesData.tsx
import type { FC, LazyExoticComponent } from "react";
import { lazy } from "react";

// Lazy imports for code-splitting
const Dashboard = lazy(() => import("@/screens/dashboard/Overview"));
const StudentsList = lazy(() => import("@/screens/students/StudentsList"));
const StudentDetail = lazy(() => import("@/screens/students/StudentDetail"));

export type IRoute = {
  link: string;
  title: string;
  code: string;
  component: React.FC;
};

const authRouteData: IRoute[] = [
  {
    link: "/login",
    title: "Login",
    code: "log",
    component: AuthenticationPage,
  },
  // {
  //   link: "/registration/:uuid",
  //   title: "Registration",
  //   code: "reg",
  //   component: CompleteRegistration,
  // },
  // {
  //   link: "/forgot-password",
  //   title: "Forgot Password",
  //   code: "fgp",
  //   component: ForgotPassword,
  // },
  // {
  //   link: "/restore-account/:uuid",
  //   title: "Restore Account",
  //   code: "rsa",
  //   component: RestoreAccount,
  // },
];

const routeData: IRoute[] = [
  {
    link: "/",
    title: "Dashboard",
    code: "dashboard",
    component: Dashboard,
  },
  {
    link: "/students",
    title: "Students",
    code: "students",
    component: StudentsList,
  },
  {
    link: "/students/:id",
    title: "Student Detail",
    code: "student-detail",
    component: StudentDetail,
  },
];
export { routeData, authRouteData };
