/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gradientStart: "#190F23",
        gradientMiddle: "#251535",
        gradientEnd: "#190F23",

        primary: "#190F23",
        primaryLight1: "rgba(117, 0, 235, 0.05)",
        primaryLight2: "rgba(117, 0, 235, 0.1)",
        primaryLight3: "rgba(117, 0, 235, 0.2)",

        accent: "#7500EB",

        textLight1: "#F1F5F9",
        textLight2: "#CBD5E1",
        textLight3: "#94A3B8",

        textDark: "#64748B",
      },
      fontFamily: {
        beVietnamPro: "BeVietnamPro-Black",
        beVietnamProRegular: "BeVietnamPro-Regular",
        beVietnamProSemiBold: "BeVietnamPro-SemiBold",
        beVietnamProMedium: "BeVietnamPro-Medium",
        beVietnamProLight: "BeVietnamPro-Light",
        beVietnamProThin: "BeVietnamPro-Thin",
      },
    },
  },
  plugins: [],
};
