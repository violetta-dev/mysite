/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        vix: {
          primary: "#a55eea",
          glow: "#c084fc",
          neon: "#d946ef"
        }
      },
      boxShadow: {
        'vix-glow': '0 0 30px rgba(165,94,234,0.35)',
      }
    },
  },
  plugins: [],
}
