/**
 * Global Theme Configuration
 * Change colors here and they will update across the entire site
 */

export interface ThemeColors {
  // Main brand colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Accent colors
  accent: string;
  accentDark: string;
  accentLight: string;
  
  // Background colors
  background: string;
  card: string;
  
  // Text colors
  foreground: string;
  muted: string;
  
  // Border colors
  border: string;
  
  // Status colors
  destructive: string;
  success: string;
  warning: string;
}

export interface ColorScheme {
  name: string;
  colors: ThemeColors;
}

// Define your color schemes here
export const colorSchemes: Record<string, ColorScheme> = {
  // Blue-Pink Theme (SocialRecruit - matching frontend)
  blue: {
    name: "Blue & Pink Theme",
    colors: {
      primary: "217 91% 60%",          // Professional blue
      primaryDark: "221 83% 53%",      // Darker blue
      primaryLight: "217 92% 75%",     // Lighter blue

      accent: "330 81% 90%",           // Light pink accent
      accentDark: "330 81% 60%",       // Vibrant pink
      accentLight: "330 81% 95%",      // Very light pink

      background: "0 0% 100%",         // White background
      card: "0 0% 100%",              // White cards

      foreground: "222 47% 11%",       // Dark blue-black text
      muted: "210 40% 96.1%",          // Light muted

      border: "214.3 31.8% 91.4%",     // Light borders

      destructive: "0 84.2% 60.2%",    // Red for errors
      success: "142 76% 36%",          // Green for success
      warning: "45 93% 58%",           // Orange/yellow for warnings
    }
  },

  // Gold Theme (Alternative)
  gold: {
    name: "Gold Professional",
    colors: {
      primary: "45 80% 55%",
      primaryDark: "45 80% 45%",
      primaryLight: "45 80% 65%",

      accent: "45 90% 65%",
      accentDark: "45 70% 45%",
      accentLight: "45 90% 75%",

      background: "0 0% 100%",
      card: "0 0% 100%",

      foreground: "222 47% 11%",
      muted: "210 40% 96.1%",

      border: "214.3 31.8% 91.4%",

      destructive: "0 84.2% 60.2%",
      success: "142 76% 36%",
      warning: "45 93% 58%",
    }
  },

  // Purple Theme (Alternative)
  purple: {
    name: "Purple Modern",
    colors: {
      primary: "270 100% 60%",
      primaryDark: "270 100% 50%",
      primaryLight: "270 100% 70%",

      accent: "270 100% 65%",
      accentDark: "270 85% 35%",
      accentLight: "270 100% 75%",

      background: "0 0% 100%",
      card: "0 0% 100%",

      foreground: "222 47% 11%",
      muted: "210 40% 96.1%",

      border: "214.3 31.8% 91.4%",

      destructive: "0 84.2% 60.2%",
      success: "142 76% 36%",
      warning: "45 93% 58%",
    }
  },

  // Green Theme (Alternative)
  green: {
    name: "Green Fresh",
    colors: {
      primary: "142 76% 36%",
      primaryDark: "142 76% 26%",
      primaryLight: "142 76% 46%",

      accent: "142 86% 46%",
      accentDark: "142 66% 26%",
      accentLight: "142 86% 56%",

      background: "0 0% 100%",
      card: "0 0% 100%",

      foreground: "222 47% 11%",
      muted: "210 40% 96.1%",

      border: "214.3 31.8% 91.4%",

      destructive: "0 84.2% 60.2%",
      success: "142 76% 36%",
      warning: "45 93% 58%",
    }
  }
};

// Current active theme - CHANGE THIS TO SWITCH THEMES
export const currentTheme = "blue"; // Options: "blue", "gold", "purple", "green"

// Get current theme colors
export const theme = colorSchemes[currentTheme].colors;

// Helper function to get HSL value for CSS variables
export const hsl = (color: string) => `hsl(${color})`;

// Helper function to get CSS variable name
export const cssVar = (name: keyof ThemeColors) => `--${name}`;

// Generate CSS variables for the current theme
export const generateCSSVariables = () => {
  const vars: Record<string, string> = {};
  
  Object.entries(theme).forEach(([key, value]) => {
    vars[`--${key}`] = value;
  });
  
  // Add derived variables
  vars['--primary-foreground'] = theme.background;
  vars['--secondary'] = theme.accentDark; // Pink as secondary
  vars['--secondary-foreground'] = theme.background;
  vars['--muted-foreground'] = "215.4 16.3% 46.9%";
  vars['--accent-foreground'] = theme.foreground;
  vars['--hover'] = theme.background;
  vars['--hover-foreground'] = theme.foreground;
  vars['--destructive-foreground'] = theme.background;
  vars['--card-foreground'] = theme.foreground;
  vars['--ring'] = theme.primary;
  vars['--input'] = theme.border;

  // Add theme-specific variables
  vars['--brand-blue'] = theme.accentDark; // Pink as brand-blue
  vars['--gold'] = theme.primary;
  vars['--gold-dark'] = theme.primaryDark;
  vars['--gold-light'] = theme.primaryLight;
  
  // Add gradients
  vars['--gradient-gold'] = `linear-gradient(135deg, ${hsl(theme.primary)} 0%, ${hsl(theme.accentDark)} 100%)`;
  vars['--gradient-dark'] = `linear-gradient(180deg, ${hsl(theme.accentDark)} 15%, ${hsl(theme.accentDark)} 20% 100%)`;
  
  // Add shadows
  vars['--shadow-gold'] = `0 10px 40px -10px ${hsl(theme.primary)} / 0.3`;
  vars['--shadow-gold-lg'] = `0 25px 80px -20px ${hsl(theme.primary)} / 0.4`;
  vars['--shadow-elegant'] = `0 20px 60px -15px ${hsl(theme.accentDark)} / 0.3`;
  vars['--shadow-brutal'] = `8px 8px 0px ${hsl(theme.primary)}`;
  
  return vars;
};

const themeConfig = {
  colorSchemes,
  currentTheme,
  hsl,
  cssVar,
  generateCSSVariables
};

export default themeConfig;


