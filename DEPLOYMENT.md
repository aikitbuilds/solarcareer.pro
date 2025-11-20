# Deployment Guide

## Environment Variables Setup

This project requires Firebase environment variables to be set before building. These are **NOT** committed to the repository for security.

### Required Environment Variables

All Firebase configuration must be set via environment variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_GEMINI_API_KEY` (optional, for AI features)

### Local Development

1. Create `.env.local` file in the project root
2. Copy from `env.example` and fill in your values:
   ```bash
   cp env.example .env.local
   ```
3. Edit `.env.local` with your actual Firebase config values
4. Run `npm run dev`

### Production Build & Deploy

**Option 1: Set environment variables in your shell (recommended)**

Windows PowerShell:
```powershell
$env:VITE_FIREBASE_API_KEY="your-key-here"
$env:VITE_FIREBASE_AUTH_DOMAIN="solarcareer-a1106.firebaseapp.com"
$env:VITE_FIREBASE_PROJECT_ID="solarcareer-a1106"
$env:VITE_FIREBASE_STORAGE_BUCKET="solarcareer-a1106.firebasestorage.app"
$env:VITE_FIREBASE_MESSAGING_SENDER_ID="793049419872"
$env:VITE_FIREBASE_APP_ID="1:793049419872:web:40a28bc5ef015421a6f305"
npm run build
firebase deploy --only hosting
```

**Option 2: Use .env.production file (gitignored)**

1. Create `.env.production` file (already in .gitignore)
2. Add your production Firebase config
3. Vite will automatically use it during `npm run build`

**Option 3: CI/CD Pipeline**

Set environment variables in your CI/CD platform (GitHub Actions, etc.) before running the build command.

### Getting Firebase Configuration Values

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `solarcareer-a1106`
3. Go to Project Settings > General
4. Scroll to "Your apps" section
5. Click the web app icon
6. Copy the config values to your environment variables

### Security Notes

- ✅ Never commit `.env.local` or `.env.production` files
- ✅ These files are already in `.gitignore`
- ✅ Use `env.example` as a template only
- ✅ Firebase API keys are public by design, but it's still best practice to use environment variables

