/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
      colors: {
        // Core dark palette
        dark: {
          950: '#03010f',
          900: '#06011a',
          800: '#0a0228',
          700: '#0f0535',
          600: '#160842',
        },
        // Primary purple-violet
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        // Accent cyan
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        // Pink accent
        pink: {
          400: '#f472b6',
          500: '#ec4899',
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #03010f 0%, #07022a 30%, #0d0540 55%, #130a5a 75%, #0a0228 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(34,211,238,0.04) 100%)',
        'gradient-btn':  'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0891b2 100%)',
        'gradient-text': 'linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #22d3ee 100%)',
        'gradient-hero': 'linear-gradient(135deg, #6d28d9 0%, #4338ca 50%, #0e7490 100%)',
      },
      boxShadow: {
        'glow-violet': '0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.2)',
        'glow-cyan':   '0 0 20px rgba(34,211,238,0.5), 0 0 40px rgba(34,211,238,0.2)',
        'glow-pink':   '0 0 20px rgba(244,114,182,0.5), 0 0 40px rgba(244,114,182,0.2)',
        'card':        '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-hover':  '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
        'nav':         '0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow':    'pulseGlow 3s ease-in-out infinite',
        'fade-in-up':    'fadeInUp 0.7s ease-out both',
        'fade-in':       'fadeIn 0.6s ease-out both',
        'slide-right':   'slideRight 0.7s ease-out both',
        'gradient-x':    'gradientX 4s ease infinite',
        'spin-slow':     'spin 8s linear infinite',
        'particle':      'particle linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-22px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 15px rgba(139,92,246,0.4), 0 0 30px rgba(139,92,246,0.15)' },
          '50%':     { boxShadow: '0 0 30px rgba(139,92,246,0.7), 0 0 60px rgba(139,92,246,0.3)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        gradientX: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        particle: {
          '0%':   { transform: 'translateY(100vh) scale(0)',   opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '0.6' },
          '100%': { transform: 'translateY(-10vh) scale(1.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
