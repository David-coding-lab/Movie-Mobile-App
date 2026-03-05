/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6D28D9", // Deep Purple (Violet 700)
        accent: "#C084FC", // Soft Lavender (Purple 400)
        secondary: "#1E1B4B", // Midnight Indigo (Indigo 950)
        dark: {
          DEFAULT: "#0F172A", // Deep Slate/OLED
          surface: "#1E293B", // Card background
        },
        light: {
          DEFAULT: "#F8FAFC", // Clean White
          muted: "#94A3B8", // Muted Slate text
          subtle: "#334155", // Border/Divider
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        alt: ["Poppins", "sans-serif"],
        quotes: ["Georgia", "serif"],
        primary: "quicksand",
      },
    },
  },
  plugins: [],
};
