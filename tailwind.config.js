/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0F172A', // Deep Navy
          accent: '#3B82F6',  // Electric Blue
        },
        status: {
          live: '#10B981',    // Emerald
          warning: '#F59E0B', // Amber
          error: '#EF4444',   // Red
        },
        surface: {
          DEFAULT: '#F8FAFC',
          dark: '#1E293B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}