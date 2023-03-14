/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        nostribish: {
          primary: '#78350f',
          secondary: '#134e4a',
          accent: '#0284c7',
          neutral: '#1a1d34',
          'base-100': '#111327',
          info: '#1e40af',
          success: '#166534',
          warning: '#f59e0b',
          error: '#7f1d1d',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
