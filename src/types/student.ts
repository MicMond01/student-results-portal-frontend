// src/types/student.ts
export type Student = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  enrolledAt: string;
  gpa: number;
  status: "Active" | "Probation" | "Alumni";
  avatarUrl?: string;
  source?: "Facebook" | "Instagram" | "LinkedIn" | "Github" | "Twitter";
};

export interface IStudentProfileDetails {
  success: boolean;
  profile: IStudentProfile;
  academics: IStudentAcademics;
  courses: IStudentCourse[];
  results: IStudentResult[];
}

export interface IStudentProfile {
  success: boolean;
  profile: StudentProfile;
}

export interface StudentProfile {
  id: string;
  name: string;
  identifier: string;
  role: string;
  matricNo: string;
  faculty: string;
  department: string;
  level: number;
  program: string;
  admissionYear: number;
  session: string;
  academicAdvisor: string;
  status: string;
  school: string;
  profilePhoto: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  placeOfBirth: string;
  stateOfOrigin: string;
  accountStatus: string;
  isVerified: boolean;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStudentAcademics {
  totalCourses: number;
  totalResults: number;
  cgpa: number;
  totalCreditUnits: number;
}

export interface IStudentCourse {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
  lecturer: IStudentLecturer;
}

export interface IStudentLecturer {
  email: any;
  _id: string;
  name: string;
}

export interface IStudentResult {
  session: string;
  semesters: Semesters;
}

export interface Semesters {
  First: IFirstSemester[];
  Second: ISecondSemester[];
}

export interface IFirstSemester {
  course: string;
  title: string;
  level: number;
  creditUnit: number;
  ca: number;
  exam: number;
  total: number;
  grade: string;
}

export interface ISecondSemester {
  course: string;
  title: string;
  level: number;
  creditUnit: number;
  ca: number;
  exam: number;
  total: number;
  grade: string;
}
