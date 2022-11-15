/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      xs: {"max": '320px'},
      sm: {"max": "768px"},
      md: {"max": '1440px'},
      lg: {"min": "1920px"}
    },
    colors: {
      "primary": "#f9b471",
      "secondary": "#51a8bc",
      "tertiary": "#bde8f9",
      "light-gray": "#f9f8f6",
      "mid-gray": "#eeede8",
      "dark-gray": "#a5a39c",
      "light-main": "#fffaf4",
      "white": "#fff",
      "dark": "#4d4c52"
    },
    extend: {
      backgroundImage: {
        "cover_lg" : "url('./src/assets/covers/cover-lg.png')",
        "cover_sm" : "url('./src/assets/covers/cover-sm.png')"
      }
    },
  },
  plugins: [],
}

