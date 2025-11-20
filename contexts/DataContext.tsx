
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
    externalAppUrl: 'https://ai-powered-life-transformation-dashboard-964230156163.us-west1.run.app',
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
