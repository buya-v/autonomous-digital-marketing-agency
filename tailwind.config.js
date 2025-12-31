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
          primary: '#6366F1', // Indigo 500
          secondary: '#8B5CF6', // Violet 500
        },
        bg: {
          main: '#0F172A', // Slate 950
          surface: '#1E293B', // Slate 800
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}