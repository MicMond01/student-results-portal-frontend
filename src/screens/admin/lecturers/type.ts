export interface IAdminAllLecturers {
  success: boolean;
  count: number;
  lecturers: IAdminLecturer[];
}

export interface IAdminLecturer {
  matricNo: any;
  faculty: string;
  department: IAdminDepartment;
  level: any;
  program: any;
  admissionYear: any;
  session: any;
  academicAdvisor: any;
  status: string;
  school: any;
  profilePhoto?: string;
  dateOfBirth: string;
  phone: string;
  email?: string;
  address?: string;
  placeOfBirth: any;
  stateOfOrigin: any;
  jambNo: any;
  rank: string;
  specialization: string;
  yearsOfExperience: number;
  officeLocation: string;
  highestDegree: string;
  institution: string;
  accountStatus: string;
  isFirstLogin: boolean;
  isVerified: boolean;
  isUsingDefaultPassword: boolean;
  previousPasswords: any[];
  departmentName: any;
  _id: string;
  name: string;
  identifier: string;
  role: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  gender: string;
  staffId: string;
  isHod: boolean;
}

export interface IAdminDepartment {
  _id: string;
  name: string;
  code: string;
  faculty: string;
}

//form data
export interface LecturerFormData {
  name: string;
  email: string;
  identifier: string;
  password: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  staffId: string;
  department: string;
  rank: string;
  specialization: string;
  yearsOfExperience: number;
  highestDegree: string;
  institution: string;
  officeLocation: string;
}

export interface LecturerFilterState {
  query: string;
  department: string;
}

export interface IAdminStats {
  success: boolean;
  lecturer: IAdminLecturer;
  stats: IAdminStatStats;
  courses: IAdminStatCourse[];
  exams: IAdminStatExam[];
  recentResults: IAdminStatRecentResult[];
}

export interface IAdminStatDepartment {
  _id: string;
  name: string;
  code: string;
  faculty: string;
}

export interface IAdminStatStats {
  totalCourses: number;
  totalStudentsAcrossAllCourses: number;
  totalResultsUploaded: number;
  coursesBySession: IAdminStatCoursesBySession;
  coursesByLevel: IAdminStatCoursesByLevel;
  coursesBySemester: IAdminStatCoursesBySemester;
  averagePerformance: string;
  gradeDistribution: IAdminStatGradeDistribution;
  passRate: string;
}

export interface IAdminStatCoursesBySession {
  "2024/2025": number;
}

export interface IAdminStatCoursesByLevel {
  "200": number;
}

export interface IAdminStatCoursesBySemester {
  First: number;
  Second: number;
}

export interface IAdminStatGradeDistribution {
  [key: string]: number;
}

export interface IAdminStatCourse {
  _id: string;
  code: string;
  title: string;
  level: number;
  semester: string;
  session: string;
  department: IAdminStatDepartment2;
  totalStudents: number;
  totalResults: number;
  averageScore: string;
  passRate: string;
  gradeDistribution: IAdminStatGradeDistribution2;
}

export interface IAdminStatDepartment2 {
  _id: string;
  name: string;
  code: string;
}

export interface IAdminStatGradeDistribution2 {
  B: number;
  A: number;
  F: number;
  C: number;
  E: number;
  D: number;
}

export interface IAdminStatExam {
  isActive: boolean;
  _id: string;
  course: IAdminStatCourse2;
  title: string;
  examType: string;
  totalMarks: number;
  session: string;
  semester: string;
}

export interface IAdminStatCourse2 {
  _id: string;
  code: string;
  title: string;
}

export interface IAdminStatRecentResult {
  _id: string;
  student: IAdminStatStudent;
  course: IAdminStatCourse3;
  total: number;
  grade: string;
  session: string;
  semester: string;
}

export interface IAdminStatStudent {
  matricNo: string;
  _id: string;
  name: string;
}

export interface IAdminStatCourse3 {
  _id: string;
  code: string;
  title: string;
}
