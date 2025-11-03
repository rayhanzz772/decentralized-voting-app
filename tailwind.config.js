/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: "#6366f1",  // Indigo
          dark: "#4f46e5",
          light: "#818cf8",
        },
        accent: {
          DEFAULT: "#10b981",  // Green
          dark: "#059669",
        },
        
        // Background colors - CHANGE THESE!
        background: {
          DEFAULT: "#0f172a",    // Main dark background (slate-900)
          light: "#1e293b",      // Secondary background (slate-800)
          lighter: "#334155",    // Tertiary background (slate-700)
        },
        
        // Alternative color schemes you can use:
        // 
        // Dark Blue Theme:
        // background: {
        //   DEFAULT: "#0c1821",
        //   light: "#1b2838",
        //   lighter: "#2c3e50",
        // },
        //
        // Purple Theme:
        // background: {
        //   DEFAULT: "#1a0b2e",
        //   light: "#2d1b4e",
        //   lighter: "#3f2f6b",
        // },
        //
        // Black Theme:
        // background: {
        //   DEFAULT: "#000000",
        //   light: "#1a1a1a",
        //   lighter: "#2d2d2d",
        // },
      },
    },
  },
  plugins: [],
};
