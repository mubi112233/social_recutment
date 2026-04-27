# Design Migration Guide

## Step 1: Color Changes

### Replace These Colors

| Variable | Old Value | New Value | Color |
|----------|-----------|-----------|-------|
| `--primary` | `40 100% 50%` (Amber) | `221 54% 53%` | **Gmail Blue #3e65cf** |
| `--secondary` | `48 100% 97%` | `3 85% 42%` | **Gmail Red #c71610** |
| `--gold` | `45 100% 50%` (Yellow) | `221 54% 53%` | **Gmail Blue** |
| `--brand-blue` | `30 100% 45%` (Orange) | `221 54% 51%` | **Blue #3b60c4** |
| `--background` | `0 0% 100%` (White) | `210 20% 97%` | **Blue-tinted gray** |
| `--muted` | `48 40% 96%` | `210 20% 95%` | **Blue-tinted muted** |
| `--border` | `40 20% 85%` | `210 25% 88%` | **Blue-tinted border** |

---

## Step 2: Update globals.css

### Copy This CSS Code

```css
@layer base {
  :root {
    /* Primary: Gmail Blue */
    --primary: 221 54% 53%;
    --primary-foreground: 0 0% 100%;
    
    /* Secondary: Gmail Red */
    --secondary: 3 85% 42%;
    --secondary-foreground: 0 0% 100%;
    
    /* Background: Blue-tinted */
    --background: 210 20% 97%;
    --foreground: 210 20% 10%;
    
    /* Card */
    --card: 0 0% 100%;
    --card-foreground: 210 20% 10%;
    
    /* Muted: Blue-tinted */
    --muted: 210 20% 95%;
    --muted-foreground: 210 15% 40%;
    
    /* Accent: Gmail Blue */
    --accent: 221 54% 53%;
    --accent-foreground: 0 0% 100%;
    
    /* Border: Blue-tinted */
    --border: 210 25% 88%;
    --input: 210 20% 92%;
    --ring: 221 54% 53%;
    
    /* Gmail Theme Custom Tokens */
    --gold: 221 54% 53%;        /* Gmail Blue */
    --gold-dark: 221 54% 45%;   /* Darker Blue */
    --gold-light: 221 54% 65%;   /* Lighter Blue */
    --brand-blue: 221 54% 51%;  /* Gmail Blue Alt */
    --gmail-red: 3 85% 42%;     /* Gmail Red */
    --gmail-yellow: 43 92% 50%; /* Gmail Yellow */
    --gmail-green: 133 89% 28%; /* Gmail Green */
    
    /* Gradients */
    --gradient-gold: linear-gradient(135deg, hsl(221 54% 53%) 0%, hsl(3 85% 42%) 100%);
    --gradient-dark: linear-gradient(180deg, hsl(210, 15%, 20%) 0%, hsl(210, 15%, 25%) 100%);
    
    /* Shadows - Blue-tinted */
    --shadow-gold: 0 10px 40px -10px hsl(221 54% 53% / 0.15);
    --shadow-gold-lg: 0 25px 80px -20px hsl(221 54% 53% / 0.25);
    --shadow-elegant: 0 20px 60px -15px hsl(210 20% 30% / 0.12);
    --shadow-card: 0 2px 8px -2px hsl(210 20% 30% / 0.08);
    --shadow-brutal: 8px 8px 0px hsl(221 54% 53%);
    
    /* Transitions */
    --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-spring: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    --transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --transition-butter: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .dark {
    /* Dark Mode - Gmail Dark */
    --background: 0 0% 12%;
    --foreground: 0 0% 95%;
    
    --card: 0 0% 15%;
    --card-foreground: 0 0% 95%;
    
    --primary: 221 54% 53%;
    --secondary: 3 85% 42%;
    
    --muted: 0 0% 20%;
    --muted-foreground: 0 0% 65%;
    
    --border: 210 20% 25%;
    --input: 210 20% 25%;
    --ring: 211 100% 55%;
    
    --gold: 221 54% 53%;
    --brand-blue: 221 54% 51%;
    --gmail-red: 3 85% 42%;
    --gmail-yellow: 43 92% 50%;
    --gmail-green: 133 89% 28%;
  }
}
```

---

## Step 3: Update tailwind.config.ts

### Change Font Settings

```typescript
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],  // Changed from var(--font-poppins)
        inter: ['Inter', 'sans-serif'],       // Changed from var(--font-inter)
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          DEFAULT: "hsl(var(--brand-blue))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        hover: {
          DEFAULT: "hsl(var(--hover))",
          foreground: "hsl(var(--hover-foreground))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          dark: "hsl(var(--gold-dark))",
          light: "hsl(var(--gold-light))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-dark': 'var(--gradient-dark)',
      },
      boxShadow: {
        'gold': 'var(--shadow-gold)',
        'gold-lg': 'var(--shadow-gold-lg)',
        'elegant': 'var(--shadow-elegant)',
        'card': 'var(--shadow-card)',
        'brutal': 'var(--shadow-brutal)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'butter': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
```

---

## Step 4: Update Button Styles

### Add New Button Types

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        /* Gmail Blue variants (matching mange-email) */
        gold: "bg-primary text-white font-semibold shadow-gold hover:bg-primary/90 hover:shadow-gold-lg hover:scale-105 active:scale-95",
        "gold-outline": "border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white hover:shadow-gold",
        
        /* Keep blue for backward compatibility */
        blue: "bg-[hsl(221,54%,53%)] text-white font-semibold shadow-[0_10px_40px_-10px_hsl(221_54%_53%/0.3)] hover:bg-[hsl(221,54%,48%)] hover:shadow-xl hover:scale-105 active:scale-95",
        "blue-outline": "border-2 border-[hsl(221,54%,53%)] text-[hsl(221,54%,53%)] font-semibold hover:bg-[hsl(221,54%,53%)] hover:text-white hover:shadow-[0_10px_40px_-10px_hsl(221_54%_53%/0.3)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
```

---

## Step 5: Copy Component Styles

### Badge/Pill Style

```tsx
// Standard badge
<span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gradient-to-br from-[hsl(var(--gold))] via-[hsl(var(--brand-blue))] to-[hsl(var(--gold))] text-white text-xs sm:text-sm md:text-base font-semibold rounded-full shadow-[0_8px_24px_-6px_rgba(0,123,255,0.4)] border border-white/20 backdrop-blur-sm">
  Badge Text
</span>

// Soft badge
<span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs sm:text-sm font-semibold">
  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
  Badge Text
</span>
```

### Card Style

```tsx
<motion.div 
  className="relative bg-card text-foreground border-2 border-[hsl(215,32%,91%)] dark:border-[hsl(250,30%,35%)]/50 p-5 sm:p-6 md:p-7 lg:p-9 rounded-xl sm:rounded-2xl hover:border-[hsl(var(--gold))] dark:hover:border-[hsl(var(--gold))] hover:shadow-[0_25px_80px_-20px_hsl(217_91%_60%/0.25)] transition-all duration-700 group overflow-hidden"
  whileHover={{ 
    y: -12, 
    scale: 1.03,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }}
>
  {/* Hover gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gold))]/10 via-[hsl(250,100%,98%)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  
  {/* Content */}
  <div className="relative z-10">
    {/* Card content here */}
  </div>
  
  {/* Decorative corner accents */}
  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-[hsl(var(--gold))]/0 group-hover:border-[hsl(var(--gold))]/50 rounded-tr-xl transition-all duration-700" />
  <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-[hsl(var(--gold))]/0 group-hover:border-[hsl(var(--gold))]/50 rounded-bl-xl transition-all duration-700" />
</motion.div>
```

### Icon Container Style

```tsx
<motion.div 
  className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-[hsl(var(--gold))] via-[hsl(var(--brand-blue))] to-[hsl(var(--gold))] text-white ring-1 ring-[hsl(var(--gold))]/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_18px_40px_-12px_hsl(var(--brand-blue)),0_0_20px_hsl(var(--gold)/0.3)] group-hover:shadow-[0_20px_50px_-12px_hsl(var(--brand-blue)),0_0_30px_hsl(var(--gold)/0.5)] relative overflow-hidden"
  whileHover={{ rotate: 360 }}
  transition={{ duration: 0.6 }}
>
  {/* Shine effect */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
    initial={{ x: '-100%' }}
    animate={{ x: '100%' }}
    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
  />
  <Icon className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" />
</motion.div>
```

### Section Heading Style

```tsx
<motion.div 
  className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 relative z-10 text-left"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  {/* Badge */}
  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gradient-to-br from-[hsl(var(--gold))] via-[hsl(var(--brand-blue))] to-[hsl(var(--gold))] text-white text-xs sm:text-sm md:text-base font-semibold rounded-full mb-3 sm:mb-4 shadow-[0_8px_24px_-6px_rgba(0,123,255,0.4)] border border-white/20 backdrop-blur-sm relative overflow-hidden">
    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-50"></span>
    <span className="relative z-10">Section Badge</span>
  </span>
  
  {/* Heading with highlighted text */}
  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground dark:text-white leading-tight tracking-tight">
    Normal Text <span className="text-primary">Highlighted Text</span>
  </h2>
  
  {/* Subtitle */}
  <p className="text-base sm:text-lg md:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed px-2 dark:text-white/90">
    Section description goes here...
  </p>
</motion.div>
```

### Hero Section Style

```tsx
<motion.section 
  className="relative min-h-screen flex items-center bg-background text-foreground overflow-hidden pt-16 sm:pt-20 md:pt-0"
>
  <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
      
      {/* Left: Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Badge */}
        <div className="inline-block mb-3 sm:mb-4 md:mb-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm font-semibold">
          Hero Badge
        </div>
        
        {/* Title */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-5 md:mb-6 leading-[1.15] sm:leading-[1.12] md:leading-[1.1] tracking-tight text-foreground">
          First Part <span className="text-primary">Highlighted Part</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-xl text-muted-foreground mb-6 sm:mb-7 md:mb-8 leading-relaxed max-w-xl font-normal dark:text-white/90">
          Hero subtitle description...
        </p>
        
        {/* CTA Button */}
        <Button 
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold transition-colors relative overflow-hidden group"
        >
          <span className="flex items-center gap-2 relative z-10">
            <Mail className="w-5 h-5" />
            Button Text
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </motion.div>
      
      {/* Right: Image/Visual */}
      <motion.div
        className="relative lg:ml-auto mt-8 sm:mt-10 lg:mt-0"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        {/* Image with 3D effect */}
        <motion.div
          className="relative rounded-xl md:rounded-2xl overflow-hidden border-2 border-[hsl(330,81%,60%)]/30 group shadow-[0_30px_120px_-30px_hsl(330,81%,60%/0.45)]"
          whileHover={{ rotateX: -6, rotateY: 10 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <img src="..." alt="..." className="w-full h-auto object-cover" />
        </motion.div>
      </motion.div>
    </div>
  </div>
</motion.section>
```

### Navbar Style

```tsx
<motion.nav
  className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
    scrolled
      ? "bg-background/95 backdrop-blur-2xl border-b border-border/60 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]"
      : "bg-background/80 backdrop-blur-xl"
  }`}
>
  <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-10 xl:px-12">
    <div className="flex items-center justify-between h-16 sm:h-18 md:h-[72px] lg:h-20">
      
      {/* Logo */}
      <motion.div className="flex items-center space-x-2 sm:space-x-3">
        <motion.div 
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-[hsl(211,100%,55%)] to-[hsl(199,89%,48%)] rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="text-white font-bold text-base sm:text-lg">L</span>
        </motion.div>
        <span className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground">
          Logo Text
        </span>
      </motion.div>
      
      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-2 md:space-x-3 lg:space-x-6">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="relative text-[hsl(210,15%,20%)] dark:text-foreground hover:text-[hsl(211,100%,50%)] dark:hover:text-gold transition-all duration-200 font-semibold text-sm md:text-base px-2 md:px-3 py-2 rounded-lg hover:bg-[hsl(210,20%,96%)] dark:hover:bg-gold/10 group"
          >
            {item.name}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[hsl(211,100%,50%)] to-[hsl(199,89%,48%)] group-hover:w-3/4 transition-all duration-300" />
          </a>
        ))}
      </div>
      
      {/* CTA Buttons */}
      <div className="hidden md:flex items-center space-x-2 md:space-x-3">
        <Button
          variant="gold-outline"
          size="sm"
          className="text-sm md:text-base px-4 md:px-6 py-2 md:py-2.5"
        >
          Contact
        </Button>
        <Button
          variant="gold"
          size="sm"
          className="text-sm md:text-base px-4 md:px-7 py-2 md:py-2.5 bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-blue))] hover:opacity-95 text-white border-0 hover:shadow-lg hover:shadow-[hsl(var(--brand-blue))]/30 transition-all duration-300 hover:scale-105 font-semibold"
        >
          Book Meeting
        </Button>
      </div>
    </div>
  </div>
</motion.nav>
```

---

## Step 6: Add Animations

### Import Animation Library

```tsx
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
```

### Scroll Animation

```tsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.2 });

<motion.section 
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
  transition={{ 
    duration: 1.2, 
    ease: [0.25, 0.46, 0.45, 0.94],
    type: "spring",
    stiffness: 80
  }}
>
```

### Staggered Items

```tsx
{items.map((item, index) => (
  <motion.div 
    key={index}
    initial={{ opacity: 0, y: 60, scale: 0.9 }}
    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
    transition={{ 
      duration: 0.8, 
      delay: index * 0.15,  // Stagger delay
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 20
    }}
  >
    {/* Content */}
  </motion.div>
))}
```

### Hover Effects

```tsx
<motion.div
  whileHover={{ 
    y: -12, 
    scale: 1.03,
    rotateY: 5,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }}
  style={{ transformStyle: "preserve-3d" }}
>
```

### Floating Animation

```tsx
<motion.div
  animate={{
    y: [-5, 5, -5],
    rotate: [-2, 2, -2]
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
```

---

## Step 7: Add Background Effects

### Blur Orbs

```tsx
{/* Top right orb */}
<div className="absolute top-10 right-5 w-64 h-64 sm:top-16 sm:right-8 sm:w-80 sm:h-80 md:top-20 md:right-10 md:w-96 md:h-96 bg-gold/5 rounded-full blur-[100px] md:blur-[120px]" />

{/* Bottom left orb */}
<div className="absolute bottom-10 left-5 w-56 h-56 sm:bottom-16 sm:left-8 sm:w-72 sm:h-72 md:bottom-20 md:left-10 md:w-80 md:h-80 bg-gold/5 rounded-full blur-[100px] md:blur-[120px]" />
```

### Gradient Mesh

```tsx
<div className="gradient-mesh absolute inset-0 opacity-50" />

/* In CSS */
.gradient-mesh {
  background: 
    radial-gradient(at 0% 0%, hsl(var(--gold) / 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 0%, hsl(var(--brand-blue) / 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 100%, hsl(var(--gold) / 0.15) 0px, transparent 50%),
    radial-gradient(at 0% 100%, hsl(var(--brand-blue) / 0.15) 0px, transparent 50%);
}
```

---

## Quick Reference: Class Names

### Text Colors

### Text Color Classes
```tsx
// Primary text
text-foreground              /* Default text */
text-muted-foreground        /* Secondary text */
text-primary                 /* Gmail Blue */
text-white dark:text-white/90 /* Dark mode adjusted */

// Headings
<h1 className="text-foreground dark:text-white">...</h1>
<h2 className="text-foreground dark:text-white">...</h2>
```

### Background Color Classes
```tsx
bg-background               /* Page background */
bg-card                     /* Card background */
bg-primary                  /* Gmail Blue */
bg-secondary                /* Gmail Red */
bg-muted                    /* Muted background */
bg-gold/5                   /* Blue-tinted subtle */
```

### Border Color Classes
```tsx
border-border               /* Default border */
border-primary              /* Blue border */
border-[hsl(var(--gold))]   /* Gold variable border */
border-[hsl(215,32%,91%)]   /* Light border */
dark:border-[hsl(250,30%,35%)]/50  /* Dark border */
```

### Shadow Classes
```tsx
shadow-gold                 /* Blue-tinted shadow */
shadow-gold-lg             /* Large blue shadow */
shadow-elegant             /* Elegant shadow */
shadow-card                /* Card shadow */
shadow-[0_25px_80px_-20px_hsl(217_91%_60%/0.25)]  /* Custom */
```

---

## Rollback: Restore Old Files

```powershell
# If migration fails, restore backups
cd d:\next-sites\inboc-\seo

# Restore CSS
copy src\app\globals.css.backup src\app\globals.css

# Restore tailwind config
copy tailwind.config.ts.backup tailwind.config.ts

# Reinstall original dependencies
npm install
```

---

## Checklist: Test Everything

After migration, verify:

- [ ] `npm run dev` starts without errors
- [ ] Colors are Gmail Blue/Red (not yellow/orange)
- [ ] Typography uses Poppins/Inter correctly
- [ ] All sections have proper animations
- [ ] Cards have hover effects and corner accents
- [ ] Buttons use `gold` or `gold-outline` variant
- [ ] Dark mode works correctly
- [ ] Responsive design works on mobile
- [ ] `npm run build` succeeds

---

## Files You Need to Change

Priority order:
1. `src/app/globals.css` - Colors and CSS variables
2. `tailwind.config.ts` - Font families and theme
3. `src/components/ui/button.tsx` - Button variants
4. `src/components/Navbar.tsx` - Navigation styling
5. `src/components/Hero.tsx` - Hero section styling
6. All other components - Replace yellow/amber classes with blue

---

## Quick Commands to Run

```powershell
# 1. Go to project folder
cd d:\next-sites\inboc-\seo

# 2. Make backups
copy src\app\globals.css src\app\globals.css.backup
copy tailwind.config.ts tailwind.config.ts.backup

# 3. Apply new CSS (copy from the .new file)
copy src\app\globals.css.new src\app\globals.css

# 4. Update tailwind.config.ts manually (see Step 3 above)

# 5. Update button.tsx manually (see Step 4 above)

# 6. Install any missing packages
npm install

# 7. Start the dev server
npm run dev
```
