/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        iris: {
          'base-100': '#000000',
          'base-content': '#ffffff',
          primary: '#603285',
          secondary: '#8A4EBC',
          accent: '#BB97D8',
          neutral: '#ffffff',
          info: '#3A7A92',
          success: '#235827',
          warning: '#FCBE58',
          error: '#A23F3F',
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
};
