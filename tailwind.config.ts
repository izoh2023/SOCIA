import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        enter: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(40px, 40px, 0)" },
        },
        appear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        }
      },
      animation: {
          enter: "enter 1s ease-in-out  both",
          appear: "appear 2s ease-in-out  ",
      },
    },
  },
  plugins: [],
};
export default config;
