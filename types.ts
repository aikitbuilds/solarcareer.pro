
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
  offlineAvailable?: boolean; 
}

// --- FINANCIAL TYPES ---

export interface Expense {
  id: string;
  category: 'Housing' | 'Food' | 'Transport' | 'Utilities' | 'Debt' | 'Subscription';
  name: string;
  amount: number;
  frequency: 'Monthly' | 'One-Time';
  isEssential: boolean;
}

export interface GrantOpportunity {
  id: string;
  name: string;
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
  verified: boolean;
  coordinates?: {
    lat: number;
    lng: number;
    accuracy: number;
  };
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
  title: string; // Renamed from label
  description?: string;
  category: 'Morning' | 'Training' | 'Evening' | 'Financial' | 'Career' | 'General';
  status: 'Todo' | 'In_Progress' | 'Done'; // Replaces 'completed' boolean
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: string;
  tags?: string[];
  source?: 'Manual' | 'AI_Coach' | 'CFO' | 'Career_Audit';
  timeEstimate?: string;
  completed?: boolean; // Deprecated, kept for temporary compat if needed, but we prefer status
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

// --- SYNC & CLOUD TYPES ---
export interface SyncSettings {
  externalAppUrl: string;
  firebaseConfig?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
  };
  lastSync: string | null;
  isConnected: boolean;
}

// --- AI ANALYSIS TYPES ---
export interface CFOAnalysisData {
  healthScore: number; // 0-100
  healthStatus: 'Critical' | 'Stable' | 'Healthy' | 'Robust';
  runwayMonths: number;
  burnDownData: { month: string; balance: number }[];
  savingsTable: { item: string; potentialSave: number; action: string }[];
  actionPlan: { task: string; priority: 'High'|'Medium'|'Low' }[];
  summary: string;
}

export interface CareerAuditData {
  summary: string;
  currentTrajectoryScore: number; // 0-100
  strengths: string[];
  gaps: string[];
  actionItems: {
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    category: string;
  }[];
}

// --- GLOBAL DATABASE TYPE ---
export interface AppData {
  userRole: UserRole;
  certifications: Certification[];
  investors: Investor[];
  investorUpdates: InvestorUpdate[];
  routineTasks: RoutineTask[];
  journal: JournalEntry[];
  fieldLogs: FieldLog[];
  expenses: Expense[];
  syncSettings: SyncSettings;
  lastSaved: string;
}
