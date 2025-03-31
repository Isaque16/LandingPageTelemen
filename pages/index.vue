<template>
  <header
    class="bg-backheadercell md:bg-backheaderdt bg-center bg-cover text-white w-full h-screen bg-blend-color bg-[rgba(0,0,0,0.477)] flex flex-col justify-center p-0 md:p-5"
    id="cabecalho"
  >
    <div class="p-5">
      <h1 class="text-4xl md:text-6xl text-center p-2 font-IBM font-bold">
        <span class="block">TELEMENSAGEM</span>
        <span class="block">ROSA DE SAROM</span>
      </h1>
      <p class="text-center text-xl font-playWrite">
        💌 Palavras que viram presentes 🎁
      </p>
      <NuxtLink to="/agendamento" class="flex justify-center my-5">
        <div
          name="container"
          class="text-center p-2 light-red hover:dark-red rounded-box cursor-pointer text-xl md:text-3xl font-workSans w-fit font-bold"
        >
          FAÇA JÁ SEU AGENDAMENTO!
        </div>
      </NuxtLink>
    </div>
  </header>
  <hr />

  <main class="p-5 w-full">
    <section id="modelos" class="flex flex-col gap-10">
      <div class="flex flex-col gap-5">
        <h2 class="text-center text-4xl mt-10 font-bold">
          MODELOS DE SERVIÇOS
        </h2>
        <div class="bg-white w-1/5 h-2 self-center"></div>
      </div>
      <Modelo
        :div1-class="'aovivo'"
        :div2-class="'aovivo'"
        :div-image="'aovivo'"
        modelo="Ao Vivo"
        :items="[
          '🚗 Carro com balões metalizados 🎈',
          '💌 2(duas) Mensagens',
          '🎵 Músicas a sua escolha',
          '🎤 Abrimos  oportunidade para falar',
          '❤️ Brinde: CORAÇÃO de pelúcia',
          '🎇 Chuva de Prata',
          '🎆 Fogos de artifício',
          '📸 Postagem de fotos em nossas redes sociais',
          '🎙 Locução Diferenciada',
          '✅ Garantia 100%',
        ]"
        :preco="180"
      />

      <Modelo
        :div1-class="'portelefone'"
        :div2-class="'portelefone'"
        :div-image="'portelefone'"
        modelo="Por Telefone"
        :items="[
          '📞 Ligação personalizada com mensagem',
          '🎶 Músicas de fundo a sua escolha',
          '🎤 Mensagens gravadas de alta qualidade',
        ]"
        :preco="20"
      />
    </section>

    <div class="flex flex-col">
      <section id="funciona" class="text-center p-5">
        <div class="flex flex-col gap-5">
          <h2
            class="text-center text-4xl mt-10 bg-transparent rounded-3xl font-bold"
          >
            COMO FUNCIONA?
          </h2>
          <div class="bg-white w-2/12 h-2 self-center mb-10"></div>
        </div>
        <div class="flex flex-col md:flex-row justify-between gap-10">
          <Instrucao
            image-url="images/contact-us.png"
            alt="Contato"
            title="ENTRE EM CONTATO"
            text="Entre em contato conosco através do Whatsapp e escolha entre os modelos de mensagens acima."
          />

          <span name="fadeBox" class="flex justify-center text-4xl items-center"
            >ou</span
          >
          <Instrucao
            image-url="/images/formulario-de-contato.png"
            alt="Formulário"
            title="FORNEÇA AS INFORMAÇÕES"
            text="Clicando no botão abaixo preencha o formulário com as informações necessárias para a realização do serviço"
          />

          <span
            name="fadeBox"
            class="md:hidden flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="44px"
              viewBox="0 -960 960 960"
              width="44px"
              fill="#ffffff"
            >
              <path
                d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"
              />
            </svg>
          </span>
          <span
            name="fadeBox"
            class="hidden md:flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="44px"
              viewBox="0 -960 960 960"
              width="44px"
              fill="#ffffff"
            >
              <path
                d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"
              />
            </svg>
          </span>

          <Instrucao
            image-url="images/garantia.png"
            alt="Check"
            title="CONFIE NO NOSSO TRABALHO"
            text="Após a realização de todas as etapas anteriores, basta ficar tranquilo e confiar no nosso trabalho"
          />
        </div>
      </section>
    </div>

    <NuxtLink to="/agendamento" class="flex justify-center my-5">
      <div
        name="container"
        class="text-center p-2 light-red hover:dark-red rounded-xl cursor-pointer text-2xl md:text-3xl font-workSans w-fit font-bold"
      >
        FAÇA JÁ SEU AGENDAMENTO!
      </div>
    </NuxtLink>
  </main>
</template>

<script setup lang="ts">
import anime from "animejs";

onMounted(() => {
  // Função chamada quando o elemento entra ou sai da viewport
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;

        if (element.getAttribute("name") === "container") {
          anime({
            targets: element,
            translateY: [0, -10],
            direction: "alternate",
            duration: 1000,
            easing: "easeInOutQuad",
          });
        }
      }
    });
  };
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.3,
  });
  document
    .getElementsByName("container")
    .forEach((cont) => observer.observe(cont));
});
</script>
