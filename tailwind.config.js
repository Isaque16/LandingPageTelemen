/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/pages/*.html'],
  safelist: [
    'animate-greenPulse',
    'animate-descer',
    'animate-subir',
    'animate-chacoalhar',
    'text-red-600', 
    'text-xl', 
    'font-bold', 
    'w-full', 
    'md:w-1/2', 
    'p-2'
  ],
  theme: {
    extend: {
      keyframes: {
        greenPulse: {
          '0%': { boxShadow: '0 0 5px rgba(0, 255, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 0, 1)' },
          '100%': { boxShadow: '0 0 5px rgba(0, 255, 0, 0.5)' },
        },
        subir: {
          '0%': { transform: 'translateY(0)', boxShadow: '0 0 0 rgba(0, 0, 0, 0)' },
          '100%': { transform: 'translateY(-10px)', boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)' },
        },
        descer: {
          '0%': { transform: 'translateY(-10px)', boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)' },
          '100%': { transform: 'translateY(0)', boxShadow: '0 0 0 rgba(0, 0, 0, 0)' },
        },
        chacoalhar: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        greenPulse: 'greenPulse 2s infinite',
        subir: 'subir 1s ease forwards',
        descer: 'descer 1s ease backwards',
        chacoalhar: 'chacoalhar 2s infinite',
      },
      translate: {
        '-10px': '-10px',
      },
      boxShadow: {
        state0: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
        state100: '0 20px 30px rgba(0, 0, 0, 0.3)',
      },
      transformOrigin: {
        '-50%': '50%',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(45deg, #5F2981, #F1BC4A, #F01823)',
        'backheaderdt': "url('../../../public/images/fotodefundo.jpg')",
        'backheadercell': "url('../../../public/images/fotodefundocelular.jpg')",
        'divOne': "url('../../../public/images/fotocarro1.jpg')",
        'divTwo': "url('../../../public/images/fotocarro2.jpg')",
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

