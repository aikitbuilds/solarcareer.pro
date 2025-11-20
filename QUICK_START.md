# Quick Start - Setting Up Environment Variables

## For Production Builds

Since we removed hardcoded secrets for security, you need to set environment variables before building.

### Recommended: Use Deployment Script

The easiest way to deploy is using the provided script:

```powershell
npm run deploy:prod
```

Or directly:
```powershell
powershell -ExecutionPolicy Bypass -File deploy.ps1
```

This script automatically sets all required environment variables and builds/deploys.

### Alternative: Manual Setup

Create a `.env.production` file in the project root (this file is gitignored):

```env
VITE_FIREBASE_API_KEY=AIzaSyBslJZB5r-ZjswWeYj3CyWxHpCYIZqsK9I
VITE_FIREBASE_AUTH_DOMAIN=solarcareer-a1106.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=solarcareer-a1106
VITE_FIREBASE_STORAGE_BUCKET=solarcareer-a1106.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=793049419872
VITE_FIREBASE_APP_ID=1:793049419872:web:40a28bc5ef015421a6f305
VITE_GEMINI_API_KEY=your_gemini_key_here
```

Then build and deploy:
```bash
npm run build
firebase deploy --only hosting
```

Vite will automatically use `.env.production` during the build.

### Alternative: Set in PowerShell Session

```powershell
$env:VITE_FIREBASE_API_KEY="AIzaSyBslJZB5r-ZjswWeYj3CyWxHpCYIZqsK9I"
$env:VITE_FIREBASE_AUTH_DOMAIN="solarcareer-a1106.firebaseapp.com"
$env:VITE_FIREBASE_PROJECT_ID="solarcareer-a1106"
$env:VITE_FIREBASE_STORAGE_BUCKET="solarcareer-a1106.firebasestorage.app"
$env:VITE_FIREBASE_MESSAGING_SENDER_ID="793049419872"
$env:VITE_FIREBASE_APP_ID="1:793049419872:web:40a28bc5ef015421a6f305"
npm run build
firebase deploy --only hosting
```

## For Local Development

Create `.env.local` (also gitignored):
```bash
cp env.example .env.local
# Then edit .env.local with your values
```

## Security Note

The `.env.production` and `.env.local` files are in `.gitignore` and will NOT be committed to the repository. This keeps your secrets safe.

