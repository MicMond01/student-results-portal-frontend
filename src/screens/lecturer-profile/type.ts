export interface ILecturerProfile {
  success: boolean;
  lecturer: ILecturerData;
  stats: ILecturerStats;
  latestCourse: ILecturerLatestCourse;
  courses: ILecturerCourse[];
}

export interface ILecturerData {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePhoto: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  staffId: string;
  department: string;
  faculty: string;
  school: string;
  rank: string;
  specialization: string;
  yearsOfExperience: number;
  officeLocation: string;
  highestDegree: string;
  institution: string;
}

export interface ILecturerStats {
  totalCourses: number;
  totalStudents: number;
  uniqueStudents: number;
  resultsUploaded: number;
}

export interface ILecturerLatestCourse {
  title: string;
  code: string;
  semester: string;
  session: string;
  level: number;
  studentCount: number;
}

export interface ILecturerCourse {
  id: string;
  title: string;
  code: string;
  semester: string;
  session: string;
  level: number;
  studentCount: number;
}
