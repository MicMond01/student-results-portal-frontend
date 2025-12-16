export interface IFilterState {
  studentName: string;
  session: string;
  courseCode: string;
}

export interface IFilteredResult {
  _id: string;
  studentId: string;
  studentName: string;
  studentIdentifier: string;
  courseCode: string;
  courseTitle: string;
  creditUnit: number;
  level: number;
  semester: string;
  session: string;
  ca: number;
  exam: number;
  total: number;
  grade: string;
  createdAt: string;
  updatedAt: string;
}

/// Types for API response
export interface IStudentResultWithProfile {
  result: IStudentResult;
  student: IStudentInfo;
}

export interface IStudentResult {
  _id: string;
  student: IStudentInfo;
  course: IStudentCourse;
  semester: string;
  session: string;
  ca: number;
  exam: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  grade: string;
  __v: number;
  uploadedBy: UploadedBy;
}

export interface IStudentInfo {
  _id: string;
  name: string;
  identifier: string;
  matricNo: string;
}

export interface IStudentCourse {
  _id: string;
  code: string;
  title: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
}

export interface UploadedBy {
  _id: string;
  name: string;
  role: string;
}

export interface Student2 {
  _id: string;
  name: string;
  identifier: string;
}
