# Security Fix: Removed Hardcoded Secrets

## Issue
GitHub secret scanner detected hardcoded Firebase API keys and configuration in `src/firebase.ts`.

## Resolution
- ✅ Removed all hardcoded Firebase configuration from source code
- ✅ Updated `src/firebase.ts` to use environment variables only
- ✅ Added validation to ensure required environment variables are set
- ✅ Updated documentation to reflect environment variable usage

## Required Actions

### For Local Development
1. Create `.env.local` file in the project root
2. Copy values from `env.example` and fill in your actual Firebase config
3. The `.env.local` file is already in `.gitignore` and will not be committed

### For Firebase Hosting Production Builds
Firebase Hosting needs environment variables at build time. You have two options:

**Option 1: Set environment variables before building**
```bash
# Windows PowerShell
$env:VITE_FIREBASE_API_KEY="your-key"
$env:VITE_FIREBASE_AUTH_DOMAIN="solarcareer-a1106.firebaseapp.com"
$env:VITE_FIREBASE_PROJECT_ID="solarcareer-a1106"
$env:VITE_FIREBASE_STORAGE_BUCKET="solarcareer-a1106.firebasestorage.app"
$env:VITE_FIREBASE_MESSAGING_SENDER_ID="793049419872"
$env:VITE_FIREBASE_APP_ID="1:793049419872:web:40a28bc5ef015421a6f305"
npm run build
firebase deploy
```

**Option 2: Use Firebase Functions environment config (recommended for CI/CD)**
Set environment variables in your CI/CD pipeline or Firebase project settings.

## Files Changed
- `src/firebase.ts` - Removed hardcoded config, now uses env vars only
- `FIREBASE_AUTH_SETUP.md` - Updated documentation

## Security Best Practices
- ✅ All secrets now use environment variables
- ✅ `.env.local` is in `.gitignore`
- ✅ `env.example` contains only placeholder values
- ✅ No sensitive data in source code

