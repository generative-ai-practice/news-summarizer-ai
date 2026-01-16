/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0b0f1a",
        fog: "#f6f4ef",
        ember: "#e4572e",
        tide: "#1f6feb",
        moss: "#2f6b4f",
      },
      boxShadow: {
        glow: "0 20px 45px -35px rgba(14, 23, 39, 0.55)",
      },
    },
  },
  plugins: [],
};
