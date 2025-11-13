export interface ICourses {
  success: boolean;
  totalCourses: number;
  groupedCourses: IGroupedCourse[];
}

export interface IGroupedCourse {
  session: string;
  semesters: ISemestersCourses;
  totalCourses: number;
  totalCreditUnits: number;
}

export interface ISemestersCourses {
  First: ISemesterCourse[];
  Second: ISemesterCourse[];
}

export interface ISemesterCourse {
  id: string;
  title: string;
  code: string;
  creditUnit: number;
  level: number;
  lecturer: Lecturer1;
}

export interface Lecturer1 {
  id: string;
  name: string;
  email: any;
}

export interface Lecturer2 {
  id: string;
  name: string;
  email: any;
}
