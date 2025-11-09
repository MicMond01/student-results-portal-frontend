import AuthenticationPage from "@/screens/Authentication/login";
import VerifyIdentity from "@/screens/Authentication/VerificationForm";
import ChangePassword from "@/screens/Authentication/ChangePasswordForm";
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
const LecturerCourses = lazy(() => import("@/screens/lecturer-course/index"));
const LecturerExams = lazy(() => import("@/screens/lecturer-exams/index"));
const StudentDetail = lazy(
  () => import("@/screens/lecturer-students/StudentDetail")
);
const StudentProfile = lazy(
  () => import("@/screens/students-screens/profile/index")
);

export type IRoute = {
  link: string;
  title: string;
  code: string;
  allowedStep?: "verification" | "change-password";
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

const vrificationRoute: IRoute[] = [
  {
    link: "/verify-identity",
    title: "Verify-Identity",
    code: "vri",
    allowedStep: "verification",
    component: VerifyIdentity,
  },
  {
    link: "/change-password",
    title: "Change-Password",
    code: "chp",
    allowedStep: "change-password",
    component: ChangePassword,
  },
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
  {
    link: "/exams",
    title: "Exams",
    code: "exams",
    component: LecturerExams,
    allowedRoles: ["lecturer"],
  },
  {
    link: "/myprofile",
    title: "Profile",
    code: "st-profile",
    component: StudentProfile,
    allowedRoles: ["student"],
  },
];
export { routeData, authRouteData, vrificationRoute };
