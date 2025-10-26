import AuthenticationPage from "@/screens/Authentication/login";
// src/router/routesData.tsx
import { lazy } from "react";

// Lazy imports for code-splitting
const Dashboard = lazy(() => import("@/screens/dashboard/Overview"));
const MyStudents = lazy(() => import("@/screens/lecturer-students"));
const StudentsList = lazy(() => import("@/screens/students/StudentsList"));
const StudentDetail = lazy(() => import("@/screens/students/StudentDetail"));

export type IRoute = {
  link: string;
  title: string;
  code: string;
  component: React.FC;
  allowedRoles?: Array<"admin" | "lecturer" | "student">;
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
    allowedRoles: ["student", "admin", "lecturer"],
  },
  {
    link: "/myStudents",
    title: "My Students",
    code: "my-students",
    component: MyStudents,
    allowedRoles: ["admin", "lecturer"],
  },
  {
    link: "/students",
    title: "Students",
    code: "students",
    component: StudentsList,
    allowedRoles: ["admin", "lecturer"],
  },
  {
    link: "/students/:id",
    title: "Student Detail",
    code: "student-detail",
    component: StudentDetail,
  },
];
export { routeData, authRouteData };
