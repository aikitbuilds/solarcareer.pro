# SolarCareer Pro - Full Application Source Code

This document contains the complete source code for the SolarCareer Pro application.

## Table of Contents
1. [Configuration & Entry Points](#configuration--entry-points)
2. [Types & Constants](#types--constants)
3. [Services](#services)
4. [Contexts](#contexts)
5. [Components](#components)

---

## Configuration & Entry Points

### package.json
```json
{
  "name": "solar-career-pro",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "node server.js"
  },
  "dependencies": {
    "@google/genai": "^1.30.0",
    "express": "^4.18.2",
    "lucide-react": "^0.554.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "recharts": "^3.4.1"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.2.2",
    "vite": "^5.1.4"
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }
});
```

### index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solar Career Transformation Manager</title>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#3B82F6" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              solar: {
                500: '#F59E0B', // Solar Gold
                600: '#D97706',
              },
              electric: {
                500: '#3B82F6', // Electric Blue
                600: '#2563EB',
                900: '#1E3A8A',
              }
            },
            animation: {
              'spin-slow': 'spin 8s linear infinite',
              'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
              }
            }
          }
        }
      }
    </script>
  <script type="importmap">
{
  "imports": {
    "react": "https://aistudiocdn.com/react@^19.2.0",
    "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
    "react/": "https://aistudiocdn.com/react@^19.2.0/",
    "@google/genai": "https://aistudiocdn.com/@google/genai@^1.30.0",
    "lucide-react": "https://aistudiocdn.com/lucide-react@^0.554.0",
    "recharts": "https://aistudiocdn.com/recharts@^3.4.1",
    "@vitejs/plugin-react": "https://aistudiocdn.com/@vitejs/plugin-react@^5.1.1",
    "vite": "https://aistudiocdn.com/vite@^7.2.4",
    "path": "https://aistudiocdn.com/path@^0.12.7",
    "url": "https://aistudiocdn.com/url@^0.11.4",
    "express": "https://aistudiocdn.com/express@^5.1.0"
  }
}
</script>
</head>
  <body class="bg-slate-50 text-slate-900 antialiased">
    <div id="root"></div>
    <!-- Entry point for Vite build -->
    <script type="module" src="/index.tsx"></script>
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    </script>
  </body>
</html>
```

### index.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### App.tsx
```typescript
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { CertificationTracker } from './components/CertificationTracker';
import { RealPositions } from './components/RealPositions';
import { Portfolio } from './components/Portfolio';
import { AICoach } from './components/AICoach';
import { Financials } from './components/Financials';
import { Investors } from './components/Investors';
import { ProjectRoadmap } from './components/ProjectRoadmap';
import { DataManagement } from './components/DataManagement';
import { Documentation } from './components/Documentation';
import { UserRole } from './types';
import { INITIAL_CERTIFICATIONS, RECENT_ACTIVITY } from './constants';
import { DataProvider } from './contexts/DataContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);
  const [navAction, setNavAction] = useState<string | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            userRole={userRole} 
            progress={15} 
            certifications={INITIAL_CERTIFICATIONS}
            recentActivity={RECENT_ACTIVITY}
            onNavigate={setCurrentPage}
          />
        );
      case 'certifications':
        return (
          <CertificationTracker 
            certifications={INITIAL_CERTIFICATIONS} 
            initialAction={navAction}
            onClearAction={() => setNavAction(null)}
          />
        );
      case 'real-positions':
        return <RealPositions />;
      case 'portfolio':
        return <Portfolio />;
      case 'ai-coach':
        return (
          <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]">
             <AICoach 
                onNavigate={setCurrentPage}
                onAction={setNavAction}
             />
          </div>
        );
      case 'financials':
        return <Financials />;
      case 'investors':
        return <Investors />;
      case 'app-roadmap':
        return <ProjectRoadmap />;
      case 'data-management':
        return <DataManagement />;
      case 'documentation':
        return <Documentation />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;
```

### server.js
```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the dist directory built by Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### app.yaml
```yaml
runtime: nodejs18
env: standard
instance_class: F1
automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 0
  max_instances: 1
```

### manifest.json
```json
{
  "name": "SolarCareer Transformation Manager",
  "short_name": "SolarCareer",
  "description": "Mission control for solar career transformation.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3B82F6",
  "orientation": "portrait",
  "icons": [
    {
      "src": "https://via.placeholder.com/192x192.png?text=SC",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "https://via.placeholder.com/512x512.png?text=SC",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### sw.js
```javascript
const CACHE_NAME = 'solarcareer-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts'
];

// Install event - Cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch event - Cache First, then Network strategy for static, Network first for others
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }
      // Otherwise, fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Clone response to put into cache
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          // Only cache specific file types to simulate "Offline Learning Materials"
          if (event.request.url.endsWith('.pdf') || event.request.url.includes('guide')) {
              cache.put(event.request, responseToCache);
          }
        });

        return networkResponse;
      });
    })
  );
});
```

---

## Types & Constants

### types.ts
```typescript
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

export interface WeeklyRecap {
  id: string;
  weekStartDate: string;
  totalTasksCompleted: number;
  averageMood: string;
  keyWins: string[];
  lessonsLearned: string[];
  aiStrategyForNextWeek: string;
  score: number; // 0-100
}

export interface ResearchResult {
  topic: string;
  summary: string;
  prerequisites: string[];
  estimatedCost: string;
  timeline: string;
  resources: { title: string; url: string }[];
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
  weeklyRecaps: WeeklyRecap[]; // New field
  fieldLogs: FieldLog[];
  expenses: Expense[];
  syncSettings: SyncSettings;
  lastSaved: string;
}
```

### constants.ts
```typescript
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
```

---

## Services

### services/geminiService.ts
```typescript
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real app, we handle missing keys gracefully. 
// For this demo, we instantiate if key exists or handle errors at call time.

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateStudyPlan = async (topic: string, hoursAvailable: number): Promise<string> => {
  if (!ai) return "Error: API Key not found.";
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a detailed ${hoursAvailable}-hour study plan for the solar topic: "${topic}". 
      Focus on NABCEP PV Associate exam preparation. 
      Break it down into 1-hour blocks with specific learning objectives and a quick quiz question for each block.`,
    });
    return response.text || "No plan generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate study plan. Please try again.";
  }
};

export const askSolarCoach = async (question: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert Life & Career Strategy Coach.
      
      User Question: "${question}"
      
      Provide a clear, concise explanation. If it's a technical question, provide steps. If it's life advice, use First Principles.`,
    });
    return response.text || "No answer generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Coach is currently offline (API Error).";
  }
};

export const researchCareerTopic = async (topic: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Research the career/skill topic: "${topic}".
      
      Return a structured JSON response (DO NOT return markdown code blocks, just the raw JSON string) with:
      {
        "topic": "${topic}",
        "summary": "Brief overview (2 sentences)",
        "prerequisites": ["item 1", "item 2"],
        "estimatedCost": "$X - $Y",
        "timeline": "X months",
        "resources": [ { "title": "Resource Name", "url": "https://..." } ]
      }`,
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "{}";
  }
};

export const generateWeeklyRecap = async (journalEntries: string[], tasksCompleted: number, totalTasks: number): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a Senior Performance Coach. Analyze my week.
      
      Data:
      - Tasks Completed: ${tasksCompleted}/${totalTasks}
      - Journal Excerpts: ${JSON.stringify(journalEntries)}
      
      Output a JSON string (no markdown) with:
      {
        "keyWins": ["Win 1", "Win 2"],
        "lessonsLearned": ["Lesson 1", "Lesson 2"],
        "aiStrategyForNextWeek": "A paragraph of specific strategic advice for the upcoming week.",
        "score": 85 (Calculate a score 0-100 based on the data)
      }`,
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "{}";
  }
};

export const draftDailyPlan = async (priorities: string[], backlog: string[]): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a schedule for tomorrow.
      
      Priorities: ${priorities.join(', ')}
      Backlog Tasks: ${backlog.join(', ')}
      
      Output a simple text schedule (e.g., "08:00 AM - Task").`,
    });
    return response.text || "Planning failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Planning Offline.";
  }
};

export const getCareerAudit = async (): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the career profile. 
      Current Status: Studying for NABCEP PV Associate.
      Target: Project Manager.
      
      Identify 5 specific, high-impact "Improvement Actions" or "Speed Hacks" to accelerate this timeline. 
      
      Format the output as a clean, bulleted list with a bold title for each point.`,
    });
    return response.text || "No audit generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Career Audit system is currently offline (API Error).";
  }
};

export const analyzeReflection = async (entry: string, type: 'Morning Plan' | 'Evening Review'): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the "Accountability Mirror" AI.
      
      The user has submitted a ${type}: "${entry}"
      
      Your Task:
      1. Analyze the entry for weakness, excuses, or redundancy.
      2. Provide 3 bullet points of highly specific, actionable feedback.
      3. Reference principles like the 40% Rule or First Principles.
      
      Tone: Ruthless, precise, no fluff.`,
    });
    return response.text || "No feedback generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Accountability System Offline.";
  }
};

export const getDeepDiveContent = async (strategy: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an Elite Performance Coach.
      
      The user requested a Deep Dive into: "${strategy}".
      
      Structure your response:
      1. **The Concept**: Definition.
      2. **Career Application**: How it applies to professional growth.
      3. **The Drill**: A specific, immediate 5-minute exercise.
      
      Tone: Intense, authoritative.`,
    });
    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Deep Dive Protocol Offline.";
  }
};

export const getTacticalAdvice = async (phase: string, completed: string[], pending: string[]): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a tactical performance coach.
      Current Phase: ${phase}
      Tasks Completed: ${completed.join(', ')}
      Tasks Remaining: ${pending.join(', ')}
      
      Give me 2 sentences of high-intensity advice.`,
    });
    return response.text || "No advice generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tactical Uplink Offline.";
  }
};

export const draftInvestorUpdate = async (topic: string, context: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a professional, confident email update to stakeholders.
      
      Topic: ${topic}
      Context: ${context}
      Tone: Professional, transparent, high-energy, results-oriented.`,
    });
    return response.text || "No draft generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Drafting System Offline.";
  }
};

// --- FINANCIAL AI SERVICES ---

export const analyzeFinancialHealth = async (expenses: any[], income: number): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a Startup CFO.
      
      Monthly Burn: $${expenses.reduce((sum, e) => sum + e.amount, 0)}
      Cash: $${income}
      Expense List: ${JSON.stringify(expenses)}
      
      Task:
      1. Calculate Runway.
      2. Identify 2 "Fat Cutting" actions.
      3. Suggest 1 revenue strategy.
      
      Output valid JSON: { "healthScore": 80, "runwayMonths": 5, "burnDownData": [], "savingsTable": [], "actionPlan": [], "summary": "" }`,
    });
    return response.text || "Analysis failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "CFO System Offline.";
  }
};

export const negotiateBill = async (provider: string, amount: number, serviceType: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a negotiation script for ${provider} (${serviceType}, $${amount}).
      Strategies: Competitor offers, retention offers.`,
    });
    return response.text || "Script generation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Negotiator Offline.";
  }
};

export const analyzeBankStatement = async (base64Data: string, mimeType: string = 'application/pdf'): Promise<{ text: string, suggestedExpenses: any[] }> => {
  if (!ai) return { text: "Error: API Key not found.", suggestedExpenses: [] };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        },
        {
          text: `Analyze this bank statement for expenses.
          Return JSON list in format: [EXPENSE_START][ ...json... ][EXPENSE_END]`
        }
      ]
    });

    const rawText = response.text || "";
    
    let suggestedExpenses = [];
    const jsonMatch = rawText.match(/\[EXPENSE_START\]([\s\S]*?)\[EXPENSE_END\]/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        suggestedExpenses = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse expense JSON", e);
      }
    }
    const displayText = rawText.replace(/\[EXPENSE_START\][\s\S]*?\[EXPENSE_END\]/, '').trim();

    return { text: displayText, suggestedExpenses };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Failed to analyze document.", suggestedExpenses: [] };
  }
};
```

---

## Contexts

### contexts/DataContext.tsx
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, UserRole, Certification, Investor, InvestorUpdate, RoutineTask, JournalEntry, FieldLog, Expense, WeeklyRecap } from '../types';
import { INITIAL_CERTIFICATIONS } from '../constants';

// Initial State Defaults
const DEFAULT_TASKS: RoutineTask[] = [
  { id: 'm1', title: 'Wake up @ 5:00 AM', category: 'Morning', status: 'Todo', priority: 'High', timeEstimate: '05:00' },
  { id: 'm2', title: 'Hydrate + Electrolytes', category: 'Morning', status: 'Todo', priority: 'High' },
  { id: 'm3', title: 'Physical Activation (Zone 2)', category: 'Morning', status: 'Todo', priority: 'Medium', timeEstimate: '30 min' },
  { id: 'm4', title: 'Review Goals (The Protocol)', category: 'Morning', status: 'Todo', priority: 'High' },
  { id: 't1', title: 'Deep Work Block 1 (Study)', category: 'Training', status: 'Todo', priority: 'High', timeEstimate: '90 min', description: 'Focus on active recall.' },
  { id: 't2', title: 'Hands-on Sim (SkillCat)', category: 'Training', status: 'Todo', priority: 'Medium', timeEstimate: '30 min' },
  { id: 't3', title: 'Networking Outreach (3 Contacts)', category: 'Training', status: 'Todo', priority: 'Medium' },
  { id: 'e1', title: 'Review Daily Metrics', category: 'Evening', status: 'Todo', priority: 'Medium' },
  { id: 'e2', title: 'Plan Tomorrow', category: 'Evening', status: 'Todo', priority: 'High' },
  { id: 'e3', title: 'Disconnect Tech', category: 'Evening', status: 'Todo', priority: 'Low', timeEstimate: '21:00' },
];

const DEFAULT_INVESTORS: Investor[] = [
    { id: '1', name: 'Family Trust A', type: 'Loan', status: 'Wired', amount: 15000, email: 'family@trust.com', lastContact: '2025-10-20', notes: 'Repayment via salary garnish starts Jan 2026.' },
    { id: '2', name: 'Angel Investor B', type: 'Equity', status: 'Committed', amount: 10000, email: 'angel@vc.com', lastContact: '2025-10-22', notes: 'Waiting on Phase 1 completion proof.' },
    { id: '3', name: 'WIOA Grant', type: 'Grant', status: 'Prospect', amount: 4000, email: 'case.manager@texas.gov', lastContact: '2025-10-25', notes: 'Application pending review.' },
];

const DEFAULT_EXPENSES: Expense[] = [
  { id: 'ex1', category: 'Housing', name: 'Rent', amount: 1200, frequency: 'Monthly', isEssential: true },
  { id: 'ex2', category: 'Food', name: 'Groceries', amount: 400, frequency: 'Monthly', isEssential: true },
  { id: 'ex3', category: 'Utilities', name: 'Internet (Comcast)', amount: 89, frequency: 'Monthly', isEssential: true },
  { id: 'ex4', category: 'Subscription', name: 'Netflix', amount: 15, frequency: 'Monthly', isEssential: false },
  { id: 'ex5', category: 'Debt', name: 'Student Loan', amount: 200, frequency: 'Monthly', isEssential: true },
];

const DEFAULT_DATA: AppData = {
  userRole: UserRole.ADMIN,
  certifications: INITIAL_CERTIFICATIONS,
  investors: DEFAULT_INVESTORS,
  investorUpdates: [],
  routineTasks: DEFAULT_TASKS,
  journal: [],
  weeklyRecaps: [],
  fieldLogs: [],
  expenses: DEFAULT_EXPENSES,
  syncSettings: {
    externalAppUrl: 'https://ai.studio/apps/drive/1qIg7lKGALfF_87ShNNomeTPWYo0jKitw',
    isConnected: false,
    lastSync: null
  },
  lastSaved: new Date().toISOString()
};

interface DataContextType {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
  exportDatabase: () => void;
  exportFramework: () => void;
  importDatabase: (file: File) => Promise<boolean>;
  resetDatabase: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from LocalStorage on Mount
  useEffect(() => {
    const saved = localStorage.getItem('solar_career_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Basic migration for old tasks that used 'label' instead of 'title'
        if (parsed.routineTasks) {
            parsed.routineTasks = parsed.routineTasks.map((t: any) => ({
                ...t,
                title: t.title || t.label, // Migration
                status: t.status || (t.completed ? 'Done' : 'Todo'), // Migration
                priority: t.priority || 'Medium', // Default
                category: t.category || 'General'
            }));
        }

        const merged = { 
            ...DEFAULT_DATA, 
            ...parsed,
            syncSettings: { ...DEFAULT_DATA.syncSettings, ...(parsed.syncSettings || {}) },
            expenses: parsed.expenses || DEFAULT_EXPENSES,
            weeklyRecaps: parsed.weeklyRecaps || []
        };
        setData(merged);
      } catch (e) {
        console.error("Failed to load local database", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to LocalStorage on Change
  useEffect(() => {
    if (isInitialized) {
      const dataToSave = { ...data, lastSaved: new Date().toISOString() };
      localStorage.setItem('solar_career_db', JSON.stringify(dataToSave));
    }
  }, [data, isInitialized]);

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const exportDatabase = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `solarcareer_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFramework = () => {
      // Clone data but strip personal info
      const framework: AppData = {
          ...data,
          userRole: UserRole.ADMIN,
          investors: [], // Clear specific investors
          investorUpdates: [],
          journal: [], // Clear personal thoughts
          weeklyRecaps: [],
          fieldLogs: [], // Clear personal logs
          // Keep Routine Tasks as they are the "Framework"
          // Keep Expenses CATEGORIES but maybe clear values? (Optional, kept for now as example)
          syncSettings: { ...DEFAULT_DATA.syncSettings },
          lastSaved: new Date().toISOString()
      };

      const jsonString = JSON.stringify(framework, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = `framework_template_v1.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const importDatabase = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string);
          // Validate simplified check
          if (parsed.routineTasks || parsed.certifications) {
             // Migration logic same as load
             if (parsed.routineTasks) {
                parsed.routineTasks = parsed.routineTasks.map((t: any) => ({
                    ...t,
                    title: t.title || t.label,
                    status: t.status || (t.completed ? 'Done' : 'Todo'),
                    priority: t.priority || 'Medium',
                    category: t.category || 'General'
                }));
            }
            const merged = { ...DEFAULT_DATA, ...parsed };
            setData(merged);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (err) {
          console.error("Import failed", err);
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  };

  const resetDatabase = () => {
    if(window.confirm("Are you sure? This wipes all local data.")) {
        setData(DEFAULT_DATA);
        localStorage.removeItem('solar_career_db');
        window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{ data, updateData, exportDatabase, exportFramework, importDatabase, resetDatabase }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
```

---

## Components

### components/Layout.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { Sun, LayoutDashboard, Award, DollarSign, Users, Bot, Menu, X, LogOut, Briefcase, FolderKanban, GitBranch, Settings, Book, Wifi, WifiOff, Cloud, ExternalLink, ChevronRight, PieChart, ShieldCheck } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface Props {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<Props> = ({ children, activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { data } = useData();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const NavItem = ({ 
    page, 
    icon: Icon, 
    label, 
    color = 'electric',
    badge
  }: { 
    page: string; 
    icon: any; 
    label: string;
    color?: 'electric' | 'solar' | 'green' | 'purple' | 'slate';
    badge?: string;
  }) => {
    const isActive = activePage === page;

    // Dynamic Color Map
    const colorStyles = {
      electric: {
        active: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-blue-100/50'
      },
      solar: {
        active: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-orange-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-orange-100/50'
      },
      green: {
        active: 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-emerald-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-emerald-100/50'
      },
      purple: {
        active: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-purple-100/50'
      },
      slate: {
        active: 'bg-slate-800 text-white shadow-slate-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-slate-100 text-slate-600 group-hover:bg-slate-800 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-slate-200/50'
      }
    };

    const style = colorStyles[color];

    return (
      <button
        onClick={() => {
          onNavigate(page);
          setMobileMenuOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden mb-1.5 ${
          isActive 
            ? `${style.active} shadow-lg translate-x-1` 
            : `text-slate-500 ${style.hover} hover:translate-x-1`
        }`}
      >
        {/* Icon Container */}
        <div className={`p-2 rounded-lg transition-all duration-300 ${
          isActive ? style.iconActive : style.iconInactive
        }`}>
          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="transition-transform duration-300 group-hover:scale-110" />
        </div>

        <div className="flex-1 text-left">
          <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
            {label}
          </span>
        </div>
        
        {/* Active Indicator */}
        {isActive && (
           <div className="mr-2 w-2 h-2 rounded-full bg-white animate-pulse shadow-sm"></div>
        )}
        
        {/* Optional Badge */}
        {badge && !isActive && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-slate-200 transition">
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-50/50 backdrop-blur-xl border-r border-slate-200 h-screen sticky top-0 z-20">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-solar-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-solar-500/20 transform hover:rotate-12 transition-transform duration-500">
              <Sun className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
               <h1 className="font-extrabold text-xl text-slate-800 leading-tight tracking-tight">SolarCareer<span className="text-electric-600">.Pro</span></h1>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mission Control</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-2 no-scrollbar">
          
          {/* CORE OPERATIONS */}
          <div className="mb-6">
             <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Operations</p>
             <NavItem page="dashboard" icon={LayoutDashboard} label="Dashboard" color="electric" />
             <NavItem page="real-positions" icon={Briefcase} label="Real Positions" color="electric" />
             <NavItem page="certifications" icon={Award} label="Certifications" color="electric" />
             <NavItem page="portfolio" icon={FolderKanban} label="Portfolio" color="electric" />
          </div>

          {/* FINANCIALS */}
          <div className="mb-6">
             <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Capital</p>
             <NavItem page="financials" icon={DollarSign} label="Financials" color="green" />
             <NavItem page="investors" icon={Users} label="Investor CRM" color="green" badge="3" />
          </div>

          {/* AI TOOLS */}
          <div className="mb-6">
             <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Intelligence</p>
             <NavItem page="ai-coach" icon={Bot} label="AI Coach" color="solar" badge="Online" />
          </div>

          {/* ADMIN */}
          <div className="mb-6">
             <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Admin</p>
             <NavItem page="documentation" icon={Book} label="Documentation" color="purple" />
             <NavItem page="data-management" icon={Settings} label="Data & Backup" color="purple" />
             <NavItem page="app-roadmap" icon={GitBranch} label="Dev Roadmap" color="slate" />
          </div>
          
          {/* External App Link if configured */}
          {data.syncSettings?.externalAppUrl && (
            <div className="px-2 mt-4">
               <a 
                href={data.syncSettings.externalAppUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-white border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group"
              >
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                   <Cloud size={20} />
                </div>
                <div className="flex-1">
                   <span className="text-sm font-bold text-slate-700 block group-hover:text-purple-700">SolarDrive</span>
                   <span className="text-[10px] text-slate-400">External Sync Active</span>
                </div>
                <ExternalLink size={14} className="text-slate-300 group-hover:text-purple-400" />
              </a>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          {/* Connectivity Status */}
          <div className={`mb-3 px-3 py-2 rounded-lg flex items-center justify-between text-xs font-bold border ${isOnline ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
             <div className="flex items-center gap-2">
               {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
               {isOnline ? 'System Online' : 'Offline Mode'}
             </div>
             <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200 flex justify-between items-center p-4 shadow-sm">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-solar-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
            <Sun className="text-white w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-800 leading-none">SolarCareer</span>
            {!isOnline && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wide">Offline Mode</span>}
          </div>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-slate-100 rounded-lg transition">
          {mobileMenuOpen ? <X className="text-slate-600" /> : <Menu className="text-slate-600" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-50 z-40 pt-20 px-4 overflow-y-auto">
          <nav className="space-y-1 pb-20">
            <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-4">Core</p>
            <NavItem page="dashboard" icon={LayoutDashboard} label="Dashboard" color="electric" />
            <NavItem page="real-positions" icon={Briefcase} label="Real Positions" color="electric" />
            <NavItem page="certifications" icon={Award} label="Certifications" color="electric" />
            <NavItem page="portfolio" icon={FolderKanban} label="Portfolio" color="electric" />
            
            <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-6">Capital</p>
            <NavItem page="financials" icon={DollarSign} label="Financials" color="green" />
            <NavItem page="investors" icon={Users} label="Investors" color="green" />
            
            <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-6">Tools</p>
            <NavItem page="ai-coach" icon={Bot} label="AI Coach" color="solar" />
            
            <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-6">Admin</p>
            <NavItem page="documentation" icon={Book} label="Docs" color="purple" />
            <NavItem page="data-management" icon={Settings} label="Data" color="purple" />
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto md:mt-0 mt-16 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};
```

### components/Dashboard.tsx
```typescript
import React from 'react';
import { UserRole, Certification, ActivityItem } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Calendar, DollarSign, Award, ArrowRight } from 'lucide-react';

interface Props {
  userRole: UserRole;
  progress: number;
  certifications: Certification[];
  recentActivity: ActivityItem[];
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<Props> = ({ userRole, progress, certifications, recentActivity, onNavigate }) => {
  const activeCert = certifications.find(c => c.status === 'In Progress');
  
  const progressData = [
    { name: 'Complete', value: progress },
    { name: 'Remaining', value: 100 - progress }
  ];
  const COLORS = ['#3B82F6', '#E2E8F0']; // Electric Blue & Slate 200

  // Get latest score if available
  const latestScore = activeCert?.practiceExamScores && activeCert.practiceExamScores.length > 0 
    ? activeCert.practiceExamScores[activeCert.practiceExamScores.length - 1].score 
    : '--';

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-solar-500/20 text-solar-500 text-xs font-bold rounded-full uppercase tracking-wider border border-solar-500/20">
              {userRole === UserRole.ADMIN ? 'Admin View' : 'Investor View'}
            </span>
            <span className="text-slate-400 text-sm">Last updated: Today, 09:41 AM</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userRole === UserRole.ADMIN ? 'Michael' : 'Investor'}</h1>
          <p className="text-slate-300 max-w-2xl">
            Phase 1 is underway. Freedom Solar training is complete, and NABCEP PV Associate prep is on track for December.
          </p>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Widget 1: Overall Progress */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-slate-700">Career Journey</h3>
            <TrendingUp className="w-5 h-5 text-electric-500" />
          </div>
          <div className="h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-slate-900">{progress}%</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Complete</span>
            </div>
          </div>
          <div className="text-center text-sm text-slate-500 mt-2">Phase 1: Foundation</div>
        </div>

        {/* Widget 2: Next Milestone */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-700">Next Target</h3>
            <Calendar className="w-5 h-5 text-solar-500" />
          </div>
          <div className="my-4">
            <div className="text-4xl font-bold text-slate-900 tracking-tight">Dec 15</div>
            <div className="text-electric-600 font-medium">NABCEP PV Associate Exam</div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-solar-500 h-2 rounded-full w-2/3"></div>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-right">65 Days Remaining</p>
        </div>

         {/* Widget 3: Active Certification */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-700">Active Cert</h3>
            <Award className="w-5 h-5 text-purple-500" />
          </div>
          <div className="my-4">
             <div className="text-lg font-bold text-slate-900">{activeCert?.name || 'None'}</div>
             <div className="text-slate-500 text-sm">{activeCert?.completedHours}/{activeCert?.totalHours} Hours Logged</div>
          </div>
          <div className="space-y-2">
             <div className="flex justify-between text-sm">
               <span className="text-slate-500">Modules</span>
               <span className="font-medium text-slate-800">4/12</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-slate-500">Practice Score</span>
               <span className="font-medium text-slate-800">{latestScore}%</span>
             </div>
          </div>
        </div>

        {/* Widget 4: Financial Snapshot */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-700">Financials</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="my-4">
            <div className="text-3xl font-bold text-slate-900">$4,500</div>
            <div className="text-sm text-slate-500">Spent of $30,000 Budget</div>
          </div>
           <div className="flex gap-2 mt-auto">
             <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">15% Used</span>
             <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">On Track</span>
           </div>
        </div>
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <button className="text-electric-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentActivity.map(activity => (
              <div key={activity.id} className="p-4 flex gap-4 hover:bg-slate-50 transition">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.type === 'study' ? 'bg-blue-100 text-blue-600' : activity.type === 'milestone' ? 'bg-solar-100 text-solar-600' : 'bg-slate-100 text-slate-600'}`}>
                  {activity.type === 'study' ? <TrendingUp size={18} /> : activity.type === 'milestone' ? <Award size={18} /> : <DollarSign size={18} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mb-1">{activity.description}</p>
                  <span className="text-[10px] text-slate-400">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-b from-electric-600 to-electric-800 rounded-xl shadow-lg p-6 text-white">
          <h3 className="font-bold text-lg mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('certifications')}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center justify-between transition group"
            >
              <span className="font-medium">Log Study Session</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
             <button 
              onClick={() => onNavigate('real-positions')}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center justify-between transition group"
            >
              <span className="font-medium">Add Job Application</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
             <button 
              onClick={() => onNavigate('investors')}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center justify-between transition group"
            >
              <span className="font-medium">Investor Update</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
             <button 
              onClick={() => onNavigate('ai-coach')}
              className="w-full bg-solar-500 hover:bg-solar-400 text-white p-3 rounded-lg flex items-center justify-between transition font-bold mt-6 shadow-lg"
            >
              <span className="font-medium">Ask AI Coach</span>
              <Award className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### components/CertificationTracker.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { Certification, PhaseStatus, StudySession, StudyResource, FieldLog } from '../types';
import { INITIAL_SESSIONS, STUDY_RESOURCES } from '../constants';
import { CheckCircle2, Clock, Calendar, BookOpen, ExternalLink, AlertCircle, PlayCircle, FileText, Trophy, Plus, MapPin, Monitor, Cpu, Sun, Hammer, PencilRuler, LineChart, Wrench, Zap, Network, Loader2, Signal, DownloadCloud, WifiOff, X } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../contexts/DataContext';

interface Props {
  certifications: Certification[];
  initialAction?: string | null;
  onClearAction?: () => void;
}

export const CertificationTracker: React.FC<Props> = ({ certifications: initialCerts, initialAction, onClearAction }) => {
  const { data, updateData } = useData();
  const [activeTab, setActiveTab] = useState<'active' | 'timeline' | 'resources' | 'field' | 'careermap'>('active');
  
  // Prioritize data from global context if available to ensure persistence works
  const certifications = data.certifications && data.certifications.length > 0 ? data.certifications : initialCerts;
  
  const activeCert = certifications.find(c => c.status === PhaseStatus.IN_PROGRESS);

  // Local state to handle adding new scores for the demo
  const [examScores, setExamScores] = useState(activeCert?.practiceExamScores || []);
  const [showAddScore, setShowAddScore] = useState(false);
  const [newScore, setNewScore] = useState('');

  // Study Logging State
  const [showLogStudy, setShowLogStudy] = useState(false);
  const [studyDuration, setStudyDuration] = useState('');
  const [studyNotes, setStudyNotes] = useState('');

  // Field Log State
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Handle Initial Actions from other pages (e.g. AI Coach)
  useEffect(() => {
    if (initialAction === 'log_study') {
      setActiveTab('active');
      setShowLogStudy(true);
      if(onClearAction) onClearAction();
    }
  }, [initialAction, onClearAction]);

  const handleAddScore = () => {
    if (!newScore) return;
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    const score = parseInt(newScore);
    if (isNaN(score)) return;

    setExamScores([...examScores, { date: today, score }]);
    setNewScore('');
    setShowAddScore(false);
  };

  const handleSaveStudySession = () => {
    if (!activeCert || !studyDuration) return;
    const hours = parseFloat(studyDuration);
    if (isNaN(hours)) return;

    // Update global data
    const updatedCerts = certifications.map(c => 
      c.id === activeCert.id 
        ? { 
            ...c, 
            completedHours: Math.min(c.totalHours, c.completedHours + hours),
            progress: Math.min(100, Math.round(((c.completedHours + hours) / c.totalHours) * 100))
          } 
        : c
    );
    
    updateData({ certifications: updatedCerts });
    setShowLogStudy(false);
    setStudyDuration('');
    setStudyNotes('');
    // Note: In a real app, we would also save the session to a 'StudySessions' array
  };

  const handleGPSCheckIn = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLog: FieldLog = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString(),
          location: `GPS Verified Coordinates`,
          hours: 4.0, // Default block
          task: 'Site Installation & Safety Check',
          verified: true,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
        };
        
        updateData({ fieldLogs: [newLog, ...data.fieldLogs] });
        setIsLocating(false);
      },
      (error) => {
        console.error("GPS Error", error);
        setLocationError("Unable to retrieve location. Ensure GPS is enabled.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Career Map Visual Component
  const CareerMap = () => (
    <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 overflow-hidden relative">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-slate-800">NABCEP Career Ecosystem</h3>
        <p className="text-slate-500">The gold standard pathways for solar professionals. All roads start at Associate.</p>
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Grid Layout for the Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          
          {/* 1. Design Specialist (Top Left) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 hover:-translate-y-1 transition duration-300">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 rounded-lg"><PencilRuler className="w-6 h-6 text-red-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">PV Design</h4>
                    <span className="text-xs text-red-600 font-bold uppercase">Specialist</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div>PV System Designer</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div>PV Design Engineer</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div>Design Consultant</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div>Structural Engineer</li>
             </ul>
          </div>

          {/* 2. Installation Pro (Top Middle) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500 hover:-translate-y-1 transition duration-300">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg"><Hammer className="w-6 h-6 text-orange-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">PV Installation</h4>
                    <span className="text-xs text-orange-600 font-bold uppercase">Professional (PVIP)</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></div>PV Installer / Master Electrician</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></div>Construction Supervisor</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></div>Crew Chief</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></div>Site Supervisor</li>
             </ul>
          </div>

          {/* 3. Commissioning (Top Right) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 hover:-translate-y-1 transition duration-300">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg"><Wrench className="w-6 h-6 text-blue-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">Commissioning</h4>
                    <span className="text-xs text-blue-600 font-bold uppercase">& Maintenance</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>PV Service Technician</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>O&M Manager</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>Site Assessor</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>Interconnection Engineer</li>
             </ul>
          </div>

          {/* CENTER HUB: PV Associate */}
          <div className="lg:col-start-2 flex items-center justify-center py-4 lg:py-0">
               <div className="bg-white border-4 border-solar-500 p-8 rounded-full shadow-2xl w-64 h-64 flex flex-col items-center justify-center text-center z-20 relative group cursor-pointer">
                  <div className="absolute inset-0 bg-solar-50 rounded-full opacity-50 animate-pulse group-hover:opacity-80 transition"></div>
                  <div className="absolute -inset-4 border border-dashed border-slate-300 rounded-full animate-spin-slow"></div>
                  <Trophy className="w-10 h-10 text-solar-600 mb-2 relative z-10" />
                  <h4 className="text-2xl font-bold text-slate-900 relative z-10 leading-tight">PV<br/>Associate</h4>
                  <span className="text-[10px] bg-solar-500 text-white px-3 py-1 rounded-full mt-2 font-bold relative z-10 shadow-md">CURRENT STATUS</span>
                  <div className="absolute -bottom-12 bg-slate-800 text-white text-xs px-3 py-1 rounded shadow-lg">Prerequisite for All</div>
               </div>
          </div>

           {/* 4. Sales (Bottom Left/Middle) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500 hover:-translate-y-1 transition duration-300 lg:col-start-1 lg:row-start-2">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg"><LineChart className="w-6 h-6 text-green-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">Technical Sales</h4>
                    <span className="text-xs text-green-600 font-bold uppercase">Certification</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>Technical Salesperson</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>Sales Manager</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>Account Manager</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>Business Development</li>
             </ul>
          </div>

           {/* 5. Storage (Bottom Right/Middle) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500 hover:-translate-y-1 transition duration-300 lg:col-start-3 lg:row-start-2">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg"><Zap className="w-6 h-6 text-purple-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">Energy Storage</h4>
                    <span className="text-xs text-purple-600 font-bold uppercase">Installation Pro (ESIP)</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>Battery Specialist</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>Storage Integrator</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>Microgrid Architect</li>
             </ul>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 relative">
      
      {/* Log Study Time Modal */}
      {showLogStudy && activeCert && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
             <div className="bg-slate-900 p-6 flex justify-between items-center">
               <div>
                 <h3 className="text-white font-bold text-lg flex items-center gap-2">
                   <BookOpen className="w-5 h-5 text-electric-400" /> Log Study Session
                 </h3>
                 <p className="text-slate-400 text-xs">Adding hours to: {activeCert.name}</p>
               </div>
               <button onClick={() => setShowLogStudy(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
             </div>
             <div className="p-6 space-y-4">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Duration (Hours)</label>
                 <input 
                   type="number" 
                   value={studyDuration}
                   onChange={(e) => setStudyDuration(e.target.value)}
                   className="w-full p-3 border border-slate-200 rounded-lg text-lg font-bold text-slate-800 focus:ring-2 focus:ring-electric-500 outline-none"
                   placeholder="e.g. 1.5"
                   autoFocus
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Session Notes</label>
                 <textarea 
                   value={studyNotes}
                   onChange={(e) => setStudyNotes(e.target.value)}
                   className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-electric-500 outline-none h-24 resize-none"
                   placeholder="What did you cover? (e.g. Electrical codes, shading analysis)"
                 />
               </div>
               <button 
                 onClick={handleSaveStudySession}
                 disabled={!studyDuration}
                 className="w-full bg-electric-600 hover:bg-electric-700 disabled:bg-slate-300 text-white py-3 rounded-lg font-bold transition shadow-lg shadow-electric-600/20"
               >
                 Confirm & Save Progress
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Certification & Skills</h2>
          <p className="text-slate-500">Manage your NABCEP journey from prep to pro.</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-lg mt-4 md:mt-0 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap ${activeTab === 'active' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Active Cert
          </button>
           <button 
             onClick={() => setActiveTab('field')}
             className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap ${activeTab === 'field' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Field Log
          </button>
          <button 
             onClick={() => setActiveTab('careermap')}
             className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'careermap' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Network className="w-4 h-4" /> Career Map
          </button>
          <button 
             onClick={() => setActiveTab('timeline')}
             className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap ${activeTab === 'timeline' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Roadmap
          </button>
          <button 
             onClick={() => setActiveTab('resources')}
             className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap ${activeTab === 'resources' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Labs & Resources
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'active' && activeCert && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Active Cert Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-solar-500/10 rounded-bl-full -mr-8 -mt-8"></div>
              
              <div className="flex justify-between items-start mb-6 relative">
                <div>
                  <span className="inline-block px-3 py-1 bg-solar-100 text-solar-600 text-xs font-bold rounded-full mb-2">IN PROGRESS</span>
                  <h3 className="text-2xl font-bold text-slate-900">{activeCert.name}</h3>
                  <p className="text-slate-500">{activeCert.provider} • Target: {activeCert.targetDate}</p>
                </div>
                <div className="text-right">
                   <div className="text-3xl font-bold text-electric-600">{activeCert.progress}%</div>
                   <div className="text-xs text-slate-400 uppercase font-semibold">Complete</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-4 mb-6">
                <div 
                  className="bg-gradient-to-r from-solar-500 to-electric-500 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${activeCert.progress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <Clock className="w-5 h-5 mx-auto text-electric-500 mb-2" />
                  <div className="font-bold text-slate-800">{activeCert.completedHours}/{activeCert.totalHours}</div>
                  <div className="text-xs text-slate-500">Hours Studied</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <FileText className="w-5 h-5 mx-auto text-electric-500 mb-2" />
                  <div className="font-bold text-slate-800">4</div>
                  <div className="text-xs text-slate-500">Modules Done</div>
                </div>
                 <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <AlertCircle className="w-5 h-5 mx-auto text-red-500 mb-2" />
                  <div className="font-bold text-slate-800">Pending</div>
                  <div className="text-xs text-slate-500">Payment Status</div>
                </div>
                 <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <Calendar className="w-5 h-5 mx-auto text-green-500 mb-2" />
                  <div className="font-bold text-slate-800">65 Days</div>
                  <div className="text-xs text-slate-500">To Exam</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 bg-electric-600 hover:bg-electric-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" /> Resume Course
                </button>
                 <button 
                  onClick={() => setShowLogStudy(true)}
                  className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                 >
                  <BookOpen className="w-5 h-5" /> Log Study Time
                </button>
              </div>

              {/* Practice Exam Section */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-solar-500" /> Practice Exam Performance
                  </h4>
                  {!showAddScore ? (
                    <button 
                      onClick={() => setShowAddScore(true)}
                      className="text-sm text-electric-600 font-medium hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Log Score
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Score" 
                        value={newScore}
                        onChange={(e) => setNewScore(e.target.value)}
                        className="w-20 px-2 py-1 border border-slate-300 rounded text-sm"
                        autoFocus
                      />
                      <button onClick={handleAddScore} className="bg-electric-600 text-white px-3 py-1 rounded text-xs font-bold">Save</button>
                      <button onClick={() => setShowAddScore(false)} className="text-slate-400 text-xs hover:text-slate-600">Cancel</button>
                    </div>
                  )}
                </div>
                
                <div className="h-48 w-full">
                  {examScores.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={examScores}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="date" 
                            tick={{fontSize: 12, fill: '#64748b'}} 
                            axisLine={false} 
                            tickLine={false}
                            dy={10}
                          />
                          <YAxis 
                            domain={[0, 100]} 
                            hide={false} 
                            tick={{fontSize: 12, fill: '#64748b'}}
                            axisLine={false}
                            tickLine={false}
                            width={30}
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#3B82F6" 
                            strokeWidth={3} 
                            dot={{r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff'}} 
                            activeDot={{r: 6}}
                          />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-slate-100 border-dashed text-slate-400">
                      <Trophy className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm">No practice exams taken yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-solar-500" /> Recent Achievements
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">Completed Freedom Solar onboarding module</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">Scored 85% on Electrical Basics quiz</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Career Map Tab (NEW) */}
      {activeTab === 'careermap' && <CareerMap />}

      {/* Field Mode Tab */}
      {activeTab === 'field' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Field Experience Logger</h3>
                        <p className="text-sm text-slate-500">Track installation hours for NABCEP PVIP.</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full animate-pulse">
                        <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center mb-6">
                    <p className="text-slate-600 font-medium mb-4">Ready to log hours at job site?</p>
                    <button 
                      onClick={handleGPSCheckIn}
                      disabled={isLocating}
                      className={`w-full font-bold py-4 rounded-xl shadow-lg transition flex flex-col items-center justify-center gap-1 ${isLocating ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-electric-600 hover:bg-electric-700 text-white'}`}
                    >
                        {isLocating ? (
                          <>
                            <span className="flex items-center gap-2 text-lg"><Loader2 className="w-6 h-6 animate-spin" /> ACQUIRING GPS...</span>
                            <span className="text-xs opacity-80 font-normal">Triangulating position...</span>
                          </>
                        ) : (
                          <>
                            <span className="flex items-center gap-2 text-lg"><CheckCircle2 className="w-6 h-6" /> GPS CHECK-IN</span>
                            <span className="text-xs opacity-80 font-normal">Verify location & log timestamp</span>
                          </>
                        )}
                    </button>
                    {locationError && (
                      <div className="mt-3 text-xs text-red-500 flex items-center justify-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {locationError}
                      </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h4 className="font-bold text-slate-700 text-sm uppercase flex justify-between">
                      <span>Recent Verified Logs</span>
                      <span className="text-electric-600 text-xs flex items-center gap-1"><Signal className="w-3 h-3"/> Live Sync</span>
                    </h4>
                    {data.fieldLogs.length === 0 ? (
                       <div className="text-center py-4 text-slate-400 text-sm italic border border-dashed border-slate-200 rounded-lg">No field logs recorded yet.</div>
                    ) : (
                      data.fieldLogs.map((log) => (
                          <div key={log.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                              <div>
                                  <div className="font-bold text-slate-800 flex items-center gap-2">
                                    {log.location}
                                    {log.coordinates && (
                                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-mono" title={`Lat: ${log.coordinates.lat}, Lng: ${log.coordinates.lng}`}>
                                        GPS
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-slate-500">{log.date} • {log.task}</div>
                              </div>
                              <span className="font-mono font-bold text-electric-600">{log.hours} hrs</span>
                          </div>
                      ))
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
                <div className="w-full max-w-xs">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-slate-700">PVIP Requirement</span>
                        <span className="text-slate-500">
                          {data.fieldLogs.reduce((acc, log) => acc + log.hours, 0)} / 58 Hours
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full mb-6">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(data.fieldLogs.reduce((acc, log) => acc + log.hours, 0) / 58) * 100}%` }}></div>
                    </div>
                </div>
                <p className="text-slate-600 text-sm">
                    You need <strong>{Math.max(0, 58 - data.fieldLogs.reduce((acc, log) => acc + log.hours, 0))} more hours</strong> of documented installation experience to qualify for the PVIP exam.
                </p>
            </div>
        </div>
      )}

      {/* Timeline View */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
           <div className="relative border-l-4 border-slate-100 ml-6 space-y-12">
             {certifications.map((cert, idx) => (
               <div key={cert.id} className="relative pl-8">
                 <div className={`absolute -left-[14px] top-2 w-6 h-6 rounded-full border-4 border-white ${cert.status === PhaseStatus.IN_PROGRESS ? 'bg-solar-500 ring-4 ring-solar-100' : cert.status === PhaseStatus.COMPLETED ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{cert.name}</h3>
                        <p className="text-electric-600 font-medium">{cert.targetDate}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full w-fit ${cert.status === PhaseStatus.IN_PROGRESS ? 'bg-solar-100 text-solar-700' : 'bg-slate-200 text-slate-600'}`}>
                        {cert.status}
                      </span>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* Resources Tab (Enhanced) */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
            {/* Virtual Labs Section */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-lg text-white">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-purple-400" /> Virtual Labs & Simulation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="https://www.skillcatapp.com/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition cursor-pointer group block">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-purple-500/20 rounded-lg mb-3">
                                <Monitor className="w-5 h-5 text-purple-300" />
                            </div>
                            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        </div>
                        <h4 className="font-bold text-lg">SkillCat Simulator</h4>
                        <p className="text-sm text-slate-300 mt-1">Practice wiring, multimeter usage, and system troubleshooting in 3D.</p>
                    </a>
                    <a href="https://aurorasolar.com/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition cursor-pointer group block">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-blue-500/20 rounded-lg mb-3">
                                <MapPin className="w-5 h-5 text-blue-300" />
                            </div>
                            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        </div>
                        <h4 className="font-bold text-lg">Aurora Solar Design</h4>
                        <p className="text-sm text-slate-300 mt-1">Create professional string layouts and irradiance models for your portfolio.</p>
                    </a>
                     <a href="https://pvwatts.nrel.gov/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition cursor-pointer group block">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-orange-500/20 rounded-lg mb-3">
                                <Sun className="w-5 h-5 text-orange-300" />
                            </div>
                            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        </div>
                        <h4 className="font-bold text-lg">NREL PVWatts</h4>
                        <p className="text-sm text-slate-300 mt-1">Official government production modeling tool for verifying system output.</p>
                    </a>
                </div>
            </div>

            {/* Standard Resources */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center justify-between">
                   <span>Study Library</span>
                   <span className="text-xs font-normal text-slate-500 flex items-center gap-1">
                     <DownloadCloud className="w-3 h-3" /> Available Offline
                   </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {STUDY_RESOURCES.map(resource => (
                    <div key={resource.id} className="group block p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-electric-300 hover:shadow-md transition relative">
                        <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded ${resource.type === 'video' ? 'bg-red-100 text-red-600' : resource.type === 'exam' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                            {resource.type}
                        </span>
                        {['article', 'Code', 'Technical Specs'].includes(resource.category) ? (
                           <div className="p-1 bg-green-100 rounded-full" title="Cached for Offline Use">
                              <DownloadCloud className="w-3 h-3 text-green-600" />
                           </div>
                        ) : (
                           <WifiOff className="w-3 h-3 text-slate-300" title="Requires Internet" />
                        )}
                        </div>
                        <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-electric-600 transition">{resource.title}</h4>
                        <div className="flex justify-between items-end mt-2">
                          <p className="text-sm text-slate-500">{resource.category}</p>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-electric-600 hover:text-electric-800">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
```

### components/AICoach.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { askSolarCoach, analyzeReflection, getTacticalAdvice, getDeepDiveContent, researchCareerTopic } from '../services/geminiService';
import { Bot, Send, Loader2, Sparkles, ListChecks, MessageSquare, Zap, BrainCircuit, Flame, Sun, Moon, Briefcase, CheckSquare, Timer, ChevronRight, BookOpen, Battery, Disc, UserCheck, ArrowRight, Search, Globe, FileText } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { ResearchResult } from '../types';

interface Props {
  onNavigate?: (page: string) => void;
  onAction?: (action: string) => void;
}

export const AICoach: React.FC<Props> = ({ onNavigate, onAction }) => {
  const { data, updateData } = useData();
  const [activePhase, setActivePhase] = useState<'Morning' | 'Training' | 'Evening'>('Morning');
  const [mode, setMode] = useState<'coach' | 'research'>('coach');
  
  // Use Global Data
  const tasks = data.routineTasks;

  const [focusTime, setFocusTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Chat/AI State
  const [chatHistory, setChatHistory] = useState<{sender: 'user'|'ai', text: string}[]>([
    { sender: 'ai', text: "Command Center Online. I am ready to assist with your daily protocol. What is your status?" }
  ]);
  const [query, setQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Research State
  const [researchQuery, setResearchQuery] = useState('');
  const [researchResult, setResearchResult] = useState<ResearchResult | null>(null);

  // Metrics
  const phaseTasks = tasks.filter(t => t.category === activePhase);
  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const savageScore = Math.round((completedCount / totalTasks) * 100);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => setFocusTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    updateData({ routineTasks: updatedTasks });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiLoading(true);

    const answer = await askSolarCoach(userMsg);
    setChatHistory(prev => [...prev, { sender: 'ai', text: answer }]);
    setAiLoading(false);
  };

  const handleTacticalCheck = async () => {
    setAiLoading(true);
    const done = phaseTasks.filter(t => t.completed).map(t => t.title);
    const pending = phaseTasks.filter(t => !t.completed).map(t => t.title);
    const advice = await getTacticalAdvice(activePhase, done, pending);
    
    setChatHistory(prev => [...prev, { sender: 'ai', text: advice }]);
    setAiLoading(false);
  };

  const handleDeepDive = async (strategy: string) => {
    setAiLoading(true);
    setChatHistory(prev => [...prev, { sender: 'user', text: `Requesting Deep Dive: ${strategy}` }]);
    const content = await getDeepDiveContent(strategy);
    setChatHistory(prev => [...prev, { sender: 'ai', text: content }]);
    setAiLoading(false);
  };

  const handleResearch = async () => {
    if(!researchQuery) return;
    setAiLoading(true);
    const resStr = await researchCareerTopic(researchQuery);
    try {
      const parsed = JSON.parse(resStr);
      setResearchResult(parsed);
    } catch(e) {
      setChatHistory(prev => [...prev, { sender: 'ai', text: "Research format error. Try again." }]);
    }
    setAiLoading(false);
  };

  const handleQuickAction = (action: string) => {
    if (onNavigate && onAction) {
      onAction(action);
      if (action === 'log_study') {
        onNavigate('certifications');
      }
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 bg-slate-50 p-1 overflow-hidden">
      
      {/* LEFT PANEL: ROUTINE & TRACKING */}
      <div className="flex-1 flex flex-col gap-4 h-full overflow-y-auto">
        
        {/* Top Stats Bar */}
        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-xl shadow-red-500/50 shadow-lg">
              {isNaN(savageScore) ? 0 : savageScore}%
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Savage Score</div>
              <div className="font-bold text-lg">{completedCount}/{totalTasks} Tasks</div>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Current Phase</div>
             <div className="font-bold text-xl text-electric-400">{activePhase} Protocol</div>
          </div>
        </div>

        {/* Phase Selector */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          <button 
            onClick={() => setActivePhase('Morning')}
            className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition ${activePhase === 'Morning' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50'}`}
          >
            <Sun className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">Morning</span>
          </button>
          <button 
            onClick={() => setActivePhase('Training')}
            className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition ${activePhase === 'Training' ? 'border-electric-500 bg-electric-50 text-electric-700' : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50'}`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">Training</span>
          </button>
          <button 
             onClick={() => setActivePhase('Evening')}
             className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition ${activePhase === 'Evening' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50'}`}
          >
            <Moon className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">Evening</span>
          </button>
        </div>

        {/* Quick Actions (NEW) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm shrink-0">
           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Actions</h4>
           <div className="grid grid-cols-1 gap-2">
             <button 
               onClick={() => handleQuickAction('log_study')}
               className="w-full flex items-center justify-between px-4 py-3 bg-electric-50 hover:bg-electric-100 text-electric-700 rounded-lg transition group border border-electric-100"
             >
               <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-white rounded-md shadow-sm group-hover:shadow">
                   <BookOpen className="w-4 h-4 text-electric-600" />
                 </div>
                 <span className="font-bold text-sm">Log Study Session</span>
               </div>
               <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition" />
             </button>
           </div>
        </div>

        {/* Main Routine Content */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 p-6 overflow-y-auto">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ListChecks className="w-6 h-6 text-electric-600" />
                {activePhase} Checklist
              </h3>
              <button 
                onClick={handleTacticalCheck}
                className="text-xs font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition"
              >
                <Zap className="w-3 h-3 text-yellow-400" /> Tactical Advice
              </button>
           </div>

           {/* Task List */}
           <div className="space-y-3 mb-8">
             {phaseTasks.map(task => (
               <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center gap-4 group ${task.completed ? 'border-green-500 bg-green-50' : 'border-slate-100 hover:border-electric-300'}`}
               >
                 <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${task.completed ? 'bg-green-500 border-green-500' : 'border-slate-300 group-hover:border-electric-400'}`}>
                    {task.completed && <CheckSquare className="w-4 h-4 text-white" />}
                 </div>
                 <div className="flex-1">
                    <div className={`font-bold ${task.completed ? 'text-green-800 line-through opacity-70' : 'text-slate-700'}`}>{task.title}</div>
                    {task.timeEstimate && <div className="text-xs text-slate-400 font-mono">{task.timeEstimate}</div>}
                 </div>
               </div>
             ))}
           </div>

           {/* Contextual Modules */}
           {activePhase === 'Training' && (
             <div className="bg-slate-900 text-white p-6 rounded-xl mb-6">
               <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-electric-400" />
                    <h4 className="font-bold">Focus Timer</h4>
                 </div>
                 <div className="font-mono text-2xl font-bold text-electric-400">
                   {formatTime(focusTime)}
                 </div>
               </div>
               <div className="flex gap-2">
                 <button 
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-2 rounded-lg font-bold transition ${isTimerRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                 >
                   {isTimerRunning ? 'STOP' : 'START FOCUS'}
                 </button>
                 <button 
                  onClick={() => { setIsTimerRunning(false); setFocusTime(0); }}
                  className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 text-slate-300"
                 >
                   Reset
                 </button>
               </div>
             </div>
           )}
        </div>
      </div>

      {/* RIGHT PANEL: AI & RESEARCH */}
      <div className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl z-10">
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
            <button 
              onClick={() => setMode('coach')}
              className={`flex-1 py-3 text-sm font-bold transition ${mode === 'coach' ? 'border-b-2 border-electric-600 text-electric-700 bg-electric-50' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                AI Coach
            </button>
            <button 
              onClick={() => setMode('research')}
              className={`flex-1 py-3 text-sm font-bold transition ${mode === 'research' ? 'border-b-2 border-purple-600 text-purple-700 bg-purple-50' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                Research
            </button>
        </div>

        {mode === 'coach' ? (
            <>
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-electric-600" />
                        <span className="font-bold text-slate-700">AI Coach Uplink</span>
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Mindset Protocol Toolbar */}
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        <button onClick={() => handleDeepDive('Accountability Mirror')} className="shrink-0 px-2 py-1 bg-white border border-slate-200 hover:border-purple-400 hover:bg-purple-50 rounded text-[10px] font-bold flex items-center gap-1 text-slate-600 transition" title="Goggins: Self-Reflection">
                        <UserCheck className="w-3 h-3 text-purple-500" /> Mirror
                        </button>
                        <button onClick={() => handleDeepDive('40% Rule')} className="shrink-0 px-2 py-1 bg-white border border-slate-200 hover:border-red-400 hover:bg-red-50 rounded text-[10px] font-bold flex items-center gap-1 text-slate-600 transition" title="Goggins: Endurance">
                        <Battery className="w-3 h-3 text-red-500" /> 40% Rule
                        </button>
                        <button onClick={() => handleDeepDive('First Principles')} className="shrink-0 px-2 py-1 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 rounded text-[10px] font-bold flex items-center gap-1 text-slate-600 transition" title="Musk: Physics Thinking">
                        <BrainCircuit className="w-3 h-3 text-blue-500" /> 1st Princ.
                        </button>
                        <button onClick={() => handleDeepDive('Cookie Jar')} className="shrink-0 px-2 py-1 bg-white border border-slate-200 hover:border-orange-400 hover:bg-orange-50 rounded text-[10px] font-bold flex items-center gap-1 text-slate-600 transition" title="Goggins: Past Wins">
                        <Disc className="w-3 h-3 text-orange-500" /> Cookie Jar
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                    {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] p-3 rounded-xl text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-electric-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                            {msg.text}
                        </div>
                        </div>
                    ))}
                    {aiLoading && (
                        <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 p-3 rounded-xl rounded-bl-none shadow-sm flex items-center gap-2 text-slate-500 text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Coach is thinking...</span>
                        </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200">
                    <div className="relative">
                        <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask for advice or log status..."
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-electric-50 outline-none transition"
                        />
                        <button 
                        type="submit" 
                        disabled={!query.trim() || aiLoading}
                        className="absolute right-2 top-2 p-1.5 bg-electric-600 text-white rounded-lg hover:bg-electric-700 disabled:opacity-50 transition"
                        >
                        <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </>
        ) : (
            <div className="flex flex-col h-full">
                <div className="p-4 border-b border-slate-200 bg-purple-50">
                    <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-purple-600" /> Knowledge Gatherer
                    </h3>
                    <div className="flex gap-2">
                        <input 
                          type="text"
                          value={researchQuery}
                          onChange={(e) => setResearchQuery(e.target.value)}
                          placeholder="Topic (e.g. PMP Certification)"
                          className="flex-1 p-2 text-sm border border-slate-300 rounded-lg"
                        />
                        <button onClick={handleResearch} className="bg-purple-600 text-white p-2 rounded-lg">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                    {researchResult ? (
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                            <h4 className="font-bold text-lg text-slate-800">{researchResult.topic}</h4>
                            <p className="text-sm text-slate-600">{researchResult.summary}</p>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                    <div className="text-xs font-bold text-slate-400 uppercase">Cost</div>
                                    <div className="font-mono text-sm font-bold text-slate-800">{researchResult.estimatedCost}</div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                    <div className="text-xs font-bold text-slate-400 uppercase">Timeline</div>
                                    <div className="font-mono text-sm font-bold text-slate-800">{researchResult.timeline}</div>
                                </div>
                            </div>

                            <div>
                                <h5 className="font-bold text-sm text-slate-700 mb-2">Prerequisites</h5>
                                <ul className="list-disc list-inside text-xs text-slate-600">
                                    {researchResult.prerequisites.map((p,i) => <li key={i}>{p}</li>)}
                                </ul>
                            </div>

                             <div>
                                <h5 className="font-bold text-sm text-slate-700 mb-2">Resources</h5>
                                <div className="space-y-2">
                                    {researchResult.resources.map((r,i) => (
                                        <a key={i} href={r.url} target="_blank" className="block text-xs text-blue-600 hover:underline truncate">
                                            <ExternalLink className="w-3 h-3 inline mr-1" /> {r.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 mt-10">
                            <Search className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Enter a topic to research.</p>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
```

### components/Financials.tsx
```typescript
import React, { useState, useRef } from 'react';
import { DollarSign, Landmark, ExternalLink, TrendingUp, Plus, Trash2, PieChart, Wallet, BrainCircuit, PhoneCall, ArrowRight, AlertTriangle, CheckCircle2, Loader2, FileText, Upload, Calculator, ChevronRight, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Expense, GrantOpportunity } from '../types';
import { analyzeFinancialHealth, negotiateBill, analyzeBankStatement } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const Financials: React.FC = () => {
  const { data, updateData } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'ai-cfo'>('overview');
  const [showAddExpense, setShowAddExpense] = useState(false);
  
  // Onboarding State
  const [showMLEWizard, setShowMLEWizard] = useState(false);
  const [mleStep, setMleStep] = useState(0);
  const [mleData, setMleData] = useState<Partial<Expense>[]>([]);
  
  // Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // AI State
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [negotiationScript, setNegotiationScript] = useState<string | null>(null);
  const [selectedBill, setSelectedBill] = useState<Expense | null>(null);
  
  // New Expense State
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    category: 'Food',
    name: '',
    amount: 0,
    frequency: 'Monthly',
    isEssential: true
  });

  const expenses = data.expenses || [];
  const totalMonthlyExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalRaised = data.investors.filter(i => i.status === 'Wired').reduce((sum, i) => sum + i.amount, 0);
  const cashOnHand = totalRaised - 4500; // Hardcoded spend for demo logic
  const runwayMonths = totalMonthlyExpenses > 0 ? (cashOnHand / totalMonthlyExpenses).toFixed(1) : '∞';

  const grants: GrantOpportunity[] = [
    {
      id: 'g1',
      name: 'WIOA Workforce Grant',
      amount: 4000,
      status: 'Applied',
      deadline: 'Rolling',
      requirements: ['Unemployed/Underemployed', 'Texas Resident', 'Approved Training Provider']
    },
    {
      id: 'g2',
      name: 'Texas Public Education Grant (TPEG)',
      amount: 1500,
      status: 'Not Started',
      deadline: '2025-12-01',
      requirements: ['FAFSA Completion', 'Financial Need']
    }
  ];

  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount) return;
    const expense: Expense = {
        id: Date.now().toString(),
        name: newExpense.name,
        amount: Number(newExpense.amount),
        category: newExpense.category as any,
        frequency: newExpense.frequency as any,
        isEssential: newExpense.isEssential || false
    };
    updateData({ expenses: [...expenses, expense] });
    setShowAddExpense(false);
    setNewExpense({ category: 'Food', name: '', amount: 0, frequency: 'Monthly', isEssential: true });
  };

  const handleDeleteExpense = (id: string) => {
    updateData({ expenses: expenses.filter(e => e.id !== id) });
  };

  const handleRunCFO = async () => {
    setIsAnalyzing(true);
    const analysis = await analyzeFinancialHealth(expenses, cashOnHand);
    setAiAnalysis(analysis);
    setIsAnalyzing(false);
  };

  const handleNegotiate = async (expense: Expense) => {
    setIsAnalyzing(true);
    setSelectedBill(expense);
    const script = await negotiateBill(expense.name, expense.amount, expense.category);
    setNegotiationScript(script);
    setIsAnalyzing(false);
  };

  // --- MLE WIZARD LOGIC ---
  
  const HOUSTON_DEFAULTS = {
    housing: { rent: 1350, insurance: 20 },
    utilities: { electric: 160, internet: 70, phone: 60 },
    transport: { carNote: 450, carIns: 140, gas: 150 },
    living: { groceries: 400, sub: 15 }
  };

  const handleWizardSubmit = () => {
      // Convert MLE temp data to real expenses
      const newExpenses = mleData.map((item, idx) => ({
          id: `mle-${Date.now()}-${idx}`,
          category: item.category || 'Housing',
          name: item.name || 'Expense',
          amount: Number(item.amount) || 0,
          frequency: 'Monthly',
          isEssential: true
      } as Expense));

      // Merge with existing or replace
      updateData({ expenses: [...expenses, ...newExpenses] });
      setShowMLEWizard(false);
      setActiveTab('budget');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setIsUploading(true);
        
        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64 = (event.target?.result as string).split(',')[1];
            const mimeType = file.type;
            
            const result = await analyzeBankStatement(base64, mimeType);
            
            if (result.suggestedExpenses.length > 0) {
                // Auto-add suggested
                const extracted: Expense[] = result.suggestedExpenses.map((ex: any, i: number) => ({
                    ...ex,
                    id: `ai-${Date.now()}-${i}`
                }));
                updateData({ expenses: [...expenses, ...extracted] });
                alert(`AI successfully extracted ${extracted.length} expenses!`);
            }
            setAiAnalysis(result.text); // Show analysis text in AI tab
            setIsUploading(false);
            setActiveTab('ai-cfo'); // Switch to show result
        };
        reader.readAsDataURL(file);
    }
  };

  // Data for Chart
  const chartData = [
    { name: 'Needs', value: expenses.filter(e => e.isEssential).reduce((a, b) => a + b.amount, 0) },
    { name: 'Wants', value: expenses.filter(e => !e.isEssential).reduce((a, b) => a + b.amount, 0) },
  ];

  return (
    <div className="space-y-6 relative">
      
      {/* MLE WIZARD MODAL */}
      {showMLEWizard && (
          <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
                  <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                      <div>
                          <h2 className="text-xl font-bold flex items-center gap-2">
                              <Calculator className="w-5 h-5 text-emerald-400" /> MLE Onboarding
                          </h2>
                          <p className="text-slate-400 text-xs">Minimal Living Expenses Setup (Houston/Texas Avgs)</p>
                      </div>
                      <button onClick={() => setShowMLEWizard(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
                  </div>
                  
                  <div className="p-8">
                      {/* Step 1: Housing */}
                      {mleStep === 0 && (
                          <div className="space-y-4 animate-fade-in">
                              <h3 className="font-bold text-slate-800 text-lg">Step 1: Housing & Power</h3>
                              <p className="text-sm text-slate-500">Housing is typically 30-40% of the budget. Electricity in Texas is a major variable.</p>
                              
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rent / Mortgage</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.housing.rent}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Rent/Mortgage');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Rent/Mortgage', amount: Number(e.target.value), category: 'Housing' }]);
                                        }}
                                      />
                                      <span className="text-[10px] text-emerald-600 font-medium">Houston Avg: $1,350</span>
                                  </div>
                                  <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Electricity (Summer)</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.utilities.electric}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Electric Bill');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Electric Bill', amount: Number(e.target.value), category: 'Utilities' }]);
                                        }}
                                      />
                                      <span className="text-[10px] text-emerald-600 font-medium">Texas Avg: $160+</span>
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* Step 2: Transport */}
                      {mleStep === 1 && (
                          <div className="space-y-4 animate-fade-in">
                              <h3 className="font-bold text-slate-800 text-lg">Step 2: Transportation</h3>
                              <p className="text-sm text-slate-500">Houston is a driving city. Don't forget tolls and insurance.</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Car Note</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.transport.carNote}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Car Note');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Car Note', amount: Number(e.target.value), category: 'Transport' }]);
                                        }}
                                      />
                                  </div>
                                   <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Insurance</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.transport.carIns}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Car Insurance');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Car Insurance', amount: Number(e.target.value), category: 'Transport' }]);
                                        }}
                                      />
                                  </div>
                                   <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Gas/Fuel</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.transport.gas}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Gas');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Gas', amount: Number(e.target.value), category: 'Transport' }]);
                                        }}
                                      />
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* Step 3: Essentials */}
                      {mleStep === 2 && (
                          <div className="space-y-4 animate-fade-in">
                              <h3 className="font-bold text-slate-800 text-lg">Step 3: Essentials</h3>
                              <p className="text-sm text-slate-500">The bare minimums to stay connected and fed.</p>
                              
                              <div className="grid grid-cols-1 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Groceries</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.living.groceries}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Groceries');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Groceries', amount: Number(e.target.value), category: 'Food' }]);
                                        }}
                                      />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                                        <input 
                                            type="number" 
                                            defaultValue={HOUSTON_DEFAULTS.utilities.phone}
                                            className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                            onChange={(e) => {
                                                const exists = mleData.find(d => d.name === 'Phone Bill');
                                                if(exists) exists.amount = Number(e.target.value);
                                                else setMleData([...mleData, { name: 'Phone Bill', amount: Number(e.target.value), category: 'Utilities' }]);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Internet</label>
                                        <input 
                                            type="number" 
                                            defaultValue={HOUSTON_DEFAULTS.utilities.internet}
                                            className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                            onChange={(e) => {
                                                const exists = mleData.find(d => d.name === 'Internet');
                                                if(exists) exists.amount = Number(e.target.value);
                                                else setMleData([...mleData, { name: 'Internet', amount: Number(e.target.value), category: 'Utilities' }]);
                                            }}
                                        />
                                    </div>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>

                  <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between">
                       {mleStep > 0 ? (
                           <button onClick={() => setMleStep(prev => prev - 1)} className="text-slate-500 font-bold px-4 py-2 hover:bg-slate-200 rounded-lg">Back</button>
                       ) : <div></div>}

                       {mleStep < 2 ? (
                           <button onClick={() => setMleStep(prev => prev + 1)} className="bg-slate-900 text-white font-bold px-6 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2">Next <ChevronRight className="w-4 h-4"/></button>
                       ) : (
                           <button onClick={handleWizardSubmit} className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200">Finish & Create Budget</button>
                       )}
                  </div>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-emerald-800 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div>
                <h2 className="text-3xl font-bold">Financial Command Center</h2>
                <p className="text-emerald-100">Optimize runway, cut burn rate, and manage capital.</p>
            </div>
            <div className="flex gap-3">
                <div className="text-right px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="text-xs text-emerald-200 uppercase font-bold">Cash Runway</div>
                    <div className="text-2xl font-bold">{runwayMonths} Months</div>
                </div>
                <div className="text-right px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="text-xs text-emerald-200 uppercase font-bold">Monthly Burn</div>
                    <div className="text-2xl font-bold text-red-300">${totalMonthlyExpenses.toLocaleString()}</div>
                </div>
            </div>
        </div>
      </div>

      {/* Tabs & Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-fit shadow-sm">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2 ${activeTab === 'overview' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <PieChart className="w-4 h-4" /> Overview
            </button>
            <button 
                onClick={() => setActiveTab('budget')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2 ${activeTab === 'budget' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <Wallet className="w-4 h-4" /> Living Expenses
            </button>
            <button 
                onClick={() => setActiveTab('ai-cfo')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2 ${activeTab === 'ai-cfo' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <BrainCircuit className="w-4 h-4" /> AI CFO & Bills
            </button>
        </div>

        <button 
          onClick={() => setShowMLEWizard(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-800 transition shadow-md"
        >
           <Calculator className="w-4 h-4" /> MLE Wizard
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Burn Visualization */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" /> Burn Analysis (Needs vs. Wants)
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={60} tick={{fontSize: 12, fontWeight: 'bold'}} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.name === 'Needs' ? '#10B981' : '#F43F5E'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span>Essential: ${chartData[0].value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <span>Discretionary: ${chartData[1].value} (Target for Cuts)</span>
                    </div>
                </div>
            </div>

            {/* Capital Stack Summary */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-blue-600" /> Capital Sources
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Total Raised</div>
                        <div className="text-2xl font-bold text-slate-900">${totalRaised.toLocaleString()}</div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-bold text-slate-700 mb-2">Active Grants</h4>
                        {grants.map(g => (
                            <div key={g.id} className="flex justify-between items-center text-sm py-2 border-b border-slate-50 last:border-0">
                                <span>{g.name}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${g.status === 'Applied' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {g.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* BUDGET TAB */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                    <h3 className="font-bold text-slate-800">Living Expenses Ledger</h3>
                    <p className="text-sm text-slate-500">Track monthly recurring costs to calculate accurate burn rate.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.jpg,.png" onChange={handleFileUpload} />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition shadow-sm text-sm font-bold"
                        >
                           {isUploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Upload className="w-4 h-4"/>}
                           Upload Statement (AI)
                        </button>
                    </div>
                    <button 
                        onClick={() => setShowAddExpense(!showAddExpense)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shadow-sm text-sm font-bold"
                    >
                        {showAddExpense ? 'Cancel' : <><Plus className="w-4 h-4" /> Add Manual</>}
                    </button>
                </div>
            </div>

            {showAddExpense && (
                <div className="p-6 bg-emerald-50 border-b border-emerald-100 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-emerald-800 uppercase">Expense Name</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-emerald-200 rounded" 
                            placeholder="e.g. Car Insurance"
                            value={newExpense.name}
                            onChange={e => setNewExpense({...newExpense, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-emerald-800 uppercase">Amount</label>
                        <input 
                            type="number" 
                            className="w-full p-2 border border-emerald-200 rounded" 
                            placeholder="0.00"
                            value={newExpense.amount || ''}
                            onChange={e => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-emerald-800 uppercase">Category</label>
                        <select 
                            className="w-full p-2 border border-emerald-200 rounded"
                            value={newExpense.category}
                            onChange={e => setNewExpense({...newExpense, category: e.target.value as any})}
                        >
                            <option value="Housing">Housing</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Debt">Debt</option>
                            <option value="Subscription">Subscription</option>
                        </select>
                    </div>
                    <button onClick={handleAddExpense} className="bg-emerald-600 text-white p-2.5 rounded font-bold">Save</button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-semibold">
                        <tr>
                            <th className="p-4">Expense Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Frequency</th>
                            <th className="p-4">Type</th>
                            <th className="p-4 text-right">Amount</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {expenses.map(expense => (
                            <tr key={expense.id} className="hover:bg-slate-50">
                                <td className="p-4 font-medium text-slate-900">{expense.name}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold border ${
                                        expense.category === 'Housing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                        expense.category === 'Food' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                        'bg-slate-50 text-slate-600 border-slate-200'
                                    }`}>
                                        {expense.category}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-500">{expense.frequency}</td>
                                <td className="p-4">
                                    {expense.isEssential ? 
                                        <span className="text-green-600 flex items-center gap-1 font-bold text-xs"><CheckCircle2 className="w-3 h-3"/> Need</span> : 
                                        <span className="text-rose-500 flex items-center gap-1 font-bold text-xs"><AlertTriangle className="w-3 h-3"/> Want</span>
                                    }
                                </td>
                                <td className="p-4 text-right font-mono font-bold text-slate-800">${expense.amount.toFixed(2)}</td>
                                <td className="p-4 text-center">
                                    <button onClick={() => handleDeleteExpense(expense.id)} className="text-slate-400 hover:text-rose-500 transition">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-slate-50 font-bold">
                            <td colSpan={4} className="p-4 text-right text-slate-600">MONTHLY TOTAL</td>
                            <td className="p-4 text-right text-emerald-700">${totalMonthlyExpenses.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* AI CFO TAB */}
      {activeTab === 'ai-cfo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CFO Analysis */}
            <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-xl shadow-lg text-white">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-emerald-400" /> Virtual CFO
                    </h3>
                    <p className="text-slate-300 text-sm mb-4">
                        Analyzes your burn rate and capital stack to provide ruthless strategic advice.
                    </p>
                    <button 
                        onClick={handleRunCFO}
                        disabled={isAnalyzing}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold flex items-center justify-center gap-2 transition"
                    >
                        {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                        Run Financial Diagnostic
                    </button>
                </div>

                {aiAnalysis && (
                    <div className="bg-white p-6 rounded-xl border border-emerald-200 shadow-sm prose prose-sm max-w-none">
                        <h4 className="text-emerald-800 font-bold border-b border-emerald-100 pb-2 mb-4">
                            <FileText className="w-4 h-4 inline mr-2" /> CFO Report / Bank Analysis
                        </h4>
                        <div className="whitespace-pre-wrap text-slate-700">{aiAnalysis}</div>
                    </div>
                )}
            </div>

            {/* Bill Negotiator */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-purple-600" /> Bill Negotiator
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                    Select a recurring bill. The AI will generate a specific script to read to customer service to lower your rate.
                </p>

                <div className="space-y-3 mb-6">
                    {expenses.filter(e => e.category === 'Utilities' || e.category === 'Subscription' || e.category === 'Debt').map(bill => (
                        <button 
                            key={bill.id}
                            onClick={() => handleNegotiate(bill)}
                            className="w-full p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-lg flex justify-between items-center transition group"
                        >
                            <span className="font-bold text-slate-700 group-hover:text-purple-700">{bill.name} (${bill.amount})</span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500" />
                        </button>
                    ))}
                </div>

                {isAnalyzing && !aiAnalysis && (
                    <div className="flex items-center gap-2 text-purple-600 text-sm font-bold justify-center p-4">
                        <Loader2 className="w-4 h-4 animate-spin" /> Generating Script...
                    </div>
                )}

                {negotiationScript && (
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-purple-800 uppercase">Script for {selectedBill?.name}</span>
                            <button 
                                onClick={() => navigator.clipboard.writeText(negotiationScript)} 
                                className="text-xs text-purple-600 hover:underline"
                            >
                                Copy
                            </button>
                        </div>
                        <div className="text-sm text-slate-800 whitespace-pre-wrap font-medium">
                            {negotiationScript}
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};
```

### components/Workbook.tsx
```typescript
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { generateWeeklyRecap, draftDailyPlan } from '../services/geminiService';
import { WeeklyRecap } from '../types';
import { BookOpen, Calendar, CheckCircle2, ChevronRight, Coffee, Moon, Sparkles, Target, Trophy, List, Loader2, ArrowRight } from 'lucide-react';

export const Workbook: React.FC = () => {
  const { data, updateData } = useData();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'plan'>('daily');
  
  // Daily State
  const [dayPhase, setDayPhase] = useState<'morning' | 'evening'>('morning');
  const [morningIntent, setMorningIntent] = useState('');
  const [eveningReflection, setEveningReflection] = useState('');
  
  // Weekly State
  const [isGeneratingRecap, setIsGeneratingRecap] = useState(false);
  
  // Planning State
  const [isPlanning, setIsPlanning] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState('');
  const [tomorrowPriorities, setTomorrowPriorities] = useState('');

  // --- DAILY LOGIC ---
  const handleLogEntry = (type: 'Morning Plan' | 'Evening Review') => {
    const content = type === 'Morning Plan' ? morningIntent : eveningReflection;
    if (!content) return;
    
    const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type,
        content,
        mood: 'Neutral' as any
    };
    
    updateData({ journal: [newEntry, ...data.journal] });
    if (type === 'Morning Plan') setMorningIntent('');
    if (type === 'Evening Review') setEveningReflection('');
    alert(`${type} logged successfully.`);
  };

  // --- WEEKLY RECAP LOGIC ---
  const handleGenerateRecap = async () => {
    setIsGeneratingRecap(true);
    
    // Gather last 7 days data
    const recentJournals = data.journal.slice(0, 10).map(j => j.content); // Simplified recent entries
    const totalTasks = data.routineTasks.length;
    const completedTasks = data.routineTasks.filter(t => t.status === 'Done').length;
    
    const resultStr = await generateWeeklyRecap(recentJournals, completedTasks, totalTasks);
    
    try {
        const result = JSON.parse(resultStr);
        const newRecap: WeeklyRecap = {
            id: Date.now().toString(),
            weekStartDate: new Date().toLocaleDateString(),
            totalTasksCompleted: completedTasks,
            averageMood: 'High', // Simplified
            keyWins: result.keyWins || [],
            lessonsLearned: result.lessonsLearned || [],
            aiStrategyForNextWeek: result.aiStrategyForNextWeek || 'Keep pushing.',
            score: result.score || 85
        };
        
        updateData({ weeklyRecaps: [newRecap, ...(data.weeklyRecaps || [])] });
    } catch (e) {
        console.error("Failed to parse AI Recap", e);
    }
    setIsGeneratingRecap(false);
  };

  // --- PLANNING LOGIC ---
  const handleAutoPlan = async () => {
    setIsPlanning(true);
    const backlog = data.routineTasks.filter(t => t.status !== 'Done').map(t => t.title);
    const priorities = tomorrowPriorities.split(',').map(s => s.trim());
    
    const plan = await draftDailyPlan(priorities, backlog);
    setGeneratedSchedule(plan);
    setIsPlanning(false);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      
      {/* Workbook Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden shrink-0">
         <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-electric-400" /> Life & Career Workbook
                </h1>
                <p className="text-slate-300">
                    Reflect, Plan, and Execute. Your daily journal and strategic command center.
                </p>
            </div>
            
            <div className="flex bg-white/10 p-1 rounded-lg backdrop-blur-sm">
                <button 
                    onClick={() => setActiveTab('daily')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition flex items-center gap-2 ${activeTab === 'daily' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'}`}
                >
                    <Coffee className="w-4 h-4" /> Daily
                </button>
                 <button 
                    onClick={() => setActiveTab('plan')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition flex items-center gap-2 ${activeTab === 'plan' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'}`}
                >
                    <Target className="w-4 h-4" /> Planner
                </button>
                <button 
                    onClick={() => setActiveTab('weekly')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition flex items-center gap-2 ${activeTab === 'weekly' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'}`}
                >
                    <Trophy className="w-4 h-4" /> Weekly Review
                </button>
            </div>
         </div>
      </div>

      {/* --- DAILY TAB --- */}
      {activeTab === 'daily' && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Morning Card */}
            <div className={`rounded-xl border-2 transition-all duration-300 flex flex-col ${dayPhase === 'morning' ? 'border-orange-400 shadow-lg bg-orange-50/30' : 'border-slate-200 bg-white opacity-60 hover:opacity-100'}`} onClick={() => setDayPhase('morning')}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 rounded-t-xl">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-orange-500" /> Morning Intent
                    </h3>
                    {dayPhase === 'morning' && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold">Active</span>}
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                    <p className="text-sm text-slate-600">What is the ONE thing that makes today a success?</p>
                    <textarea 
                        value={morningIntent}
                        onChange={(e) => setMorningIntent(e.target.value)}
                        className="w-full flex-1 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-400 outline-none resize-none bg-white"
                        placeholder="I will focus on..."
                    />
                    <button 
                        onClick={() => handleLogEntry('Morning Plan')}
                        disabled={!morningIntent}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-lg font-bold shadow-lg shadow-orange-500/20 transition"
                    >
                        Commit to Day
                    </button>
                </div>
            </div>

            {/* Evening Card */}
            <div className={`rounded-xl border-2 transition-all duration-300 flex flex-col ${dayPhase === 'evening' ? 'border-purple-400 shadow-lg bg-purple-50/30' : 'border-slate-200 bg-white opacity-60 hover:opacity-100'}`} onClick={() => setDayPhase('evening')}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 rounded-t-xl">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Moon className="w-5 h-5 text-purple-500" /> Evening Reflection
                    </h3>
                    {dayPhase === 'evening' && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-bold">Active</span>}
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                    <p className="text-sm text-slate-600">Where did you win? Where did you learn?</p>
                    <textarea 
                        value={eveningReflection}
                        onChange={(e) => setEveningReflection(e.target.value)}
                        className="w-full flex-1 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-400 outline-none resize-none bg-white"
                        placeholder="Today I learned..."
                    />
                    <button 
                        onClick={() => handleLogEntry('Evening Review')}
                        disabled={!eveningReflection}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white rounded-lg font-bold shadow-lg shadow-purple-600/20 transition"
                    >
                        Log & Close Day
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- WEEKLY TAB --- */}
      {activeTab === 'weekly' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recap Generator */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-electric-600" /> Sunday Strategy Session
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                    AI analyzes your journal entries, completed tasks, and mood from the last 7 days to generate a tactical plan for next week.
                </p>
                <button 
                    onClick={handleGenerateRecap}
                    disabled={isGeneratingRecap}
                    className="w-full py-4 bg-electric-600 hover:bg-electric-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-xl shadow-electric-500/20"
                >
                    {isGeneratingRecap ? <Loader2 className="w-5 h-5 animate-spin"/> : <Trophy className="w-5 h-5" />}
                    Generate Weekly Recap
                </button>
            </div>

            {/* Past Recaps */}
            <div className="lg:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-800">Recap History</h3>
                {(data.weeklyRecaps || []).length === 0 ? (
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                        No weekly recaps generated yet.
                    </div>
                ) : (
                    (data.weeklyRecaps || []).map(recap => (
                        <div key={recap.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase">Week Of</div>
                                    <div className="text-lg font-bold text-slate-800">{recap.weekStartDate}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-electric-600">{recap.score}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase">Wk Score</div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                    <h4 className="font-bold text-green-800 text-sm mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Key Wins</h4>
                                    <ul className="list-disc list-inside text-xs text-green-700 space-y-1">
                                        {recap.keyWins.map((win, i) => <li key={i}>{win}</li>)}
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-2"><Target className="w-4 h-4"/> Next Week Strategy</h4>
                                    <p className="text-xs text-blue-700 leading-relaxed">
                                        {recap.aiStrategyForNextWeek}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      )}

      {/* --- PLANNER TAB --- */}
      {activeTab === 'plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Input Side */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-500" /> Plan Tomorrow
                </h3>
                
                <div className="space-y-4 flex-1">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Primary Focus / Must Do</label>
                        <input 
                            type="text"
                            value={tomorrowPriorities}
                            onChange={(e) => setTomorrowPriorities(e.target.value)} 
                            className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                            placeholder="e.g. Finish Module 4, Call 3 Investors"
                        />
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <h4 className="font-bold text-slate-700 text-xs uppercase mb-2">Backlog (Unfinished Tasks)</h4>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {data.routineTasks.filter(t => t.status !== 'Done').map(t => (
                                <div key={t.id} className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                                    {t.title} <span className="text-slate-400">- {t.priority}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleAutoPlan}
                        disabled={isPlanning}
                        className="w-full mt-auto py-3 bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                    >
                        {isPlanning ? <Loader2 className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4 text-yellow-400"/>}
                        AI Auto-Schedule
                    </button>
                </div>
            </div>

            {/* Output Side */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner flex flex-col">
                <h3 className="font-bold text-slate-800 mb-4">Proposed Schedule</h3>
                {generatedSchedule ? (
                    <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 whitespace-pre-wrap font-mono text-sm text-slate-700 shadow-sm overflow-y-auto">
                        {generatedSchedule}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <List className="w-12 h-12 mb-2 opacity-20" />
                        <p>Enter priorities and click Auto-Schedule</p>
                    </div>
                )}
                
                {generatedSchedule && (
                    <button className="mt-4 w-full py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100">
                        Confirm & Save to Calendar
                    </button>
                )}
            </div>
        </div>
      )}
    </div>
  );
};
```
