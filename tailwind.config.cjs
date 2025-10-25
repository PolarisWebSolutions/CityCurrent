/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        energy: {
          supply: "#4ade80",
          demand: "#f97316"
        },
        economy: {
          income: "#38bdf8",
          expense: "#ef4444"
        }
      }
    }
  },
  plugins: []
};
