/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // GitHub Dark theme colors
        primary: {
          DEFAULT: '#58a6ff',  // GitHub blue
          dark: '#1f6feb',
          light: '#79c0ff',
        },
        accent: {
          DEFAULT: '#3fb950',  // GitHub green
          dark: '#2ea043',
          orange: '#d29922',
          purple: '#bc8cff',
        },
        
        // Background colors (GitHub Dark)
        background: {
          DEFAULT: '#0d1117',    // Main background
          light: '#161b22',      // Secondary background
          lighter: '#21262d',    // Tertiary background
        },
        
        // Web3 accent colors
        web3: {
          blue: '#00d4ff',
          purple: '#b794f6',
          pink: '#ff6ec7',
          teal: '#00f5d4',
          violet: '#8b5cf6',
        },
        
        // Border colors
        border: {
          DEFAULT: '#3d444d',
          light: '#6e7681',
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(88, 166, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-pink': '0 0 20px rgba(255, 110, 199, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
