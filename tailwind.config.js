/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,ts}"];
export const darkMode = "class";
export const theme = {
  extend: {
    colors: {
      // base: "rgb(var(--color-base) / <alpha-value>)",
      // content: "rgb(var(--color-content) / <alpha-value>)",
      primary: "rgb(var(--color-primary) / <alpha-value>)",
    },
  },
};
export const plugins = [];
