/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#1e1e1e',
        text: '#d0d0d0'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
