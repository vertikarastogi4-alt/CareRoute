/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#dae4f0',
          200: '#b3c7e0',
          300: '#7e9cc8',
          400: '#4a6fa8',
          500: '#2e5188',
          600: '#1e3a6b',
          700: '#16294d',
          800: '#0f1d38',
          900: '#0a1428',
        },
        teal: {
          50: '#effbf9',
          100: '#d7f5f0',
          200: '#b0ebe2',
          300: '#7ddacf',
          400: '#44c1b3',
          500: '#25a598',
          600: '#1a847a',
          700: '#186a63',
          800: '#155451',
          900: '#134543',
        },
        success: {
          50: '#edfcf4',
          100: '#d3f8e3',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(15, 29, 56, 0.06), 0 1px 2px 0 rgba(15, 29, 56, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(15, 29, 56, 0.1), 0 4px 8px -2px rgba(15, 29, 56, 0.06)',
        soft: '0 2px 8px -2px rgba(15, 29, 56, 0.08)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
