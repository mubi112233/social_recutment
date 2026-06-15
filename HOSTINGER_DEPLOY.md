# Hostinger Deployment (Next.js)

This project is configured to run on Hostinger Node.js hosting after build.

## 1) Hostinger Node App Settings

- **Node.js version:** `18+` (recommended `20`)
- **Application mode:** `Production`
- **Application root:** your project folder
- **Startup command:** `npm run start`

`next start` uses the platform-provided `PORT` automatically.

## 2) Upload Files

Upload your project to Hostinger (Git deploy or File Manager), including:

- `package.json`
- `package-lock.json`
- `next.config.js`
- `src/`
- `public/` (if present)
- config files (`tsconfig.json`, `postcss.config.js`, `tailwind.config.ts`, etc.)

Do **not** upload:

- `.next/`
- `node_modules/`

## 3) Environment Variables (Hostinger panel)

Set these values in Hostinger environment variables:

- `NEXT_PUBLIC_API_BASE=https://api.don-va.com`
- `NEXT_PUBLIC_TENANT_ID=socal_media_agency`
- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_URL=https://don-sr.com`  ← **critical for SEO**

> **Canonical URL & www redirect — important:**
> The value of `NEXT_PUBLIC_SITE_URL` must exactly match the URL that Hostinger actually serves the site on.
> - If Hostinger redirects `don-sr.com` → `www.don-sr.com`, set this to `https://www.don-sr.com`
> - If Hostinger serves on `don-sr.com` (no www), set this to `https://don-sr.com`
>
> A mismatch causes Google to see canonical tags pointing to a URL that immediately redirects,
> which splits page authority and prevents proper indexing. Check which URL your browser lands on
> after visiting the site and set `NEXT_PUBLIC_SITE_URL` to match that exactly.
>
> **Recommended:** configure Hostinger to redirect `www.don-sr.com` → `don-sr.com` (non-www is canonical).
> This avoids needing to change any code.

**Important:** Do NOT use `http://localhost:5001` as the API_BASE. The backend server must be accessible from the internet. Use the server's public IP or domain (e.g., `http://srv1201161:5001` or `https://api.yourdomain.com`).

**Backend CORS Configuration:** Ensure your backend server allows CORS requests from your Hostinger domain. Update the backend CORS origins to include `https://don-sr.com` (and `https://www.don-sr.com` if applicable).

## 4) Install + Build + Start

Run in Hostinger terminal:

```bash
npm ci
npm run build
npm run start
```

If `npm ci` is unavailable in your plan, use:

```bash
npm install
npm run build
npm run start
```

## 5) Domain and HTTPS

- Point your domain/subdomain to this Node app in Hostinger.
- Enable SSL in Hostinger so your app runs on HTTPS.

## 6) Quick Troubleshooting

- **Port in use:** keep startup command as `npm run start` (Hostinger manages port binding).
- **Build errors:** ensure env vars are set before running `npm run build`.
- **404 on localized route (`/en`, `/ge`):** verify latest build completed successfully.
- **Runtime cache oddities:** clear app cache / restart app from Hostinger panel.

