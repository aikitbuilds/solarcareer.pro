export enum UserRole {
  ADMIN = 'Michael Tran',
  INVESTOR = 'Family Investor'
}

export enum PhaseStatus {
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In Progress',
  UPCOMING = 'Upcoming'
}

export interface StudySession {
  id: string;
  date: string;
  durationMinutes: number;
  subject: string;
  notes: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  status: PhaseStatus;
  progress: number; // 0-100
  totalHours: number;
  completedHours: number;
  targetDate: string;
  cost: number;
  paid: boolean;
  prerequisites: string[];
  practiceExamScores?: { date: string; score: number }[];
}

export interface ActivityItem {
  id: string;
  type: 'study' | 'milestone' | 'financial' | 'application';
  title: string;
  timestamp: string;
  description: string;
}

export interface StudyResource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'exam';
  category: string;
}