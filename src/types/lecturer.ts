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
