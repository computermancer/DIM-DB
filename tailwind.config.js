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
        text: '#d0d0d0',
        zinc: {
          800: '#27272a',
          700: '#3f3f46',
          600: '#52525b'
        }
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
  darkMode: 'class',
  safelist: [
    'bg-zinc-800',
    'bg-zinc-700',
    'bg-zinc-600',
    'text-orange-400',
    'text-orange-500',
    'bg-orange-500',
    'bg-red-500',
    'text-white',
    'text-gray-300',
    'hover:bg-zinc-600',
    'hover:bg-orange-600',
    'hover:bg-red-600'
  ]
}
