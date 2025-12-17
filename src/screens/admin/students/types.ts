export interface IAdminStudents {
  success: boolean;
  count: number;
  students: IAdminStudent[];
}

export interface IAdminStudent {
  matricNo: string;
  faculty: string;
  department: Department;
  level: number;
  program: string;
  admissionYear: number;
  session: string;
  academicAdvisor: string;
  status: string;
  school: string;
  profilePhoto: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  placeOfBirth: string;
  stateOfOrigin: string;
  jambNo: string;
  rank: any;
  specialization: any;
  yearsOfExperience: any;
  officeLocation: any;
  highestDegree: any;
  institution: any;
  accountStatus: string;
  isFirstLogin: boolean;
  isVerified: boolean;
  isUsingDefaultPassword: boolean;
  previousPasswords: string[];
  departmentName?: string;
  _id: string;
  name: string;
  identifier: string;
  role: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  verifiedAt?: string;
  lastPasswordChange?: string;
}

export interface Department {
  _id: string;
  faculty: string;
  name: string;
  code: string;
}

//Single Student Type

export interface IAdminStudentData {
  success: boolean;
  student: IAdminStudent;
  stats: Stats;
  courses: Courses;
  results: Results;
  allResults: AllResult[];
}

export interface Department {
  _id: string;
  name: string;
  code: string;
  faculty: string;
}

export interface Stats {
  totalCoursesRegistered: number;
  totalResults: number;
  cgpa: number;
  currentSessionGPA: number;
  totalCreditUnits: number;
  resultsBySession: ResultsBySession;
  gradeDistribution: GradeDistribution;
  averageScore: string;
  passRate: string;
  academicStanding: string;
}

export interface ResultsBySession {
  "2024/2025": N20242025;
  "2023/2024": N20232024;
}

export interface N20242025 {
  count: number;
  courses: Course[];
}

export interface Course {
  code: string;
  title: string;
  grade: string;
  total: number;
}

export interface N20232024 {
  count: number;
  courses: Course2[];
}

export interface Course2 {
  code: string;
  title: string;
  grade: string;
  total: number;
}

export interface GradeDistribution {
  C: number;
  B: number;
  A: number;
  E: number;
}

export interface Courses {
  "100": N100;
  "200": N200;
}

export interface N100 {
  First: First[];
  Second: Second[];
}

export interface First {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  lecturer: Lecturer;
  session: string;
}

export interface Lecturer {
  email: any;
  rank: string;
  _id: string;
  name: string;
}

export interface Second {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  lecturer: Lecturer2;
  session: string;
}

export interface Lecturer2 {
  email: any;
  rank: string;
  _id: string;
  name: string;
}

export interface N200 {
  First: First2[];
  Second: Second2[];
}

export interface First2 {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  lecturer: Lecturer3;
  session: string;
}

export interface Lecturer3 {
  email: any;
  rank: string;
  _id: string;
  name: string;
}

export interface Second2 {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  lecturer: Lecturer4;
  session: string;
}

export interface Lecturer4 {
  email?: string;
  rank: string;
  _id: string;
  name: string;
}

export interface Results {
  First: First3[];
  Second: Second3[];
}

export interface First3 {
  _id: string;
  student: string;
  course: Course3;
  semester: string;
  session: string;
  ca: number;
  exam: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  grade: string;
  __v: number;
  uploadedBy: string;
}

export interface Course3 {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
}

export interface Second3 {
  _id: string;
  student: string;
  course: Course4;
  semester: string;
  session: string;
  ca: number;
  exam: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  grade: string;
  __v: number;
  uploadedBy: string;
}

export interface Course4 {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
}

export interface AllResult {
  _id: string;
  student: string;
  course: Course5;
  semester: string;
  session: string;
  ca: number;
  exam: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  grade: string;
  __v: number;
  uploadedBy: string;
}

export interface Course5 {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
}

//Students Filters

export interface StudentFilterState {
  query: string;
  department: string;
  level: string;
  status: string;
}

//Form for Create and Edit Student

export interface StudentFormData {
  name: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  matricNo: string;
  jambNo: string;
  department: string;
  level: number;
  program: string;
  gender: string;
  address: string;
  academicAdvisor: string;
}
