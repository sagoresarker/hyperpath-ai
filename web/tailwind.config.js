/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./*.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { paper: "#FBFBFA" },
      fontFamily: {
        sans: ['"Geist"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12)",
        lift: "0 1px 2px rgba(15,23,42,0.05), 0 18px 48px -20px rgba(30,27,75,0.25)",
      },
    },
  },
  plugins: [],
};
