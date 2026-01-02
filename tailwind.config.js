/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      
      colors: {
        brandOrange: "hsl(26,100%,55%)", 
        textMuted: "hsl(0, 0%, 62%)",     
        textSecondary: "hsl(0, 0%, 37%)",
        borderLight: "hsl(0, 0%, 91%)",   
        pageBackground: "hsl(0, 0%, 100%)", 
        textPrimary: "hsl(0, 0%, 0%)",      
        overlay: "hsla(0, 0%, 0%, 0.7)"   
      },

      screens: {
      'max-lg': {'max': '1024px'},
      'max-md': {'max': '768px'},
    },
    },
  },
  plugins: [],
}
