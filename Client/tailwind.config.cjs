const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#169f65",
        "primary-foreground": "#f7fef9",
        accent: "#e7f6ed",
        "accent-foreground": "#004828",
        secondary: "#F9FBFD",
        "secondary-foreground": "#0f172b",
        muted: "#f3f6f9",
        "muted-foreground": "#62748e",
        error: "#db2c2a",

        border: "#e2e8f0",
        foreground: "#020618",
        ring: "#8F8F8F"

      }
    },
  },
  plugins: [],
};
