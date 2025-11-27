import AuthenticationPage from "@/screens/Authentication/login";
import VerifyIdentity from "@/screens/Authentication/VerificationForm";
import ChangePassword from "@/screens/Authentication/ChangePasswordForm";
// src/router/routesData.tsx
import { lazy } from "react";

// Lazy imports for code-splitting
// const Dashboard = lazy(() => import("@/screens/dashboard/Overview"));
const MyStudents = lazy(
  () => import("@/screens/lecturer-screens/lecturer-students")
);
const LecturerProfile = lazy(
  () => import("@/screens/lecturer-screens/lecturer-profile/index")
);
const UpdateProfile = lazy(
  () => import("@/screens/lecturer-screens/lecturer-profile/UpdateProfile")
);
const LecturerCourses = lazy(
  () => import("@/screens/lecturer-screens/lecturer-course/index")
);
const LecturerExams = lazy(
  () => import("@/screens/lecturer-screens/lecturer-exams/index")
);
const StudentDetail = lazy(
  () => import("@/screens/lecturer-screens/lecturer-students/StudentDetail")
);
const StudentProfile = lazy(
  () => import("@/screens/students-screens/profile/index")
);
const StudentResults = lazy(
  () => import("@/screens/students-screens/results/index")
);
const StudentCourses = lazy(
  () => import("@/screens/students-screens/courses/index")
);

const StudentDashboard = lazy(
  () => import("@/screens/students-screens/dashboard")
);
const LecturerDashboard = lazy(
  () => import("@/screens/lecturer-screens/dashboard")
);
const AdminDashboard = lazy(() => import("@/screens/admin/dashboard"));
const AdminCourses = lazy(() => import("@/screens/admin/courses"));
const AdminDepartment = lazy(() => import("@/screens/admin/departments"));
const DepartmentDetailsPage = lazy(
  () => import("@/screens/admin/departments/DepartmentDetailsPage")
);
const AdminLectures = lazy(() => import("@/screens/admin/lecturers"));
const AdminLectureProfilePage = lazy(
  () => import("@/screens/admin/lecturers/LecturerProfilePage")
);
const AdminStudents = lazy(() => import("@/screens/admin/students"));
const StudentProfilePage = lazy(
  () => import("@/screens/admin/students/StudentProfilePage")
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
    link: "/admin/dashboard",
    title: "Dashboard",
    code: "ad-dashboard",
    component: AdminDashboard,
    allowedRoles: ["admin"],
  },
  {
    link: "/lecturer/dashboard",
    title: "Dashboard",
    code: "lr-dashboard",
    component: LecturerDashboard,
    allowedRoles: ["lecturer"],
  },
  {
    link: "/student/dashboard",
    title: "Dashboard",
    code: "st-dashboard",
    component: StudentDashboard,
    allowedRoles: ["student"],
  },
  // {
  //   link: "/",
  //   title: "Dashboard",
  //   code: "dashboard",
  //   component: Dashboard,
  //   allowedRoles: ["student", "admin", "lecturer"],
  // },
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
    link: "/profile-update",
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
  {
    link: "/myresults",
    title: "Student Results",
    code: "st-results",
    component: StudentResults,
    allowedRoles: ["student"],
  },
  {
    link: "/mycourses",
    title: "Student Courses",
    code: "st-courses",
    component: StudentCourses,
    allowedRoles: ["student"],
  },
  {
    link: "/admin/courses",
    title: "Courses",
    code: "ad-courses",
    component: AdminCourses,
    allowedRoles: ["admin"],
  },
  // {
  //   link: "/admin/course-details",
  //   title: "Course Details",
  //   code: "ad-course-dt",
  //   component: AdminCourses,
  //   allowedRoles: ["admin"],
  // },
  {
    link: "/admin/departments",
    title: "Departments",
    code: "ad-departments",
    component: AdminDepartment,
    allowedRoles: ["admin"],
  },
  {
    link: "/admin/departments/:id",
    title: "Departments",
    code: "ad-departments",
    component: DepartmentDetailsPage,
    allowedRoles: ["admin"],
  },
  {
    link: "/admin/lecturers",
    title: "Lecturers",
    code: "ad-lecturers",
    component: AdminLectures,
    allowedRoles: ["admin"],
  },
  {
    link: "/admin/lecturers/:id",
    title: "Lecturer Profile",
    code: "ad-lecturers",
    component: AdminLectureProfilePage,
    allowedRoles: ["admin"],
  },
  {
    link: "/admin/students",
    title: "Students",
    code: "ad-students",
    component: AdminStudents,
    allowedRoles: ["admin"],
  },
  {
    link: "/admin/students/:id",
    title: "Students Profile",
    code: "ad-students",
    component: StudentProfilePage,
    allowedRoles: ["admin"],
  },
];
export { routeData, authRouteData, vrificationRoute };
