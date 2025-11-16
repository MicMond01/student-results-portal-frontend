export interface IAdminDashboard {
  success: boolean
  stats: IAdminStats
}

export interface IAdminStats {
  totalStudents: number
  totalLecturers: number
  totalCourses: number
  totalDepartments: number
  currentSession: string
  studentsByDepartment: IAdminStudentsByDepartment[]
  studentsByLevel: IAdminStudentsByLevel[]
}

export interface IAdminStudentsByDepartment {
  _id: string
  count: number
  departmentName: string
}

export interface IAdminStudentsByLevel {
  _id: number
  count: number
}
