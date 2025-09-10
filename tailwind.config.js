/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#d9f0ff',
          200: '#b8e2ff',
          300: '#8cd0ff',
          400: '#5ab8fb',
          500: '#2ea0f0',
          600: '#1f85d3',
          700: '#1c6aad',
          800: '#1b5a8f',
          900: '#1b4a72',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInDelay: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        caret: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'rgba(0,0,0,0.6)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 700ms ease-out both',
        'fade-in-delay': 'fadeInDelay 900ms 200ms ease-out both',
        'slide-up': 'slideUp 700ms ease-out both',
        'typewriter': 'typewriter 2.8s steps(30) 500ms both, caret 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
}

