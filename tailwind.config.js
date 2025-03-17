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
        primary: '#3b82f6', // Vibrant blue
        secondary: '#6366f1', // Indigo
        tertiary: '#8b5cf6', // Purple
        accent: '#ec4899', // Pink
        success: '#10b981', // Emerald
        warning: '#f59e0b', // Amber
        danger: '#ef4444', // Red
        info: '#0ea5e9', // Sky blue
        background: {
          light: '#ffffff',
          dark: '#111827',
        },
        text: {
          light: '#1e293b',
          dark: '#f1f5f9',
        },
      },
      boxShadow: {
        'custom': '0 4px 20px -5px rgba(0, 0, 0, 0.1)',
        'custom-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'custom-xl': '0 20px 35px -5px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 