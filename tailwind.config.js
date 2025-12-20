@type {import('tailwindcss').Config} 

module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      animation: {
        slidedown: "slidedown 0.5s ease-in",
        slideup: "slideup 0.5s ease-out"
      }
    },
    keyFrames:{
      slidedown: {
        "0%": {
          transform: "translateY(-200px)",
          opacity: "0"
        },
        "100%": {
          transform: "translateY(-10px)",
          opacity: "100"
        }
      },
      slideup: {
        "0%": {
          transform: "translateY(-10px)",
          opacity: "100"
        },
        "100%": {
          transform: "translateY(-200px)",
          opacity: "0"
        }
      }
    }
  },
  plugins: [],
}