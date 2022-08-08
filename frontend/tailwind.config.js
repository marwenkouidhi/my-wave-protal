/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
