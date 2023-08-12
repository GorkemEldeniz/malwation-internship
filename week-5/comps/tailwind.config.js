/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fill: {
        current: "currentColor",
      },
      colors: {
        current: "currentColor",
      },
      keyframes: {
        success: {
          "0%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        success: "success 400ms ease-in-out",
      },
    },
  },
  plugins: [],
};
