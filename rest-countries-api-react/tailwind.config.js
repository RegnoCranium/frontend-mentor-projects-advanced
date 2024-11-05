/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-elements": "hsl(209, 23%, 22%)",
        "dark-bg": "hsl(207, 26%, 17%)",
        "dark-text": "hsl(200, 15%, 8%)",
        "gray-input": "hsl(0, 0%, 52%)",
        "light-bg": "hsl(0, 0%, 98%)",
        "white-text-elements": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        "nunito-sans": ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
