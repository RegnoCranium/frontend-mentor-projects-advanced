/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Theme 1
        "t1-main-background": "hsl(222, 26%, 31%)",
        "t1-toggle-background": "hsl(223, 31%, 20%)",
        "t1-screen-background": "hsl(224, 36%, 15%)",
        "t1-key-background-sp": "hsl(225, 21%, 49%)",
        "t1-key-shadow": "hsl(224, 28%, 35%)",
        "t1-key-red": "hsl(6, 63%, 50%)",
        "t1-key-red-shadow": "hsl(6, 70%, 34%)",
        "t1-key-background": "hsl(30, 25%, 89%)",
        "t1-key-light-orange-shadow": "hsl(28, 16%, 65%)",
        "t1-dark-grayish-blue": "hsl(221, 14%, 31%)",
        "t1-white": "hsl(0, 0%, 100%)",

        // Theme 2
        "t2-main-background": "hsl(0, 0%, 90%)",
        "t2-toggle-background": "hsl(0, 5%, 81%)",
        "t2-screen-background": "hsl(0, 0%, 93%)",
        "t2-key-background": "hsl(185, 42%, 37%)",
        "t2-key-shadow": "hsl(185, 58%, 25%)",
        "t2-key-orange": "hsl(25, 98%, 40%)",
        "t2-key-orange-shadow": "hsl(25, 99%, 27%)",
        "t2-key-light-yellow": "hsl(45, 7%, 89%)",
        "t2-key-light-yellow-shadow": "hsl(35, 11%, 61%)",
        "t2-key-text": "hsl(60, 10%, 19%)",
        "t2-white": "hsl(0, 0%, 100%)",

        // Theme 3
        "t3-main-background": "hsl(268, 75%, 9%)",
        "t3-toggle-background": "hsl(268, 71%, 12%)",
        "t3-screen-background": "hsl(268, 71%, 12%)",
        "t3-key-background": "hsl(281, 89%, 26%)",
        "t3-key-shadow": "hsl(285, 91%, 52%)",
        "t3-key-cyan": "hsl(176, 100%, 44%)",
        "t3-key-cyan-shadow": "hsl(177, 92%, 70%)",
        "t3-key-dark-violet": "hsl(268, 47%, 21%)",
        "t3-key-dark-magenta-shadow": "hsl(290, 70%, 36%)",
        "t3-light-yellow": "hsl(52, 100%, 62%)",
        "t3-very-dark-blue": "hsl(198, 20%, 13%)",
        "t3-white": "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("theme-two", ".theme-two &");
      addVariant("theme-three", ".theme-three &");
    },
    require("tailwind-scrollbar-hide"),
  ],
};
