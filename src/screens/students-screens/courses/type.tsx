//=========== Courses ===========//

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
  identifier: string;
}

export interface Lecturer2 {
  id: string;
  name: string;
  email: any;
  identifier: string;
}

//=========== Registered Courses ===========//

export interface IStudentRegisteredCourses {
  success: boolean;
  count: number;
  courses: IRegisteredCourse[];
}

export interface IRegisteredCourse {
  _id: string;
  department: Department;
  isActive: boolean;
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
  isRegistered: boolean;
  isRegistrationOpen: boolean;
  canRegister: boolean;
  unit: number;
  courseType?: string;
  description?: string;
  maxStudents: any;
  registrationOpen?: boolean;
  registrationOpenDate?: string;
}

export interface Department {
  _id: string;
  name: string;
  code: string;
}

export interface Lecturer {
  _id: string;
  name: string;
  email?: string;
  identifier: string;
}

//=========== Unregistered Courses ===========//

export interface IStudentUnregisteredCourses {
  success: boolean;
  count: number;
  courses: IUnregisteredCourse[];
}

export interface IUnregisteredCourse {
  _id: string;
  description: string;
  courseType: string;
  isActive: boolean;
  maxStudents?: number;
  title: string;
  code: string;
  creditUnit: number;
  semester: string;
  level: number;
  session: string;
  lecturer: ICourseLecturer;
  department: Department;
  createdAt: string;
  updatedAt: string;
  __v: number;
  registrationOpen?: boolean;
  registrationOpenDate?: string;
  registrationDeadline?: string;
  isRegistered: boolean;
  isRegistrationOpen: boolean;
  canRegister: boolean;
  unit: number;
}

export interface ICourseLecturer {
  _id: string;
  email: string;
  name: string;
  identifier: string;
}

export interface Department {
  _id: string;
  name: string;
  code: string;
}
