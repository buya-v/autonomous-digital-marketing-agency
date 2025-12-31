/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          800: '#1E293B',
          900: '#0F172A',
        },
        blue: {
          600: '#2563EB',
        },
        red: {
          600: '#DC2626',
        },
        emerald: {
          500: '#10B981',
        },
        amber: {
          500: '#F59E0B',
        }
      }
    },
  },
  plugins: [],
}