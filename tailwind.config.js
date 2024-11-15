/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "rgb(255, 255, 255)",
      black: "rgb(0, 0, 0)",
      light: "rgba(255, 255, 255, 0.6)",
      dark: "rgba(0, 0, 0, 0.8)",
      fadedLight: "rgba(255, 255, 255, 0.2)",
      fadedDark: "rgba(0, 0, 0, 0.6)",
    },
    animation: {
      outerGlow: "animatedJamesTurrell 90s infinite",
      innerGlow: "animatedJamesTurrell 45s infinite",
    },
    extend: {
      fontSize: {
        xxs: ["10px"],
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        ".full-screen": {
          position: "fixed",
          top: "0",
          left: "0",
          outline: "none",
          width: "100vw",
          height: "100vh"
        },
      });
    }),
  ],
};
