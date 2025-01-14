/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#475569',
        background: '#ffffff',
        text: '#1e293b',
        accent: '#3b82f6',
      }
    },
  },
  plugins: [],
} 