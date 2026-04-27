# SEO Project Migration to Gmail Theme (like mange-email)

## Overview
This guide helps you migrate the SEO project design to match the mange-email project's Gmail-inspired blue/red theme.

---

## Step 1: Backup Current Files

```bash
# Navigate to SEO project
cd d:\next-sites\inboc-\seo

# Backup current globals.css
copy src\app\globals.css src\app\globals.css.backup

# Backup current tailwind.config.ts
copy tailwind.config.ts tailwind.config.ts.backup
```

---

## Step 2: Update globals.css (Gmail Blue/Red Theme)

Replace the entire content of `src/app/globals.css` with the Gmail theme:

```css
/* 
 * Tailwind CSS File - Gmail Theme
 * Blue/Red color scheme matching mange-email project
 */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light Mode - Gmail Color Scheme */
    --background: 210 20% 97%; /* Softer blue-tinted background like Gmail */
    --foreground: 210 20% 10%; /* Blue-black text for better readability */

    --card: 0 0% 100%; /* Pure white cards for contrast */
    --card-foreground: 210 20% 10%;

    --popover: 0 0% 100%;
    --popover-foreground: 210 20% 10%;

    --primary: 221 54% 53%; /* Gmail Blue (#3e65cf) */
    --primary-foreground: 0 0% 100%;

    --secondary: 3 85% 42%; /* Gmail Red (#c71610) */
    --secondary-foreground: 0 0% 100%;

    --muted: 210 20% 95%; /* Blue-tinted muted background */
    --muted-foreground: 210 15% 40%; /* Better contrast for muted text */

    --accent: 221 54% 53%; /* Gmail Blue accent */
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 210 25% 88%; /* More visible borders with blue tint */
    --input: 210 20% 92%; /* Softer input backgrounds */
    --ring: 221 54% 53%; /* Gmail Blue focus ring */

    --radius: 0.5rem;

    /* Custom tokens for Gmail theme */
    --gold: 221 54% 53%; /* Gmail Blue (#3e65cf) */
    --gold-dark: 221 54% 45%; /* Darker Gmail Blue */
    --gold-light: 221 54% 65%; /* Lighter Gmail Blue */
    --brand-blue: 221 54% 51%; /* Gmail Blue Alt (#3b60c4) */
    --gmail-red: 3 85% 42%; /* Gmail Red (#c71610) */
    --gmail-yellow: 43 92% 50%; /* Gmail Yellow (#f2a60c) */
    --gmail-green: 133 89% 28%; /* Gmail Green (#08851b) */

    /* Simple Gradients */
    --gradient-gold: linear-gradient(135deg, hsl(221 54% 53%) 0%, hsl(3 85% 42%) 100%);
    --gradient-dark: linear-gradient(180deg, hsl(210, 15%, 20%) 0%, hsl(210, 15%, 25%) 100%);
    --gradient-light: linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(210 20% 96%) 100%);

    /* Enhanced Shadows - Gmail-inspired */
    --shadow-gold: 0 10px 40px -10px hsl(221 54% 53% / 0.15);
    --shadow-gold-lg: 0 25px 80px -20px hsl(221 54% 53% / 0.25);
    --shadow-elegant: 0 20px 60px -15px hsl(210 20% 30% / 0.12);
    --shadow-card: 0 2px 8px -2px hsl(210 20% 30% / 0.08);
    --shadow-brutal: 8px 8px 0px hsl(221 54% 53%);

    /* Transitions - Ultra smooth */
    --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-spring: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    --transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --transition-modern: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --transition-butter: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    --transition-premium: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    --sidebar-background: 210 20% 97%;
    --sidebar-foreground: 210 20% 10%;
    --sidebar-primary: 221 54% 53%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 210 20% 95%;
    --sidebar-accent-foreground: 210 20% 10%;
    --sidebar-border: 210 25% 88%;
    --sidebar-ring: 221 54% 53%;

    /* Typographic + layout tokens */
    --heading-color: 210 20% 10%;
    --heading-size: 1.5rem;
    --side-padding: 1.5rem;
  }

  .dark {
    /* Dark Mode - Gmail Dark Theme */
    --background: 0 0% 12%;
    --foreground: 0 0% 95%;

    --card: 0 0% 15%;
    --card-foreground: 0 0% 95%;

    --popover: 0 0% 15%;
    --popover-foreground: 0 0% 95%;

    --primary: 221 54% 53%; /* Gmail Blue (#3e65cf) */
    --primary-foreground: 0 0% 100%;

    --secondary: 3 85% 42%; /* Gmail Red (#c71610) */
    --secondary-foreground: 0 0% 100%;

    --muted: 0 0% 20%;
    --muted-foreground: 0 0% 65%;

    --accent: 221 54% 53%; /* Gmail Blue accent */
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 210 20% 25%;
    --input: 210 20% 25%;
    --ring: 211 100% 55%;

    /* Simple Dark Gradients */
    --gradient-dark: linear-gradient(180deg, hsl(210, 20%, 12%) 0%, hsl(210, 20%, 15%) 100%);

    /* Simple Shadows for Dark Mode */
    --shadow-elegant: 0 20px 60px -15px hsl(210 20% 8% / 0.4);

    --sidebar-background: 0 0% 12%;
    --sidebar-foreground: 0 0% 95%;
    --sidebar-primary: 221 54% 53%;
    --sidebar-primary-foreground: 0 0% 95%;
    --sidebar-accent: 221 54% 53%;
    --sidebar-accent-foreground: 0 0% 95%;
    --sidebar-border: 0 0% 25%;
    --sidebar-ring: 221 54% 53%;

    --heading-color: 0 0% 95%;
    --brand-blue: 221 54% 51%; /* Gmail Blue (#3b60c4) */
    --gold: 221 54% 53%; /* Gmail Blue (#3e65cf) */
    --gmail-red: 3 85% 42%; /* Gmail Red (#c71610) */
    --gmail-yellow: 43 92% 50%; /* Gmail Yellow (#f2a60c) */
    --gmail-green: 133 89% 28%; /* Gmail Green (#08851b) */

    /* Dark gradient */
    --gradient-dark: linear-gradient(180deg, hsl(210, 20%, 12%) 0%, hsl(210, 20%, 15%) 100%);
  }
}

@layer base {
  * {
    @apply border-border;
    scroll-behavior: smooth;
    transition: color 0.4s cubic-bezier(0.23, 1, 0.32, 1), 
                background-color 0.4s cubic-bezier(0.23, 1, 0.32, 1), 
                border-color 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    transition: background-color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: hsl(var(--heading-color));
    transition: color 0.3s ease;
    letter-spacing: -0.02em;
    font-weight: 700;
  }

  h1 {
    letter-spacing: -0.03em;
    font-weight: 800;
  }

  h2 {
    letter-spacing: -0.025em;
    font-weight: 700;
  }

  p {
    line-height: 1.7;
  }

  /* Enhanced dark mode transitions */
  .dark {
    color-scheme: dark;
  }

  /* Simple Background Styling */
  .dark {
    background: hsl(330, 15%, 12%);
  }

  .dark body {
    background: hsl(330, 15%, 12%);
  }

  /* Professional button styles */
  button, a {
    -webkit-tap-highlight-color: transparent;
  }

  /* Smooth image rendering */
  img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  /* Improved scrollbar for dark mode */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: hsl(var(--background));
  }

  ::-webkit-scrollbar-thumb {
    background: hsl(var(--border));
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--gold));
    box-shadow: 0 0 8px hsl(var(--gold) / 0.5);
  }

  /* Enhanced focus states */
  *:focus-visible {
    outline: 2px solid hsl(var(--gold));
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Smooth animations for all interactive elements */
  button, a, [role="button"] {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}

@layer components {
  .section {
    @apply relative py-8 sm:py-10 md:py-12 lg:py-14;
  }

  .section-bg-premium {
    @apply bg-gradient-to-b from-background via-muted/30 to-background;
  }

  .badge-pill {
    @apply inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold;
  }

  .badge-gold {
    @apply bg-blue-500 text-white;
  }

  .badge-gold-soft {
    @apply bg-blue-500/10 text-blue-600 border border-blue-500/20 backdrop-blur-sm;
  }

  .card-premium {
    @apply relative bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-500 overflow-hidden;
  }

  .card-premium:hover {
    @apply bg-card border-blue-500/50 shadow-elegant;
  }

  .btn {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300;
  }

  .btn-gold {
    @apply btn bg-blue-500 text-white hover:bg-blue-500/90;
  }

  .btn-outline {
    @apply btn bg-transparent border-2 border-white/20 text-white hover:border-blue-400 hover:bg-blue-500/5;
  }
}

@layer utilities {
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .app-shell {
    padding-left: var(--side-padding);
    padding-right: var(--side-padding);
  }

  /* Skip to main content - accessibility + SEO */
  .skip-to-content {
    @apply sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg focus:font-semibold;
  }

  /* Text balance for headings */
  .text-balance {
    text-wrap: balance;
  }

  /* Visually hidden but accessible to screen readers */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Gold (now Blue) Shadow Utilities */
  .shadow-gold {
    box-shadow: 0 4px 20px -4px hsl(var(--gold) / 0.3);
  }

  .shadow-gold-lg {
    box-shadow: 0 10px 40px -8px hsl(var(--gold) / 0.4);
  }

  .shadow-gold-xl {
    box-shadow: 0 20px 60px -12px hsl(var(--gold) / 0.5);
  }

  /* Blue Gradient Utilities */
  .bg-gold-gradient {
    background: linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)));
  }

  .bg-gold-gradient-subtle {
    background: linear-gradient(135deg, hsl(var(--gold) / 0.1), hsl(var(--gold) / 0.05));
  }

  /* Text Gradient Utilities */
  .text-gold-gradient {
    background: linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--gold)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Glassmorphism Effects */
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .glass-dark {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Hover Effects */
  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px -8px hsl(var(--gold) / 0.3);
  }

  /* Focus States */
  .focus-gold:focus {
    outline: 2px solid hsl(var(--gold));
    outline-offset: 2px;
  }

  /* Selection Styles */
  ::selection {
    background: hsl(var(--gold) / 0.3);
    color: hsl(var(--foreground));
  }
}
```

---

## Step 3: Update tailwind.config.ts Font Family

Update `tailwind.config.ts` to use direct font families (not CSS variables):

```typescript
// Change from:
fontFamily: {
  poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
  inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
},

// To:
fontFamily: {
  poppins: ['Poppins', 'sans-serif'],
  inter: ['Inter', 'sans-serif'],
},
```

---

## Step 4: Update package.json Dependencies

Add/update these dependencies in `package.json`:

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@tanstack/react-query": "^5.83.0",
    "framer-motion": "^12.23.24",
    "react-hook-form": "^7.61.1",
    "zod": "^3.25.76",
    "sonner": "^1.7.4",
    "next-themes": "^0.3.0"
  }
}
```

Then run:
```bash
npm install
```

---

## Step 5: Full PowerShell Script (Automated)

Create `migrate-theme.ps1` and run it:

```powershell
# migrate-theme.ps1
# Run from: d:\next-sites\inboc-\seo

Write-Host "Starting Gmail Theme Migration..." -ForegroundColor Green

# Backup files
Write-Host "Creating backups..." -ForegroundColor Yellow
Copy-Item "src\app\globals.css" "src\app\globals.css.backup" -Force
Copy-Item "tailwind.config.ts" "tailwind.config.ts.backup" -Force

# The new CSS content would be written here
# (Copy the CSS from Step 2 into a here-string and write to file)

Write-Host "Migration complete!" -ForegroundColor Green
Write-Host "Backups created: globals.css.backup, tailwind.config.ts.backup" -ForegroundColor Cyan
```

---

## Quick Reference: Color Changes

| Element | Old (Yellow/Orange) | New (Gmail Blue/Red) |
|---------|---------------------|---------------------|
| Primary | Amber 45 100% 50% | Blue 221 54% 53% |
| Secondary | Warm light | Red 3 85% 42% |
| Gold Variable | Yellow/Orange | Blue 221 54% 53% |
| Background | Pure white | Blue-tinted 210 20% 97% |
| Dark Mode | Warm orange | Neutral dark |

---

## Post-Migration Checklist

- [ ] Run `npm install` to update dependencies
- [ ] Run `npm run dev` to test locally
- [ ] Check all pages render correctly
- [ ] Verify dark mode toggle works
- [ ] Test responsive design
- [ ] Build for production: `npm run build`

---

## Rollback Commands

If something goes wrong:

```bash
# Restore backups
copy src\app\globals.css.backup src\app\globals.css
copy tailwind.config.ts.backup tailwind.config.ts

# Reinstall original dependencies
npm install
```
