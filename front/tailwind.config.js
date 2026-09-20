/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5EC',
        sand: '#F1E7D2',
        olive: {
          DEFAULT: '#6E7B3B',
          dark: '#525C2C',
          light: '#8B9A4E'
        },
        ink: '#17170F',
        gold: {
          DEFAULT: '#D9A916',
          dark: '#B8890E'
        },
        stone: '#4A4A3E'
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Helvetica', 'Arial', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.2em'
      }
    }
  },
  plugins: []
};
