# Server Component Error Debugging Guide

## Issue: "An error occurred in the Server Components render"

This error typically occurs when a Server Component fails during rendering. The digest property in the browser console can help identify the specific component.

## What I've Fixed

1. **Fixed environment variable typo**
   - Changed `NEXT_PUBLIC_TENANT_ID=socal_media_agency` to `NEXT_PUBLIC_TENANT_ID=social_media_agency`
   - This was likely causing API requests to fail with the wrong tenant ID

2. **Added Error Boundaries**
   - Created `src/app/error.tsx` for global error handling
   - Created `src/app/[lang]/error.tsx` for language-route-specific error handling
   - These will now show detailed error information and provide a "Try Again" button

## Debugging Steps

### Step 1: Check the Browser Console
1. Open your browser's Developer Tools (F12)
2. Look for the error message with a **digest** property
3. Screenshot or note the digest value

### Step 2: Check Network Requests
1. Open the **Network** tab in DevTools
2. Filter for requests to `api.don-va.com`
3. Look for failed requests (red X or 4xx/5xx status codes)
4. Check the response headers and body for error details

### Step 3: Verify API Connectivity
Run this in your terminal to test the API:

```bash
curl -H "X-Tenant-ID: social_media_agency" https://api.don-va.com/api/hero?lang=en
```

Expected: Should return JSON data with hero content, not an error

### Step 4: Check Server Logs
1. If running locally with `npm run dev`, check the terminal for error messages
2. If deployed, check your hosting provider's logs (Vercel, Hostinger, etc.)

## Common Causes

| Cause | Signs | Solution |
|-------|-------|----------|
| API is down | Network tab shows connection refused | Check api.don-va.com status, verify API is running |
| Wrong tenant ID | 401/403 errors from API | Verify `NEXT_PUBLIC_TENANT_ID` in `.env` matches API config |
| Missing environment variables | Undefined errors in console | Check all required variables in `.env` |
| Invalid API response | JSON parse errors | Check API endpoint is returning valid JSON |
| Network/CORS issue | CORS errors in console | Add CORS headers on API side if needed |

## Environment Variables Checklist

Verify your `.env` file contains:

```env
NEXT_PUBLIC_API_BASE=https://api.don-va.com
NEXT_PUBLIC_API_BASE_URL=https://api.don-va.com
NEXT_PUBLIC_TENANT_ID=social_media_agency

VITE_API_BASE=https://api.don-va.com
VITE_DATABASE=social_media_agency
```

## Next Steps

1. **Run the curl command above** to verify API connectivity
2. **Check the error boundary** - you should now see a "Page Load Failed" message with error details
3. **Review the digest ID** if the error persists - it may help identify which component is failing
4. **Check server logs** for more detailed stack traces

## Related Files

- Error handlers: `src/app/error.tsx` and `src/app/[lang]/error.tsx`
- API configuration: `src/lib/api.ts`
- Data fetching: `src/lib/data-fetching.ts`
- Environment config: `.env` and `next.config.js`
