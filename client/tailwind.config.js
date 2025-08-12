/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        background: '#0f172a',
         foreground: '#f1f5f9', // lighter
        muted: '#cbd5e1', // brighter for readability
        card: '#1e293b',
        border: '#334155',
      },
    },
  },
  plugins: [],
}
