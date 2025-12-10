export interface IAdminSessions {
  success: boolean;
  count: number;
  sessions: ISession[];
}

export interface ISession {
  isCurrent: boolean;
  isActive: boolean;
  _id: string;
  session: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SessionFormData {
  session: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  isActive: boolean;
}
