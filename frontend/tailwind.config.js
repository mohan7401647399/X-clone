import daisyui from "daisyui"
import daisyUIThemes from "daisyui/src/theming/themes"

/** @type {import('tailwindcss').Config} */
module.exports = {
//  content: [
 //   "./src/**/*.{js,jsx,ts,tsx,html}",       // Adjust this path based on your project structure
 //   "./public/index.html",
 //   "./build/index.html",
 // ],
  purge: {
    content: ['./src/**/*.html'],
    safelist: [
      'bg-blue-500',
      'text-center',
      'hover:opacity-100',
      // ...
      'lg:text-right',
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      'light',
      {
        black: {
          ...daisyUIThemes["black"],
          primary: "rgb(29, 155, 240)",
          secondary: "rgb(24, 24, 24)"
        }
      }
    ]

  }
}
