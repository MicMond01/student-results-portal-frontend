export interface IStudentResunts {
  success: boolean
  totalResults: number
  statistics: IStatistics
  results: IResult[]
}

export interface IStatistics {
  cgpa: number
  totalCreditUnits: number
}

export interface IResult {
  session: string
  semesters: ISemesters
}

export interface ISemesters {
  First: IFirstSemester[]
  Second: ISecondSemester[]
}

export interface IFirstSemester {
  course: string
  title: string
  level: number
  creditUnit: number
  ca: number
  exam: number
  total: number
  grade: string
}

export interface ISecondSemester {
  course: string
  title: string
  level: number
  creditUnit: number
  ca: number
  exam: number
  total: number
  grade: string
}
