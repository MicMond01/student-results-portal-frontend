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
