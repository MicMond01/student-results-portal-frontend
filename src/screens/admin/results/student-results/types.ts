export interface IAdminStdentResults {
  success: boolean;
  count: number;
  results: IStudentResult[];
}

export interface IStudentResult {
  _id: string;
  student: IStudentInfo;
  course: IStudentCourse;
  session: string;
  semester: string;
  ca: number;
  exam: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  total: number;
  grade: string;
  __v: number;
}

export interface IStudentInfo {
  matricNo: string;
  department: Department;
  level: number;
  program: string;
  admissionYear: number;
  session: string;
  status: string;
  phone: string;
  email: string;
  _id: string;
  name: string;
  gender: string;
}

export interface IStudentCourse {
  _id: string;
  department: Department2;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
}

export interface GroupedStudentData {
  student: IStudentInfo;
  results: IStudentResult[];
  averageScore: number;
  totalUnits: number;
  cgpa: number; // Mock CGPA
}

export interface Department {
  _id: string;
  name: string;
  code: string;
  faculty: string;
}

export interface Department2 {
  _id: string;
  name: string;
  code: string;
}

export interface IAdminStudentResult {
  success: boolean;
  count: number;
  student: IAdminStudentDetails;
  results: IStudentResult[];
}

export interface IAdminStudentDetails {
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
  previousPasswords: any[];
  departmentName: any;
  _id: string;
  name: string;
  identifier: string;
  role: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Department {
  _id: string;
  faculty: string;
  name: string;
  code: string;
}

export interface Course {
  _id: string;
  department: Department2;
  title: string;
  code: string;
  creditUnit: number;
  level: number;
  semester: string;
  session: string;
}

export interface Department2 {
  _id: string;
  name: string;
  code: string;
}

//Lecturer Results

export interface IAdminLecturerResults {
  success: boolean;
  lecturer: Lecturer;
  courses: Course[];
  totalResults: number;
  results: Result[];
}

export interface Lecturer {
  _id: string;
  name: string;
  email: string;
}

export interface Course {
  _id: string;
  title: string;
  code: string;
}

export interface Result {
  _id: string;
  student: Student;
  course: Course2;
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

export interface Student {
  matricNo: string;
  department: Department;
  level: number;
  _id: string;
  name: string;
}

export interface Department {
  _id: string;
  name: string;
  code: string;
}

export interface Course2 {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
}

// FIlters for lecturer result Table

export interface LecturerResultsFiltersState {
  query: string;
  level: number | null;
  grade: string;
  course: string;
}

