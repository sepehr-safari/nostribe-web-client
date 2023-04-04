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
          'base-100': '#20112C',
          'base-200': '#150B1D',
          'base-content': '#ECE1F4',
          primary: '#603285',
          secondary: '#8A4EBC',
          accent: '#BB97D8',
          neutral: '#CBBA9F',
          info: '#3A7A92',
          success: '#235827',
          warning: '#FCBE58',
          error: '#A23F3F',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
