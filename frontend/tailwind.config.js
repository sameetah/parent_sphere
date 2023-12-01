/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  theme: {
    colors: {  ...defaultTheme.colors, // Spread the default colors
    'blue': '#89ABE3FF', 
    'rose': '#D7B6C2', 
    'cream': '#F5F5F5FF',
    'gray': '#A2A2A1FF',},
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },


  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],

  }}