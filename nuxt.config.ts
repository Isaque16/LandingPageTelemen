// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [ '@nuxtjs/tailwindcss' ],
  app: {
    head: {
      title: "Telemensagem Rosa de Sarom",
      meta: [
        { name: 'description', content: 'descrição do meu site'},
        { name: "viewport", content: "width=device-width, initial-scale=1"},
        { charset: "utf-8" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "./telemenicon.ico"},
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Playwrite+NL:wght@100..400&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" }
      ],
    }
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true }
})