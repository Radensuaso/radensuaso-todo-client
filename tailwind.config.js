/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#021f32",
        "dark-lighter": "#02273f",
        "dark-darker": "#011726",

        light: "#f2f2f2",
        "light-lighter": "#ffffff",
        "light-darker": "#e6e6e6",

        primary: "#0776b9",
        secondary: "#0788b9",
        tertiary: "#079ab9",

        success: "#00a86b",
        danger: "#ff3e3e",
        warning: "#ff9f00",
        "primary-dark": "#0669a8",
        "secondary-dark": "#06799a",
        "tertiary-dark": "#068b9a",
        "success-dark": "#009a61",
        "danger-dark": "#e53737",
        "warning-dark": "#e68900",
      },
    },
  },
  plugins: [],
};
