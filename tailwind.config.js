/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [" calluna-sans", "sans-serif"],
        display: ["linotype-sabon", "serif"],
      },
    },
  },
  plugins: [],
};
