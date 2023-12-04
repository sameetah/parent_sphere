/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  theme: {
    colors: {
      blue: {
        DEFAULT: '#89ABE3FF', 
        dark: '#5078B3'
      },
      rose: {
        DEFAULT: '#D7B6C2', 
        dark: '#B5949D' 
      },
      cream: '#F5F5F5FF', 
      gray: '#A2A2A1FF' 
    },
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