export interface IAdminAllLecturers {
  success: boolean;
  count: number;
  lecturers: IAdminLecturer[];
}

export interface IAdminLecturer {
  matricNo: any;
  faculty: string;
  department: IAdminDepartment;
  level: any;
  program: any;
  admissionYear: any;
  session: any;
  academicAdvisor: any;
  status: string;
  school: any;
  profilePhoto?: string;
  dateOfBirth: string;
  phone: string;
  email?: string;
  address?: string;
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
  __v: number;
  createdAt: string;
  updatedAt: string;
  gender: string;
  staffId: string;
  isHod: boolean;
}

export interface IAdminDepartment {
  _id: string;
  name: string;
  code: string;
  faculty: string;
}

//form data
export interface LecturerFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  staffId: string;
  department: string;
  rank: string;
  specialization: string;
  yearsOfExperience: number;
  highestDegree: string;
  institution: string;
  officeLocation: string;
  isHod: boolean;
}

export interface LecturerFilterState {
  query: string;
  department: string;
}