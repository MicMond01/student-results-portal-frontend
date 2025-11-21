export interface AdminCourses {
  success: boolean;
  count: number;
  courses: AdminCourse[];
}

export interface AdminCourse {
  students: string[];
  description?: string;
  courseType: string;
  isActive: boolean;
  maxStudents: any;
  _id: string;
  department: AdminDepartment;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
  lecturer: Lecturer;
  __v: number;
  createdAt: string;
  updatedAt: string;
  prerequisites?: string;
}

export interface AdminDepartment {
  _id: string;
  name: string;
  code: string;
  faculty: string;
}

export interface Lecturer {
  email?: string;
  _id: string;
  name: string;
}

export interface CourseFormData {
  title: string;
  code: string;
  creditUnit: number;
  semester: "First" | "Second";
  level: 100 | 200 | 300 | 400 | 500 | 600;
  session: string;
  lecturer: string; // Will store lecturer ID
  department: string; // Will store department ID
  courseType: string;
  description: string;
  maxStudents: number | null;
}

export interface CourseFilterState {
  query: string;
  session: string;
  level: string;
  department: string;
}

export interface IFilteredCourse {
  students: string[];
  description?: string;
  courseType: string;
  isActive: boolean;
  maxStudents: any;
  _id: string;
  department: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
  lecturer: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  prerequisites?: string;
}
