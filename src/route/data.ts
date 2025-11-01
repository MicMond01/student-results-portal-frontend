import AuthenticationPage from "@/screens/Authentication/login";
// src/router/routesData.tsx
import { lazy } from "react";

// Lazy imports for code-splitting
const Dashboard = lazy(() => import("@/screens/dashboard/Overview"));
const MyStudents = lazy(() => import("@/screens/lecturer-students"));
const StudentsList = lazy(() => import("@/screens/students/StudentsList"));
const LecturerProfile = lazy(() => import("@/screens/lecturer-profile/index"));
const UpdateProfile = lazy(
  () => import("@/screens/lecturer-profile/UpdateProfile")
);
const LecturerCourses = lazy(
  () => import("@/screens/lecturer-course/lecturer-courses/index")
);
const StudentDetail = lazy(
  () => import("@/screens/lecturer-students/StudentDetail")
);

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
    link: "/myStudents/:id",
    title: "Student Detail",
    code: "student-detail",
    component: StudentDetail,
    allowedRoles: ["admin", "lecturer"],
  },
  {
    link: "/profile",
    title: "User Profile",
    code: "user-profile",
    component: LecturerProfile,
    allowedRoles: ["lecturer"],
  },
  {
    link: "/profile/update",
    title: "Update Profile",
    code: "edit-profile",
    component: UpdateProfile,
    allowedRoles: ["lecturer"],
  },
  {
    link: "/courses",
    title: "lecturer-courses",
    code: "lecturer-courses",
    component: LecturerCourses,
    allowedRoles: ["lecturer"],
  },
  {
    link: "/students",
    title: "Students",
    code: "students",
    component: StudentsList,
    allowedRoles: ["admin", "lecturer"],
  },
];
export { routeData, authRouteData };
