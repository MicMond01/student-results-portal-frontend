export interface IAdminCourseResults {
  success: boolean;
  count: number;
  results: Result[];
}

export interface Result {
  _id: string;
  student: Student;
  course: Course;
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

export interface Department {
  _id: string;
  name: string;
  code: string;
  faculty: string;
}

export interface Course {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
}

//Course results filters

export interface CourseResultsFiltersState {
  query: string;
  level: number | null;
  grade: string;
}
