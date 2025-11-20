# SolarCareer.Pro - Database Schema Documentation

## Overview
The application uses Firebase Firestore with a user-centric data model. Each authenticated user has their own isolated data structure.

## Database Structure

```
firestore/
└── users/
    └── {userId}/                    # User document (root)
        ├── profile                  # User profile data (in user doc)
        ├── settings                 # User preferences (in user doc)
        ├── onboarding               # Onboarding state (in user doc)
        │
        ├── certifications/          # Subcollection
        │   └── {certId}/
        │
        ├── routineTasks/            # Subcollection
        │   └── {taskId}/
        │
        ├── investors/               # Subcollection
        │   └── {investorId}/
        │
        ├── investorUpdates/         # Subcollection
        │   └── {updateId}/
        │
        ├── journal/                 # Subcollection
        │   └── {entryId}/
        │
        ├── expenses/                # Subcollection
        │   └── {expenseId}/
        │
        ├── fieldLogs/               # Subcollection
        │   └── {logId}/
        │
        └── weeklyRecaps/            # Subcollection
            └── {recapId}/
```

## User Document Schema

### Path: `users/{userId}`

```typescript
{
  // Profile Information
  profile: {
    displayName: string;           // User's display name
    email: string;                 // User's email
    photoURL?: string;             // Profile photo URL
    createdAt: string;             // ISO timestamp
    lastLoginAt: string;           // ISO timestamp
  },
  
  // Onboarding State
  onboarding: {
    completed: boolean;            // Whether onboarding is complete
    currentStep: number;           // Current step (0-4)
    completedSteps: number[];      // Array of completed step indices
    startedAt?: string;            // When onboarding started
    completedAt?: string;          // When onboarding completed
  },
  
  // User Preferences
  settings: {
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      push: boolean;
      weeklyRecap: boolean;
    };
    defaultView: 'dashboard' | 'certifications' | 'financials';
    timezone: string;              // e.g., 'America/New_York'
  },
  
  // Application Data
  userRole: UserRole;              // ADMIN | INVESTOR
  syncSettings: {
    externalAppUrl: string;
    firebaseConfig?: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
    };
    lastSync: string | null;
    isConnected: boolean;
  },
  
  // Metadata
  createdAt: string;               // ISO timestamp
  updatedAt: string;               // ISO timestamp
  version: number;                 // Schema version for migrations
}
```

## Subcollection Schemas

### Certifications: `users/{userId}/certifications/{certId}`

```typescript
{
  id: string;
  name: string;                    // e.g., "NABCEP PV Associate"
  provider: string;                // e.g., "Everblue", "NABCEP"
  status: 'Completed' | 'In Progress' | 'Upcoming';
  progress: number;                // 0-100
  totalHours: number;
  completedHours: number;
  targetDate: string;              // ISO date string
  cost: number;
  paid: boolean;
  prerequisites: string[];
  practiceExamScores?: {
    date: string;
    score: number;
  }[];
  createdAt: string;
  updatedAt: string;
}
```

### Routine Tasks: `users/{userId}/routineTasks/{taskId}`

```typescript
{
  id: string;
  title: string;
  description?: string;
  category: 'Morning' | 'Training' | 'Evening' | 'Financial' | 'Career' | 'General';
  status: 'Todo' | 'In_Progress' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: string;                // ISO date string
  tags?: string[];
  source: 'Manual' | 'AI_Coach' | 'CFO' | 'Career_Audit';
  timeEstimate?: string;
  completedAt?: string;            // ISO timestamp when completed
  createdAt: string;
  updatedAt: string;
}
```

### Investors: `users/{userId}/investors/{investorId}`

```typescript
{
  id: string;
  name: string;
  type: 'Equity' | 'Loan' | 'Grant';
  status: 'Prospect' | 'Contacted' | 'Committed' | 'Wired';
  amount: number;
  email: string;
  phone?: string;
  lastContact: string;             // ISO date string
  notes: string;
  createdAt: string;
  updatedAt: string;
}
```

### Expenses: `users/{userId}/expenses/{expenseId}`

```typescript
{
  id: string;
  category: 'Housing' | 'Food' | 'Transport' | 'Utilities' | 'Debt' | 'Subscription';
  name: string;
  amount: number;
  frequency: 'Monthly' | 'One-Time';
  isEssential: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Field Logs: `users/{userId}/fieldLogs/{logId}`

```typescript
{
  id: string;
  date: string;                    // ISO date string
  location: string;
  hours: number;
  task: string;
  verified: boolean;
  coordinates?: {
    lat: number;
    lng: number;
    accuracy: number;
  };
  createdAt: string;
  updatedAt: string;
}
```

### Journal Entries: `users/{userId}/journal/{entryId}`

```typescript
{
  id: string;
  date: string;                    // ISO date string
  type: 'Morning Plan' | 'Evening Review';
  content: string;
  mood: 'High' | 'Neutral' | 'Low';
  aiFeedback?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Weekly Recaps: `users/{userId}/weeklyRecaps/{recapId}`

```typescript
{
  id: string;
  weekStartDate: string;           // ISO date string
  totalTasksCompleted: number;
  averageMood: string;
  keyWins: string[];
  lessonsLearned: string[];
  aiStrategyForNextWeek: string;
  score: number;                   // 0-100
  createdAt: string;
  updatedAt: string;
}
```

## Security Rules

All data is user-scoped. Users can only read/write their own data:

```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
  
  match /{collection}/{document=**} {
    allow read, write: if request.auth != null && request.auth.uid == userId;
  }
}
```

## Indexes Required

For optimal query performance, create composite indexes:

1. **Certifications by Status and Target Date**
   - Collection: `certifications`
   - Fields: `status` (Ascending), `targetDate` (Ascending)

2. **Tasks by Status and Due Date**
   - Collection: `routineTasks`
   - Fields: `status` (Ascending), `dueDate` (Ascending)

3. **Field Logs by Date**
   - Collection: `fieldLogs`
   - Fields: `date` (Descending)

4. **Expenses by Category**
   - Collection: `expenses`
   - Fields: `category` (Ascending), `createdAt` (Descending)

## Data Migration

When updating the schema:
1. Increment the `version` field in user documents
2. Create migration functions to update existing data
3. Maintain backward compatibility where possible

## Default Data

New users receive:
- Default certifications (NABCEP PV Associate, PVIP, ESIP)
- Empty collections for all subcollections
- Default settings and preferences
- Onboarding state initialized to step 0

