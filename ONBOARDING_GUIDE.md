# Onboarding Process Guide

## Overview
New users are automatically guided through a 5-step onboarding process when they first sign in. This ensures they have a personalized setup and understand the platform.

## Onboarding Flow

### Step 1: Welcome
- Introduction to SolarCareer.Pro
- Overview of platform capabilities
- Sets the stage for personalization

### Step 2: Profile Setup
- **Display Name**: User's preferred name
- **Experience Level**: 
  - Beginner
  - Intermediate
  - Advanced

### Step 3: Goal Selection
Users can select multiple goals:
- NABCEP Certification
- Career Advancement
- Start Solar Business
- Learn Technical Skills

### Step 4: Primary Focus
Users select their main objective:
- Get Certified (NABCEP certifications)
- Advance Career (Grow in solar industry)
- Start Business (Launch solar company)

### Step 5: Completion
- Summary of what's been set up
- Next steps overview
- Redirects to dashboard

## Database Initialization

When onboarding is completed, the system automatically:

1. **Creates User Profile**
   - Display name
   - Email
   - Photo URL (if available)
   - Creation timestamp

2. **Sets Default Settings**
   - Theme: Light
   - Notifications: All enabled
   - Default view: Dashboard
   - Timezone: Auto-detected

3. **Initializes Default Certifications**
   - NABCEP PV Associate (In Progress)
   - NABCEP PVIP (Upcoming)
   - NABCEP ESIP (Upcoming)

4. **Marks Onboarding Complete**
   - Sets `onboarding.completed = true`
   - Records completion timestamp
   - User can now access full app

## Implementation Details

### Onboarding State Tracking
```typescript
onboarding: {
  completed: boolean;
  currentStep: number;        // 0-4
  completedSteps: number[];   // Array of completed step indices
  startedAt: string;          // ISO timestamp
  completedAt?: string;       // ISO timestamp (when completed)
}
```

### Checking Onboarding Status
The app checks onboarding status on every login:
- If `onboarding.completed === false` → Show onboarding
- If `onboarding.completed === true` → Show dashboard
- If user document doesn't exist → Show onboarding

### Skipping Onboarding
Users can navigate back/forward through steps, but must complete all steps to access the app. The onboarding state is saved after each step, so users can resume if they refresh.

## Customization

### Adding New Steps
1. Add step to `steps` array in `Onboarding.tsx`
2. Update step count in progress calculation
3. Add corresponding form fields to `formData` state
4. Update initialization logic if needed

### Modifying Default Data
Edit `INITIAL_CERTIFICATIONS` in `src/constants.ts` to change default certifications for new users.

## User Experience

- **Progress Bar**: Visual indicator of completion
- **Step Navigation**: Back/Next buttons with validation
- **Responsive Design**: Works on mobile and desktop
- **Smooth Transitions**: Animated step changes
- **Data Persistence**: Progress saved after each step

## Testing

To test onboarding:
1. Sign out
2. Sign in with a new Google account
3. Complete onboarding flow
4. Verify data is initialized correctly
5. Check that dashboard appears after completion

To reset onboarding for testing:
1. Go to Firestore Console
2. Find user document
3. Set `onboarding.completed = false`
4. Clear `onboarding.completedAt`
5. Refresh app

