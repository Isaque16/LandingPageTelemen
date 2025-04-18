<template>
  <header class="flex flex-col p-5 w-full h-full" id="cabecalho">
    <NuxtLink to="/">
      <div class="p-2">
        <h1 class="text-4xl md:text-6xl text-center p-2 font-IBM font-bold">
          TELEMENSAGEM <br />
          ROSA DE SAROM
        </h1>
        <p class="text-center text-lg font-playWrite">
          💌 Palavras que viram presentes 🎁
        </p>
      </div>
    </NuxtLink>
  </header>
  <hr />
  <div class="light-red opacity-70 p-5 text-2xl text-center">
    <div class="flex flex-col items-center p-5 text-center">
      <h1 class="font-bold text-5xl">Agendamento realizado!</h1>
      <p class="text-2xl font-bold" v-if="form.modelo === 'Ao Vivo'">
        O pagamento é feito no local da mensagem ao vivo
      </p>
      <p class="text-2xl">Agora basta confiar e aguardar</p>
      <p class="text-2xl">Faltam {{ timeRemaining }} até a data da mensagem</p>
      <div>
        <img src="/images/check-icon-gif.gif" alt="Check" class="w-40" />
      </div>
    </div>
    <p>
      <NuxtLink to="/" class="hover:underline hover:text-blue-400"
        >Voltar</NuxtLink
      >
    </p>
    <div>
      <p class="text-2xl">
        Em caso de dúvida, reagendamento ou cancelamento, <br />entre em contato
        através do nosso
      </p>
      <NuxtLink
        to="https://wa.me/556899111571"
        class="text-green-400 underline"
        target="_blank"
        external
        >Whatsapp</NuxtLink
      >
    </div>
    <div class="flex flex-col gap-3 items-center">
      <h2 class="text-xl">Aproveite e veja mais sobre nosso trabalho!</h2>
      <ul class="flex flex-row gap-10">
        <li class="w-10">
          <NuxtLink
            to="https://www.facebook.com/telemensagem.rosadesarom"
            target="_blank"
            external
          >
            <img src="../assets/SVG/facebook_logo.svg" alt="Facebook"
          /></NuxtLink>
        </li>
        <li class="w-10">
          <NuxtLink
            to="https://www.instagram.com/telemensagem_rosadesarom_acre/"
            target="_blank"
            external
          >
            <img src="../assets/SVG/instagram_logo.svg" alt="Instagram"
          /></NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const formStore = useUserFormStore();
const { formData: form, showContent } = formStore;

const timeRemaining = ref<string>("");

// Função para calcular o tempo restante até a data e hora do agendamento
function updateTimeRemaining(): void {
  const now = new Date();
  const target = new Date(
    `${form.data.split("/").reverse().join("-")}T${form.hora}`,
  );
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    formStore.$reset();
    useRouter().replace("/agendamento");
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timeRemaining.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

let intervalId: ReturnType<typeof setInterval>;

// Verifica se houve agendamento e envia os dados
onBeforeMount(async () => {
  const router = useRouter();
  const route = useRoute();

  if (route.query.session_id && !form.isAgendado) {
    form.isAgendado = true;

    const result = showContent.reduce((acc: Record<string, any>, item: any) => {
      acc[item.contentTitle] = item.data;
      return acc;
    }, {});

    try {
      await $fetch("/api/submitData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });
    } catch (error) {
      console.error("Erro ao enviar os dados: ", error);
    }
  } else if (!form.isAgendado) return router.replace("/agendamento");

  updateTimeRemaining(); // Atualiza o tempo restante imediatamente
  intervalId = setInterval(updateTimeRemaining, 1000); // Atualiza a cada segundo
});

// Limpa o intervalo quando o componente é desmontado
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
