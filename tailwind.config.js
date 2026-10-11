/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lf-dark':    '#111111',
        'lf-darker':  '#181818',
        'lf-card':    '#242424',
        'lf-light':   '#F5F5F5',
        'lf-accent':  '#00D4FF',
        'lf-purple':  '#7B61FF',
        'lf-glow':    'rgba(0,212,255,0.15)',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'glow-pulse':  'glowPulse 2s ease-in-out infinite',
        'slide-up':    'slideUp 0.6s ease forwards',
        'fade-in':     'fadeIn 0.8s ease forwards',
        'spin-slow':   'spin 20s linear infinite',
        'counter':     'counterIn 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(0,212,255,0.3)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        counterIn: {
          from: { opacity: 0, transform: 'scale(0.8)' },
          to:   { opacity: 1, transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient':    'linear-gradient(135deg, #111111 0%, #181818 50%, #111111 100%)',
        'accent-gradient':  'linear-gradient(135deg, #00D4FF 0%, #7B61FF 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-accent':  '0 0 30px rgba(0,212,255,0.4)',
        'glow-purple':  '0 0 30px rgba(123,97,255,0.4)',
        'card-hover':   '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0,212,255,0.15)',
      },
    },
  },
  plugins: [],
}
