/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        clinical: {
          bg: '#f4f6f8',
          panel: '#ffffff',
          border: '#dde3ea',
          text: '#1f2937',
          muted: '#64748b',
          accent: '#0f5b8f',
          accentSoft: '#e5f0f8',
          highest: '#b91c1c',
          highestSoft: '#fdecec',
          high: '#b45309',
          highSoft: '#fdf3e3',
          important: '#0f766e',
          importantSoft: '#e6f5f3',
        },
      },
      fontSize: {
        xxs: '0.6875rem',
      },
    },
  },
  plugins: [],
};
