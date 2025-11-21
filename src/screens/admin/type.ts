export interface IAdminDashboard {
  success: boolean;
  stats: IAdminStats;
}

export interface IAdminStats {
  totalStudents: number;
  totalLecturers: number;
  totalCourses: number;
  totalDepartments: number;
  currentSession: string;
  studentsByDepartment: IAdminStudentsByDepartment[];
  studentsByLevel: IAdminStudentsByLevel[];
}

export interface IAdminStudentsByDepartment {
  _id: string;
  count: number;
  departmentName: string;
}

export interface IAdminStudentsByLevel {
  _id: number;
  count: number;
}

export interface IAdminDepartment {
  success: boolean;
  count: number;
  departments: IDepartment[];
}

export interface IDepartment {
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
