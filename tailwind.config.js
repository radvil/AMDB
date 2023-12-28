/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // base: "rgb(var(--color-base) / <alpha-value>)",
        // content: "rgb(var(--color-content) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
