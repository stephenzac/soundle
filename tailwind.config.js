/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        color_wipe: {
          "0%": {},
          "50%": {},
          "100": {}
        }
      },
      animation: {
        "color-wipe-animation": "color_wipe 1s linear"
      }
    },
  },
  plugins: [],
}

