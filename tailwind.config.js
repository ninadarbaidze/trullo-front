/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        babyBlue: '#F8F9FD',
        blue100: '#E2E8F6',
        blue200: '#DAE4FD',
        blue500: '#2F80ED',
        gray200: '#E0E0E0',
        gray300: '#828282',
      },
    },
  },
  plugins: [],
};
