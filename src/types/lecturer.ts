export interface IStudentDataRoot {
  totalResults: number;
  totalStudents: number;
  data: IStudentData[];
}

export interface IStudentData {
  student: IStudent;
  results: IResult[];
}

export interface IStudent {
  _id: string;
  name: string;
  identifier: string;
}

export interface IResult {
  _id: string;
  course: ICourse;
  semester: string;
  session: string;
  ca: number;
  exam: number;
  total: number;
  grade: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICourse {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
}

// Lecturer Analytics Interfaces

export interface ILecturerAnalyticsRoot {
  success: boolean;
  analytics: ILecturerAnalytics;
}

export interface ILecturerAnalytics {
  overall: IOverallAnalytics;
  byCourse: IByCourse[];
  bySession: IBySession[];
}

export interface IOverallAnalytics {
  totalStudents: number;
  totalResults: number;
  totalSessions: number;
  overallAverageGPA: number;
  gradeDistribution: IGradeDistribution;
  totalCourses: number;
  passRate: string;
}

export interface IGradeDistribution {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

export interface IByCourse {
  courseId: string;
  title: string;
  code: string;
  totalStudents: number;
  passRate: string;
  gradeDistribution: IGradeDistribution;
  averageScore: string;
}

export interface IBySession {
  session: string;
  averageGPA: number;
  students: number;
  gradeDistribution: IGradeDistribution;
}

export interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

//Lecturer Courses

export interface ILecturerCourses {
  success: boolean;
  totalCourses: number;
  lecturerId: string;
  courses: ILecturerCourse[];
}

export interface ILecturerCourse {
  department: string;
  isActive: boolean;
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
  lecturer: string;
  createdAt: string;
  updatedAt: string;
}
