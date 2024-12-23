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
<<<<<<< HEAD
    content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
=======
    content: ['./src/**/*.html'],
>>>>>>> 23d7fcdaf3c8afa26bc6a9d32a8a312662faf270
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
