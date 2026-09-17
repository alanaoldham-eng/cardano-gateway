import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        tellus: {
          teal: "#0E4D4A",
          aqua: "#18B7B0",
          mint: "#D8F4EE",
          charcoal: "#243746",
          gold: "#F2C14E",
          neutral: "#F6F8F7",
          ink: "#102A33"
        },
        navy: {
          950: "#08211F",
          900: "#0E4D4A",
          800: "#125B57",
          700: "#18736E"
        }
      },
      boxShadow: {
        soft: "0 22px 70px rgba(14, 77, 74, 0.14)",
        glow: "0 22px 80px rgba(24, 183, 176, 0.22)",
        gold: "0 18px 55px rgba(242, 193, 78, 0.24)"
      },
      backgroundImage: {
        "tellus-hero": "radial-gradient(circle at 18% 16%, rgba(24,183,176,0.28), transparent 28%), radial-gradient(circle at 80% 12%, rgba(242,193,78,0.16), transparent 22%), linear-gradient(135deg, #08211F 0%, #0E4D4A 48%, #F6F8F7 48.2%, #FFFFFF 100%)",
        "tellus-soft": "radial-gradient(circle at 12% 10%, rgba(216,244,238,0.9), transparent 25%), linear-gradient(180deg, #FFFFFF 0%, #F6F8F7 100%)",
        "gateway-path": "linear-gradient(90deg, transparent, rgba(242,193,78,0.92), transparent)"
      }
    }
  },
  plugins: []
};

export default config;
