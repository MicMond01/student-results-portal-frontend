export interface ILecturerCourseDetails {
  success: boolean;
  course: Course;
  stats: Stats;
  students: ILecturerCourseStudent[];
  results: ILecturerCourseResult[];
  studentsWithoutResults: StudentsWithoutResult[];
}

export interface Course {
  _id: string;
  title: string;
  code: string;
  creditUnit: number;
  level: number;
  semester: string;
  session: string;
  department: Department;
  isActive: boolean;
}

export interface Department {
  _id: string;
  name: string;
  code: string;
  faculty: string;
}

export interface Stats {
  totalStudents: number;
  totalResults: number;
  pendingResults: number;
  averageScore: string;
  passRate: string;
  gradeDistribution: GradeDistribution;
}

export interface GradeDistribution extends Record<string, number> {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

export interface ILecturerCourseStudent {
  matricNo: string;
  department: Department2;
  level: number;
  email: string;
  _id: string;
  name: string;
}

export interface Department2 {
  _id: string;
  name: string;
  code: string;
}

export interface ILecturerCourseResult {
  _id: string;
  student: Student2;
  course: string;
  ca: number;
  exam: number;
  semester: string;
  session: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  total: number;
  grade: string;
  __v: number;
}

export interface Student2 {
  matricNo: string;
  level: number;
  _id: string;
  name: string;
}

export interface StudentsWithoutResult {
  matricNo: string;
  department: Department3;
  level: number;
  email: string;
  _id: string;
  name: string;
}

export interface Department3 {
  _id: string;
  name: string;
  code: string;
}
