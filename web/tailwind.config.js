/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16133A",
        paper: "#F3F5FF",
        sky: "#3B5BFF",
        pink: "#FF4D8D",
        sun: "#FFC93C",
        mint: "#22D3A6",
        grape: "#8B5CF6",
        tang: "#FF8A3D",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ['"Nunito Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        pop: "6px 6px 0 0 #16133A",
        popsm: "3px 3px 0 0 #16133A",
        poplg: "10px 10px 0 0 #16133A",
      },
      borderWidth: { 3: "3px" },
    },
  },
  plugins: [],
};
