/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/**/*.{js,jsx,ts,tsx}' ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: Object.fromEntries(
        [
          'accent',
          'accent-secondary',
          'error',
          'primary',
          'on-primary',
          'secondary',      
          'on-secondary',
          'surface',
          'tertiary',    
        ].map((name) => [name, `var(--color-${name})`]),
      ),
      fontFamily: {
        poppins: ['fira-sans', 'sans-serif'],
        kode: ['kode-mono', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

