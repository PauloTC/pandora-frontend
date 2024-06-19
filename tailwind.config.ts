import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: "media",
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-medium": "#E62020",
        "positive-dark": "#006B00",
        "positive-dark-opacity": "rgba(121, 210, 121, 0.32)",
        "neutral-dark": "#6C6C6C",
        "neutral-lightest": "#FCFCFC",
        "neutral-darkest": "#202020",
        "neutral-medium": "#DEDEDE",
        "neutral-light": "#F7F7F7",
      },
      boxShadow: {
        "card": "0px 0px 12.277px 0px rgba(108, 108, 108, 0.08), 0px 24.555px 49.11px -12.277px rgba(108, 108, 108, 0.16);"
      },
      keyframes: {
        "floating": {
          "0%": { transform: "translate(0,  0px)" },
          "50%": { transform: "translate(0, 15px)" },
          "100%": { transform: "translate(0, -0px)" },
        }
      },
      animation: {
        "floating": "floating 3s ease-in-out infinite"
      }
    },
  },
  plugins: [],
};
export default config;
