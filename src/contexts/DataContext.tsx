import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, deleteDoc, collection, onSnapshot, query, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { AppData, UserRole, Certification, Investor, RoutineTask, Expense, FieldLog, JournalEntry, WeeklyRecap, InvestorUpdate } from '../types';
import { INITIAL_CERTIFICATIONS } from '../constants';

// Default empty state
const EMPTY_DATA: AppData = {
  userRole: UserRole.ADMIN,
  certifications: [],
  investors: [],
  investorUpdates: [],
  routineTasks: [],
  journal: [],
  weeklyRecaps: [],
  fieldLogs: [],
  expenses: [],
  syncSettings: { externalAppUrl: '', isConnected: false, lastSync: null },
  lastSaved: new Date().toISOString()
};

interface DataContextType {
  data: AppData;
  loading: boolean;
  updateData: (newData: Partial<AppData>) => Promise<void>;
  resetDatabase: () => void;
  exportDatabase?: () => void;
  importDatabase?: (file: File) => Promise<boolean>;
  exportFramework?: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [data, setData] = useState<AppData>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------------------
  // FIRESTORE LISTENERS
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!currentUser) {
      setData(EMPTY_DATA);
      setLoading(false);
      return;
    }

    const userId = currentUser.uid;
    setLoading(true);

    // 1. Listener for Main User Document (SyncSettings, Role, Profile)
    const unsubUser = onSnapshot(doc(db, 'users', userId), (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setData(prev => ({
          ...prev,
          userRole: userData.userRole || UserRole.ADMIN,
          syncSettings: userData.syncSettings || EMPTY_DATA.syncSettings,
          lastSaved: new Date().toISOString()
        }));
      } else {
        // Initialize new user with onboarding state
        setDoc(doc(db, 'users', userId), { 
            userRole: UserRole.ADMIN,
            onboarding: {
              completed: false,
              currentStep: 0,
              completedSteps: [],
              startedAt: new Date().toISOString()
            },
            profile: {
              displayName: currentUser.displayName || '',
              email: currentUser.email || '',
              photoURL: currentUser.photoURL || null,
              createdAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString(),
            },
            settings: {
              theme: 'light',
              notifications: {
                email: true,
                push: true,
                weeklyRecap: true,
              },
              defaultView: 'dashboard',
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1
        }, { merge: true });
      }
    });

    // 2. Helper to listen to collections
    const subscribeToCollection = (colName: string, key: keyof AppData) => {
        const q = query(collection(db, 'users', userId, colName));
        return onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setData(prev => ({ ...prev, [key]: items }));
        });
    };

    const unsubCerts = subscribeToCollection('certifications', 'certifications');
    const unsubTasks = subscribeToCollection('routineTasks', 'routineTasks');
    const unsubInvestors = subscribeToCollection('investors', 'investors');
    const unsubJournal = subscribeToCollection('journal', 'journal');
    const unsubExpenses = subscribeToCollection('expenses', 'expenses');
    const unsubLogs = subscribeToCollection('fieldLogs', 'fieldLogs');
    const unsubRecaps = subscribeToCollection('weeklyRecaps', 'weeklyRecaps');
    const unsubUpdates = subscribeToCollection('investorUpdates', 'investorUpdates');

    setLoading(false);

    return () => {
        unsubUser();
        unsubCerts();
        unsubTasks();
        unsubInvestors();
        unsubJournal();
        unsubExpenses();
        unsubLogs();
        unsubRecaps();
        unsubUpdates();
    };
  }, [currentUser]);


  // ----------------------------------------------------------------
  // DATA MUTATION HANDLER
  // ----------------------------------------------------------------
  // This function bridges the gap between the legacy monolithic update 
  // and the new Firestore collection structure.
  const updateData = async (newData: Partial<AppData>) => {
    if (!currentUser) return;
    const userId = currentUser.uid;
    const batch = writeBatch(db);
    let hasBatchOps = false;

    // Helper to process array updates by determining diffs (Basic implementation: Overwrite/Merge strategy)
    // NOTE: For a true production app, we'd use add/update/delete methods. 
    // Here we iterate and setDoc/merge to ensure UI state reflects in DB.
    
    const handleCollectionUpdate = async (collectionName: string, items: any[]) => {
        if (!items) return;
        // In a real migration, we would ideally only update changed items.
        // For this "Fix", we will loop through the items provided and ensure they are saved.
        // This allows existing components like "toggleTask" to work without rewrite.
        for (const item of items) {
            if (item.id) {
                const ref = doc(db, 'users', userId, collectionName, item.id);
                // We use setDoc with merge to update or create
                // We don't use batch here to avoid 500 limit in loops for safety in this specific bridge function
                await setDoc(ref, item, { merge: true }); 
            }
        }
    };

    // Process Collections
    if (newData.routineTasks) await handleCollectionUpdate('routineTasks', newData.routineTasks);
    if (newData.certifications) await handleCollectionUpdate('certifications', newData.certifications);
    if (newData.investors) await handleCollectionUpdate('investors', newData.investors);
    if (newData.journal) await handleCollectionUpdate('journal', newData.journal);
    if (newData.expenses) await handleCollectionUpdate('expenses', newData.expenses);
    if (newData.fieldLogs) await handleCollectionUpdate('fieldLogs', newData.fieldLogs);
    if (newData.weeklyRecaps) await handleCollectionUpdate('weeklyRecaps', newData.weeklyRecaps);
    if (newData.investorUpdates) await handleCollectionUpdate('investorUpdates', newData.investorUpdates);

    // Process Root Fields (Settings, Role)
    if (newData.syncSettings || newData.userRole) {
        const updatePayload: any = {};
        if (newData.syncSettings) updatePayload.syncSettings = newData.syncSettings;
        if (newData.userRole) updatePayload.userRole = newData.userRole;
        
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, updatePayload, { merge: true });
    }
  };

  const resetDatabase = async () => {
      if (window.confirm("Resetting will re-seed default data into Firestore. Continue?")) {
          if(!currentUser) return;
          const userId = currentUser.uid;
          
          // Seed Defaults
          for (const cert of INITIAL_CERTIFICATIONS) {
              await setDoc(doc(db, 'users', userId, 'certifications', cert.id), cert);
          }
          // Add other defaults here if needed
          alert("Database re-seeded with defaults.");
      }
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
    const framework: AppData = {
      ...data,
      userRole: UserRole.ADMIN,
      investors: [],
      investorUpdates: [],
      journal: [],
      weeklyRecaps: [],
      fieldLogs: [],
      syncSettings: { externalAppUrl: '', isConnected: false, lastSync: null },
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
      reader.onload = async (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string);
          if (parsed.routineTasks || parsed.certifications) {
            await updateData(parsed);
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

  return (
    <DataContext.Provider value={{ data, loading, updateData, resetDatabase, exportDatabase, importDatabase, exportFramework }}>
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