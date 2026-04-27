/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        democracy: {
          dark: '#0f172a',
          slate: '#334155',
          gold: '#fbbf24',
          light: '#f8fafc',
          accent: '#3b82f6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
