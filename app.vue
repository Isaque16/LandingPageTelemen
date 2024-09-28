<template>
  <body class="bg-custom-gradient text-white">
    <div class="flex justify-center">
      <nuxt-link to="https://wa.me/556899111571" target="blank" external
        ><div
          class="bg-green-500 fixed bottom-4 right-4 rounded-full p-4 shadow-lg font-semibold z-50"
        >
          <img
            src="./assets/SVG/whatsapp.svg"
            alt="Whatsapp"
            class="w-9"
          /></div
      ></nuxt-link>
    </div>

    <NuxtPage />

    <hr />
    <footer
      class="bg-transparent p-5 flex flex-col-reverse md:flex-row justify-between gap-10"
    >
      <address>
        Tel. 68999111571 <br />
        Email. rosadesarom_ac2@hotmail.com <br />
        CNPJ.
      </address>
      <nav class="p-4" aria-label="footer">
        <ul class="flex flex-col md:justify-center gap-5">
          <li><nuxt-link to="/#cabecalho">Início</nuxt-link></li>
          <li><nuxt-link to="/#modelos">Modelos de serviço</nuxt-link></li>
          <li><nuxt-link to="/#funciona">Como funciona</nuxt-link></li>
          <li><nuxt-link to="/agendamento">Fazer agendamento</nuxt-link></li>
        </ul>
      </nav>
      <div class="flex flex-col gap-3 text-center">
        <h2 class="text-xl">Nossas redes socias</h2>
        <ul class="flex flex-row justify-center gap-10">
          <li class="w-10">
            <nuxt-link
              to="https://www.facebook.com/telemensagem.rosadesarom"
              target="_blank"
              external
            >
              <img src="./assets/SVG/facebook_logo.svg" alt="Facebook"
            /></nuxt-link>
          </li>
          <li class="w-10">
            <nuxt-link
              to="https://www.instagram.com/telemensagem_rosadesarom_acre/"
              target="_blank"
              external
            >
              <img src="./assets/SVG/instagram_logo.svg" alt="Instagram"
            /></nuxt-link>
          </li>
        </ul>
      </div>
    </footer>
  </body>
</template>
