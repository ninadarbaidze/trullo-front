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
        'blue-100': '#E2E8F6',
        'blue-200': '#DAE4FD',
        'blue-500': '#2F80ED',
      },
    },
  },
  plugins: [],
};
