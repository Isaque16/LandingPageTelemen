/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.vue", "./app.vue"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(45deg, #5F2981, #F1BC4A, #F01823)',
        'backheaderdt': "url('./images/fotodefundo.jpg')",
        'backheadercell': "url('./images/fotodefundocelular.jpg')",
      },
      fontFamily: {
        workSans: ['Work Sans'],
        playWrite:['Playwrite NL'],
        IBM: ['IBM Plex Sans']
      },
    },
  },
  plugins: [],
}

