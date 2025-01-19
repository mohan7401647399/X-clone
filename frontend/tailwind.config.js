/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  safelist: [
    "bg-blue-500",
    "text-center",
    "hover:opacity-100",
    "lg:text-right",
  ],
  daisyui: {
    themes: [
      "light",
      {
        black: {
          ...daisyUIThemes["black"],
          primary: "rgb(29, 155, 240)",
          secondary: "rgb(24, 24, 24)",
        },
      },
    ],
  },
};
