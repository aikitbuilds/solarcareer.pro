# Firebase Authentication Setup Guide

## Issue: "auth/configuration-not-found" Error

This error occurs when Firebase Authentication is not enabled or Google Sign-In provider is not configured in your Firebase project.

## Solution: Enable Google Sign-In in Firebase Console

### Step 1: Open Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **solarcareer-a1106**

### Step 2: Enable Authentication
1. In the left sidebar, click **"Authentication"**
2. If you see "Get started", click it to enable Authentication
3. If Authentication is already enabled, proceed to Step 3

### Step 3: Enable Google Sign-In Provider
1. Click on the **"Sign-in method"** tab
2. You'll see a list of sign-in providers
3. Find **"Google"** in the list
4. Click on **"Google"**
5. Toggle the **"Enable"** switch to ON
6. Enter a **Project support email** (your email address)
7. Click **"Save"**

### Step 4: Configure OAuth Consent Screen (if needed)
If prompted, you may need to configure the OAuth consent screen:
1. Click the link to configure it in Google Cloud Console
2. Fill in the required information:
   - App name: **SolarCareer.Pro**
   - User support email: Your email
   - Developer contact information: Your email
3. Save the configuration

### Step 5: Authorized Domains
Firebase automatically adds your hosting domain, but verify:
1. In Authentication → Settings → Authorized domains
2. Ensure these domains are listed:
   - `solarcareer-a1106.web.app`
   - `solarcareer-a1106.firebaseapp.com`
   - `localhost` (for local development)

### Step 6: Test Authentication
1. Go back to your app: https://solarcareer-a1106.web.app
2. Click "Continue with Google"
3. You should see the Google sign-in popup
4. Sign in with your Google account

## Troubleshooting

### Still seeing the error?
1. **Clear browser cache** - Hard refresh (Ctrl+Shift+R)
2. **Check Firebase Console** - Verify Google provider shows as "Enabled"
3. **Wait a few minutes** - Changes can take 1-2 minutes to propagate
4. **Check browser console** - Look for any additional error messages

### Alternative: Use Email/Password Authentication
If you prefer email/password instead of Google:
1. In Firebase Console → Authentication → Sign-in method
2. Enable **"Email/Password"** provider
3. Update the Login component to use email/password instead

## Verification Checklist

- [ ] Authentication is enabled in Firebase Console
- [ ] Google Sign-In provider is enabled
- [ ] Project support email is set
- [ ] Authorized domains include your hosting URL
- [ ] Browser cache is cleared
- [ ] App is reloaded after configuration

## Need Help?

If you continue to experience issues:
1. Check Firebase Console → Authentication → Usage tab for any errors
2. Review browser console for detailed error messages
3. Verify your Firebase project ID matches: `solarcareer-a1106`

---

**Project Details:**
- Project ID: `solarcareer-a1106`
- Hosting URL: https://solarcareer-a1106.web.app

**Note:** All Firebase configuration values should be stored in environment variables (`.env.local`) and never committed to the repository. See `env.example` for the required variables.

