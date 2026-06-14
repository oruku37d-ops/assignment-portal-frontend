/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a5f',
          light: '#2a5082',
        },
        accent: '#c9a227',
        muted: '#6b7280',
        surface: {
          DEFAULT: '#ffffff',
          dark: '#111111',
        },
      },
    },
  },
  plugins: [],
};
