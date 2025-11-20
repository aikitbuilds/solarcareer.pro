# Troubleshooting Guide

## Dynamic Import Errors

If you see errors like:
```
TypeError: Failed to fetch dynamically imported module: https://solarcareer-a1106.web.app/assets/Dashboard-XXXXX.js
```

This is usually caused by cached service worker or browser cache with old file hashes.

### Quick Fix (For Users)

1. **Hard Refresh** (Recommended)
   - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Clear Browser Cache**
   - Open DevTools (F12)
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

3. **Unregister Service Worker**
   - Open DevTools (F12)
   - Go to Application tab
   - Click "Service Workers" in the left sidebar
   - Click "Unregister" next to the service worker
   - Refresh the page

### Technical Details

The service worker has been updated to:
- Use network-first strategy for JavaScript files (always fetches fresh)
- Increment cache version to force invalidation
- Immediately activate new service workers

The fix is deployed, but users with old service workers cached may need to hard refresh once.

