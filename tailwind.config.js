/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./index.html"],
  darkMode: ["selector", ".dark &:not(.light,.light *)"],
  theme: {
    extend: {
      colors: {
        primary: "#1f2937",
        secondary: "#111827",
        aqua: "#09b0cd",
        "dark-aqua": "#438394",
        "light-mode-gray": "#f3f4f6",
        danger: "#ff0f0f",
        transparent: "transparent",
      },
      fontFamily: {
        Cairo: [
          '"Cairo"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: {
        card: "0px 4px 4px 0px #00000040",
        checkbox: "1px 2px 10.6px 0px #00000040 inset",
      },
      screens: {
        'xl2': '1920px',  
        'uw': '2560px',  
        'xl1366': '1024px'
      },
    },
  },
  plugins: [],
};
