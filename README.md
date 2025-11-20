<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Solar Career Transformation Manager

A comprehensive React application for managing solar career certifications, financials, and AI-powered coaching. Built with React 19, TypeScript, Vite, Firebase, and Google Gemini AI.

View your app in AI Studio: https://ai.studio/apps/drive/1OSnExkGx3dy7aQVQcuII7C1JsqWedgra

## Features

- 🔐 **Firebase Authentication** - Secure Google Sign-In
- 📊 **Real-time Data Sync** - Firestore database with live updates
- 🤖 **AI-Powered Coaching** - Gemini AI integration for career guidance
- 📈 **Financial Management** - Track expenses, investors, and financial health
- 🎓 **Certification Tracker** - Monitor NABCEP certifications and progress
- 📱 **PWA Ready** - Progressive Web App with offline support

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **Firebase Project** - [Create one here](https://console.firebase.google.com)
- **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (copy from `env.example`):

```bash
cp env.example .env.local
```

Then fill in your actual values:

**Firebase Configuration:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (or create a new one)
3. Go to Project Settings > General
4. Scroll to "Your apps" section
5. Click the web icon (`</>`) to add a web app
6. Copy the config values to `.env.local`

**Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy it to `VITE_GEMINI_API_KEY` in `.env.local`

**Example `.env.local`:**
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Configure Firestore Security Rules

The project includes security rules in `firestore.rules`. Deploy them to Firebase:

```bash
firebase deploy --only firestore:rules
```

Or manually copy the rules from `firestore.rules` to Firebase Console > Firestore Database > Rules.

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm start` - Start production server (requires build first)
- `npm run deploy` - Build and deploy to Firebase Hosting

## Project Structure

```
solarcareer.pro/
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React contexts (Auth, Data)
│   ├── services/        # API services (Gemini AI)
│   ├── types.ts         # TypeScript type definitions
│   ├── constants.ts     # App constants
│   ├── firebase.ts      # Firebase configuration
│   └── App.tsx          # Main app component
├── firestore.rules      # Firestore security rules
├── firebase.json        # Firebase configuration
└── vite.config.ts       # Vite build configuration
```

## Deployment

### Deploy to Firebase Hosting

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

Or use the Firebase CLI directly:
```bash
firebase deploy
```

## Security Notes

- ⚠️ **Never commit `.env.local`** - It's already in `.gitignore`
- ✅ Firestore security rules are configured to restrict access to authenticated users only
- ✅ All API keys are stored as environment variables

## Troubleshooting

**Issue: "API Key not found"**
- Ensure `.env.local` exists and contains `VITE_GEMINI_API_KEY`
- Restart the dev server after creating/updating `.env.local`

**Issue: Firebase authentication not working**
- Verify all Firebase environment variables are set correctly
- Check Firebase Console > Authentication > Sign-in method > Google is enabled

**Issue: Firestore permission denied**
- Deploy security rules: `firebase deploy --only firestore:rules`
- Verify user is authenticated

## License

Private project - All rights reserved
