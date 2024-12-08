// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
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
        {
          key: "keywords",
          content:
            "Telemensagem Rosa de Sarom: Palavras que viram presentes, Rio Branco - Acre",
        },
        {
          name: "description",
          content: "Telemensagem Rosa de Sarom: Palavras que viram presentes",
        },
        {
          name: "theme-color",
          content: "#dc2626",
        },
        { charset: "utf-8" },
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
