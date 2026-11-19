/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          lavender: '#EDE9FE',
          purple: '#DDD6FE',
          sky: '#E0F2FE',
          mint: '#D1FAE5',
          yellow: '#FEF08A',
          pink: '#FCE7F3',
          peach: '#FFEDD5',
          rose: '#FFE4E6'
        },
        brand: {
          purple: '#7C3AED',
          purpleHover: '#6D28D9',
          purpleLight: '#8B5CF6',
          sky: '#0284C7',
          mint: '#059669',
          yellow: '#D97706',
          pink: '#DB2777',
          dark: '#1E1B4B',
          softBg: '#F8FAFC'
        },
        ollie: {
          feather: '#7C3AED',
          wing: '#A78BFA',
          beak: '#F59E0B',
          eyes: '#1E1B4B',
          belly: '#FEF3C7'
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(124, 58, 237, 0.08), 0 8px 10px -6px rgba(124, 58, 237, 0.04)',
        'soft-lg': '0 20px 30px -10px rgba(124, 58, 237, 0.12), 0 10px 15px -5px rgba(124, 58, 237, 0.06)',
        'bubbly': '0 8px 0px 0px rgba(0, 0, 0, 0.08)',
        'bubbly-purple': '0 6px 0px 0px #6D28D9',
        'bubbly-sky': '0 6px 0px 0px #0284C7',
        'bubbly-mint': '0 6px 0px 0px #059669',
        'bubbly-yellow': '0 6px 0px 0px #B45309',
        'bubbly-pink': '0 6px 0px 0px #BE185D',
      },
      fontFamily: {
        sans: ['"Comic Neue"', '"Quicksand"', '"Nunito"', 'system-ui', 'sans-serif'],
        malayalam: ['"Gayathri"', '"Manjari"', '"Chilanka"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

