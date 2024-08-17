// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Asegúrate de que Tailwind escanee tus archivos de componentes
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
        },
      },
    },
  },
  plugins: [],
};




