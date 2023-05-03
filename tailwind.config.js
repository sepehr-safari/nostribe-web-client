/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        'iris-blue': '#1d9bf0',
        'iris-green': '#34ba7c',
        'iris-orange': '#ffa600',
        'iris-red': '#f81780',
        'iris-purple': '#8e44ad',
      }
    },
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
          blue: '#1d9bf0',
          green: '#34ba7c',
          orange: '#ffa600',
          red: '#f81780',
          purple: '#8e44ad',
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
};
