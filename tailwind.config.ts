/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.vue", "./app.vue"],
  safelist: [
    'text-red-600', 
    'text-xl', 
    'font-bold', 
    'w-full', 
    'md:w-1/2', 
    'p-2'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(45deg, #5F2981, #F1BC4A, #F01823)',
        'backheaderdt': "url('./images/fotodefundo.jpg')",
        'backheadercell': "url('./images/fotodefundocelular.jpg')",
        'divOne': "url('./images/fotocarro1.jpg')",
        'divTwo': "url('./images/fotocarro2.jpg')",
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

