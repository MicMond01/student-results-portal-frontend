export interface IAdminDepartmentLecturers {
  success: boolean;
  department: IAdminDepartment;
  count: number;
  lecturers: IAdminLecturer[];
}

export interface IAdminDepartment {
  description: string;
  hod: any;
  hodName: string;
  hodEmail?: string;
  officeLocation?: string;
  phone?: string;
  isActive: boolean;
  _id: string;
  name: string;
  code: string;
  faculty: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAdminLecturer {
  matricNo: any;
  faculty: string;
  department: string;
  level: any;
  program: any;
  admissionYear: any;
  session: any;
  academicAdvisor: any;
  status: string;
  school: any;
  profilePhoto: any;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: any;
  placeOfBirth: any;
  stateOfOrigin: any;
  jambNo: any;
  rank: string;
  specialization: string;
  yearsOfExperience: number;
  officeLocation: string;
  highestDegree: string;
  institution: string;
  accountStatus: string;
  isFirstLogin: boolean;
  isVerified: boolean;
  isUsingDefaultPassword: boolean;
  previousPasswords: any[];
  departmentName: any;
  _id: string;
  name: string;
  identifier: string;
  role: string;
  staffId: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAdminSingleDepatment {
  success: boolean;
  department: IAdminDepartment;
  statistics: IDeptStatistics;
}



export interface IDeptStatistics {
  totalLecturers: number;
  totalStudents: number;
  studentsByLevel: IStudentsByLevel;
  totalCourses: number;
  coursesByLevel: ICoursesByLevel;
}

export interface IStudentsByLevel {
  "200": number;
}

export interface ICoursesByLevel {
  "100": number;
  "200": number;
}
