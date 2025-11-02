export interface IExamsResponse {
  success: boolean;
  count: number;
  exams: IExam[];
}

export interface IExam {
  instructions: string;
  isActive: boolean;
  _id: string;
  course: IExamCourse;
  title: string;
  examType: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: IQuestion[];
  session: string;
  semester: string;
  startDate: string;
  endDate: string;
  createdBy: ICreatedBy;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IExamCourse {
  department: string;
  _id: string;
  code: string;
  title: string;
  level: number;
}

export interface IQuestion {
  options: string[];
  _id: string;
  questionType: string;
  question: string;
  modelAnswer?: string;
  marks: number;
  correctAnswer?: string;
}

export interface ICreatedBy {
  _id: string;
  name: string;
  identifier: string;
}
