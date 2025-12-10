export interface IAdminExams {
  success: boolean;
  count: number;
  exams: IExam[];
}

export interface IExam {
  instructions: string;
  isActive: boolean;
  _id: string;
  course?: IExamCourse;
  title: string;
  examType: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: IExamQuestion[];
  session: string;
  semester: string;
  createdBy?: CreatedBy;
  createdAt: string;
  updatedAt: string;
  __v: number;
  startDate?: string;
  endDate?: string;
}

export interface IExamCourse {
  _id: string;
  department: string;
  code: string;
  title: string;
  level: number;
}

export interface IExamQuestion {
  options: string[];
  _id: string;
  question: string;
  questionType: string;
  marks: number;
  modelAnswer?: string;
  correctAnswer?: string;
}

export interface CreatedBy {
  _id: string;
  name: string;
  identifier: string;
}

//Filter state
export interface ExamsFilterState {
  search: string;
  department: string;
  course: string;
  session: string;
}
