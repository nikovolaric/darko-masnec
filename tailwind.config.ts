import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#1447A7",
        neutral: "#EBEBEB",
      },
      letterSpacing: {
        base: "-0.05em",
        more: "-0.1em",
      },
    },
  },
  plugins: [],
} satisfies Config;
