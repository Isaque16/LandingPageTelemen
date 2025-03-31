// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vite-pwa/nuxt",
  ],
  tailwindcss: {
    configPath: "tailwind.config.ts",
    cssPath: "./assets/styles/style.css",
  },
  pinia: {
    storesDirs: ["./store"],
  },
  imports: {
    autoImport: true,
  },
  app: {
    head: {
      title: "Telemensagem Rosa de Sarom",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // Primary Meta Tags
        {
          name: "title",
          content: "Telemensagem Rosa de Sarom - Mensagens que Viram Presente | Rio Branco - Acre"
        },
        {
          name: "description",
          content: "Telemensagens personalizadas que transformam palavras em presentes. Presenteie com mensagens de amor, amizade e carinho em Rio Branco e todo o Acre."
        },
        {
          name: "keywords",
          content: "telemensagem, mensagens de voz, presentes emocionais, Rio Branco, Acre, Rosa de Sarom, mensagens personalizadas, declarações, aniversários, parabéns, mensagens de amor"
        },

        // Open Graph / Facebook
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:url",
          content: "https://telemensagem-rosa-de-sarom.vercel.app/"
        },
        {
          property: "og:title",
          content: "Telemensagem Rosa de Sarom - Mensagens que Viram Presente"
        },
        {
          property: "og:description",
          content: "Transforme palavras em presentes emocionantes com nossas telemensagens personalizadas para todas as ocasiões."
        },
        {
          property: "og:image",
          content: "https://telemensagem-rosa-de-sarom.vercel.app/images/fotodefundo.jpg"
        },

        // Twitter
        {
          property: "twitter:card",
          content: "summary_large_image"
        },
        {
          property: "twitter:url",
          content: "https://telemensagem-rosa-de-sarom.vercel.app/"
        },
        {
          property: "twitter:title",
          content: "Telemensagem Rosa de Sarom - Mensagens que Viram Presente"
        },
        {
          property: "twitter:description",
          content: "Transforme palavras em presentes emocionantes com nossas telemensagens personalizadas para todas as ocasiões."
        },
        {
          property: "twitter:image",
          content: "https://telemensagem-rosa-de-sarom.vercel.app/images/fotodefundo.jpg"
        },

        // Theme and App Config
        {
          name: "theme-color",
          content: "#dc2626"
        },
        {
          name: "msapplication-TileColor",
          content: "#dc2626"
        },
        {
          name: "application-name",
          content: "Telemensagem Rosa de Sarom"
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Rosa de Sarom"
        }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/telemenicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Playwrite+NL:wght@100..400&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
      bodyAttrs: {
        class: "bg-custom-gradient text-white",
      },
    },
  },
  compatibilityDate: "2024-10-27",
});
