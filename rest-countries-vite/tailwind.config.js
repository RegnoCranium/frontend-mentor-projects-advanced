/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue-dark-mode-elements": "hsl(209, 23%, 22%)",
        "very-dark-blue-dark-mode-background": "hsl(207, 26%, 17%)",
        "very-dark-blue-light-mode-text": "hsl(200, 15%, 8%)",
        "dark-gray-light-mode-input": "hsl(0, 0%, 52%)",
        "very-light-gray-light-mode-background": "hsl(0, 0%, 98%)",
        "white-dark-mode-text-light-mode-elements": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        nunitoSans: ['"Nunito Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
