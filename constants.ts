
import { ActivityItem, Certification, PhaseStatus, StudyResource, StudySession } from "./types";

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    name: 'NABCEP PV Associate',
    provider: 'Everblue',
    status: PhaseStatus.IN_PROGRESS,
    progress: 15,
    totalHours: 40,
    completedHours: 6,
    targetDate: '2025-12-15',
    cost: 999,
    paid: false,
    prerequisites: ['None'],
    practiceExamScores: [
      { date: '10/01', score: 45 },
      { date: '10/10', score: 58 },
      { date: '10/20', score: 65 }
    ]
  },
  {
    id: 'c2',
    name: 'NABCEP PVIP',
    provider: 'NABCEP',
    status: PhaseStatus.UPCOMING,
    progress: 0,
    totalHours: 58,
    completedHours: 0,
    targetDate: '2026-04-15',
    cost: 2000,
    paid: false,
    prerequisites: ['OSHA-10', '58hrs Training', '6 Project Credits']
  },
  {
    id: 'c3',
    name: 'NABCEP ESIP',
    provider: 'NABCEP',
    status: PhaseStatus.UPCOMING,
    progress: 0,
    totalHours: 58,
    completedHours: 0,
    targetDate: '2026-06-30',
    cost: 2500,
    paid: false,
    prerequisites: ['OSHA-30', 'Energy Storage Training', '6 Battery Projects']
  }
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: 'a1',
    type: 'study',
    title: 'Completed Module 1: PV Basics',
    timestamp: '2 hours ago',
    description: 'Finished the introductory module on photovoltaic cells.'
  },
  {
    id: 'a2',
    type: 'milestone',
    title: 'Freedom Solar Training Complete',
    timestamp: '1 day ago',
    description: 'Successfully completed initial onboarding and sales training.'
  },
  {
    id: 'a3',
    type: 'financial',
    title: 'Tuition Payment Pending',
    timestamp: '2 days ago',
    description: 'NABCEP PV Associate course payment due next week.'
  }
];

export const STUDY_RESOURCES: StudyResource[] = [
  { id: 'r1', title: 'Will Prowse Solar Blueprints', url: 'https://www.youtube.com/c/WillProwse', type: 'video', category: 'Technical' },
  { id: 'r2', title: 'Solar Professor: PV 101', url: 'https://www.solarprofessor.com/', type: 'video', category: 'Basics' },
  { id: 'r3', title: 'HeatSpring Practice Exam', url: 'https://www.heatspring.com/', type: 'exam', category: 'Assessment' },
  { id: 'r4', title: 'Rose City Robotics Free Tests', url: 'https://rosecityrobotics.com/', type: 'exam', category: 'Assessment' },
  { id: 'r5', title: 'NEC 2020 Code Book', url: 'https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70', type: 'article', category: 'Code' },
  { id: 'r6', title: 'Enphase IQ8 Install Guide', url: 'https://enphase.com/installers/resources/documentation', type: 'article', category: 'Technical Specs' },
  { id: 'r7', title: 'IronRidge Design Assistant', url: 'https://base.ironridge.com/', type: 'design_tool', category: 'Mounting' }
];

export const INITIAL_SESSIONS: StudySession[] = [
  { id: 's1', date: '2025-10-01', durationMinutes: 120, subject: 'PV Fundamentals', notes: 'Focused on irradiance and insolation differences.' },
  { id: 's2', date: '2025-10-02', durationMinutes: 180, subject: 'Electrical Basics', notes: 'Ohm\'s law practice problems.' },
  { id: 's3', date: '2025-10-03', durationMinutes: 60, subject: 'Safety (OSHA)', notes: 'Ladder safety and PPE requirements.' }
];
