/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-vmire": "#141414",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        firstNeue: ["TTFirsNeue"],
        PPNeueMachina: ["PPNeueMachina"],
        inter: ['Inter', 'sans-serif'],
        steppe: ['Steppe', 'sans-serif']
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.2s ease-out infinite',
      },
    },
    screens: {
      'max-3xl': {max: '1650px'},
      'max-2xl': {max: '1536px'},
      'max-upper-xl' : {max: '1440px'},
      'max-xl' : {max: '1400px'},
      "max-lg": { max: "1200px" },
      "max-semi-lg": {max: '1100px'},
      "max-md": { max: "1024px" },
      "max-sm": { max: "768px" },
      "max-xs": { max: "576px" },
      "max-xxs": { max: "356px" },
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
