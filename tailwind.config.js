/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        hospital: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        aqua: '#06b6d4',
        mint: '#10b981',
        rosebrand: '#f43f5e',
        sun: '#f59e0b'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.10)',
        card: '0 12px 35px rgba(37, 99, 235, 0.08)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'hospital-gradient': 'linear-gradient(135deg, #2563eb 0%, #06b6d4 45%, #10b981 100%)'
      }
    }
  },
  plugins: []
}
