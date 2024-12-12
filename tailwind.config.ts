import type {Config} from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        4: "4px",
        10: "10px",
      },
      colors: {
        primary: "#0047CC",
        success: {primary: "#2CA62C", light: "#EEFBEE", text: "#1D871D"},
        warning: {text: "#E58619", light: "#FFF7EB"},
        danger: {text: "#D4112C", light: "#FEECEE"},
        text: {
          primary: "#121217",
          dark: "#3C4049",
          darken: "#17191C",
          dark2: "#ABB0BA",
          dark4: "#7E8695",
          dark5: "#ABB0BA",
          base: "#5C6370",
        },
        border: {
          light: "#DFE1E5",
          neutral: "#EDEFF2",
          dark: "#D2D5DA",
        },
        ea: "#EAEAEA",
        f8: "#F8F8F8",
      },
    },
  },
  plugins: [],
} satisfies Config;
