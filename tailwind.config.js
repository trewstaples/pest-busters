/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './public/**/*.{js,css}'],
  theme: {
    extend: {
      screens: {
        menu: '1000px',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        blue: {
          primary: '#015289',
          hover: '#013d66',
        },
        text: {
          dark: '#333333',
          light: '#666666',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
