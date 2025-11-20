
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
  type: 'video' | 'article' | 'exam' | 'simulation' | 'design_tool';
  category: string;
}

// --- NEW TYPES FOR IMPROVEMENTS ---

export interface GrantOpportunity {
  id: string;
  name: string; // e.g., "WIOA Workforce Grant"
  amount: number;
  status: 'Not Started' | 'Applied' | 'Approved' | 'Denied';
  deadline: string;
  requirements: string[];
}

export interface FieldLog {
  id: string;
  date: string;
  location: string;
  hours: number;
  task: string;
  verified: boolean; // Simulates GPS/Supervisor verification
}

export interface JournalEntry {
  id: string;
  date: string;
  type: 'Morning Plan' | 'Evening Review';
  content: string;
  mood: 'High' | 'Neutral' | 'Low';
  aiFeedback?: string;
}

export interface RoutineTask {
  id: string;
  label: string;
  category: 'Morning' | 'Training' | 'Evening';
  completed: boolean;
  timeEstimate?: string;
}

// --- INVESTOR CRM TYPES ---

export interface Investor {
  id: string;
  name: string;
  type: 'Equity' | 'Loan' | 'Grant';
  status: 'Prospect' | 'Contacted' | 'Committed' | 'Wired';
  amount: number;
  email: string;
  lastContact: string;
  notes: string;
}

export interface InvestorUpdate {
  id: string;
  date: string;
  subject: string;
  preview: string;
  sentTo: number;
}