<template>
  <body class="bg-custom-gradient text-white">
    <div>
      <div class="flex justify-center">
        <a href="https://wa.me/556899111571" target="blank"
          ><div
            class="bg-green-500 fixed bottom-4 right-4 rounded-full p-4 shadow-lg font-semibold z-50"
          >
            <img
              src="./assets/SVG/whatsapp.svg"
              alt="Whatsapp"
              class="w-9"
            /></div
        ></a>
      </div>
      <NuxtPage />
    </div>
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
          <li><router-link to="/#cabecalho">Início</router-link></li>
          <li><router-link to="/#modelos">Modelos de serviço</router-link></li>
          <li><router-link to="/#funciona">Como funciona</router-link></li>
          <li><router-link to="/form">Agendamentos</router-link></li>
        </ul>
      </nav>
      <div class="flex flex-col gap-3 text-center">
        <h2 class="text-xl">Nossas redes socias</h2>
        <ul class="flex flex-row justify-center gap-10">
          <li class="w-10">
            <a
              href="https://www.facebook.com/telemensagem.rosadesarom"
              target="_blank"
            >
              <img src="./assets/SVG/facebook_logo.svg" alt="Facebook"
            /></a>
          </li>
          <li class="w-10">
            <a
              href="https://www.instagram.com/telemensagem_rosadesarom_acre/"
              target="_blank"
            >
              <img src="./assets/SVG/instagram_logo.svg" alt="Instagram"
            /></a>
          </li>
        </ul>
      </div>
    </footer>
  </body>
</template>
