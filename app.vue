<template>
  <div class="flex justify-center">
    <NuxtLink
      to="https://wa.me/556899111571"
      rel="noopener noreferrer"
      target="_blank"
      external
      ><div
        class="bg-green-500 fixed bottom-4 right-4 rounded-full p-4 shadow-lg font-semibold z-50"
      >
        <img
          src="./assets/SVG/whatsapp.svg"
          alt="Whatsapp"
          class="w-9"
        /></div
    ></NuxtLink>
  </div>

  <NuxtPage />

  <hr />
  <footer
    class="bg-transparent p-5 flex flex-col-reverse md:flex-row justify-between gap-10"
  >
    <address>
      Tel. 68999111571 <br />
      Email. rosadesarom_ac2@hotmail.com <br />
      CNPJ. 14.469.911.0001/77 <br />
    </address>
    <nav class="p-4" aria-label="footer">
      <ul class="flex flex-col md:justify-center gap-5">
        <li><NuxtLink to="/#cabecalho">Início</NuxtLink></li>
        <li><NuxtLink to="/#modelos">Modelos de serviço</NuxtLink></li>
        <li><NuxtLink to="/#funciona">Como funciona</NuxtLink></li>
        <li><NuxtLink to="/agendamento">Fazer agendamento</NuxtLink></li>
      </ul>
    </nav>
    <div class="flex flex-col gap-3 text-center">
      <h2 class="text-xl">Nossas redes socias</h2>
      <ul class="flex flex-row justify-center gap-10">
        <li class="w-10">
          <NuxtLink
            to="https://www.facebook.com/telemensagem.rosadesarom"
            target="_blank"
            external
          >
            <img src="./assets/SVG/facebook_logo.svg" alt="Facebook"
          /></NuxtLink>
        </li>
        <li class="w-10">
          <NuxtLink
            to="https://www.instagram.com/telemensagem_rosadesarom_acre/"
            target="_blank"
            external
          >
            <img src="./assets/SVG/instagram_logo.svg" alt="Instagram"
          /></NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
  <p class="opacity-70">
    Desenvolvido por
    <NuxtLink
      to="https://github.com/Isaque16"
      external
      target="blank"
      class="font-bold underline"
      >Isaque Costa</NuxtLink
    >
  </p>
</template>
