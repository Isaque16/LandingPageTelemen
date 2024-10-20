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
  <div class="bg-red-600 opacity-70 p-5 text-2xl text-center">
    <div class="flex flex-col items-center p-5 text-center">
      <h1 class="font-bold text-5xl">Agendamento realizado!</h1>
      <p
        class="text-2xl font-bold"
        v-if="form.modelo === 'Ao Vivo'"
      >
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
        Em caso de dúvida, cancelamento ou reagendamento, <br />entre em contato
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
const { formData: form } = userFormStore();
const timeRemaining = ref<string>("");
function updateTimeRemaining(): void {
  const now = new Date();
  const target = new Date(
    `${form.data.split('/').reverse().join('-')}T${form.hora}`,
  );
  const diff: number = target.getTime() - now.getTime();
  if (diff <= 0) {
    userFormStore().$reset();
    useRouter().replace("/agendamento");
    return;
  }

  const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes: number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds: number = Math.floor((diff % (1000 * 60)) / 1000);

  timeRemaining.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

let intervalId: any;
// Verifica se já houve agendamento ou não
onBeforeMount(() => {
  if (useRoute().redirectedFrom?.fullPath.includes("agendamento")) {
    form.isAgendado = true;
    const showContent = computed(() => {
      let content = [
        { contentTitle: "Modelo de Mensagem", data: form.modelo },
        { contentTitle: "Nome de Quem Envia", data: form.nome },
        { contentTitle: "Nome de Quem Receberá", data: form.para },
        { contentTitle: "Horário da Mensagem", data: form.hora },
        { contentTitle: "Data da Mensagem", data: form.data },
        { contentTitle: "Ocasião da Mensagem", data: form.ocasiao },
        { contentTitle: "Telefone para Contato", data: form.contato },
        { contentTitle: "Mensagem", data: form.mensagem },
      ];

      const variableItems = []; // Adicionar itens variáveis com base no valor de propModelo

      if (form.modelo === "Ao Vivo") {
        variableItems.push(
          { contentTitle: "Música para chegar tocando", data: form.musica },
          { contentTitle: "Endereço da Comemoração", data: form.endereco },
        );
      } else if (form.modelo === "Por Telefone") {
        variableItems.push({
          contentTitle: "Telefone do Destinatário",
          data: form.destinatariotel,
        });
      }
      // Retornar a combinação dos itens fixos e variáveis
      return [...content, ...variableItems];
    });

    const result = showContent.value.reduce((acc: any, item: any) => {
      acc[item.contentTitle] = item.data; // Atualiza o acumulador
      return acc; // Retorna o acumulador atualizado
    }, {}); // Inicializa o acumulador como um objeto vazio
    try {
      $fetch("/api/submitData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });
      console.log("Agendamento enviado");
    } catch (error) {
      console.error("Houve um erro ao enviar os dados: ", error);
    }
  }
  else if (form.isAgendado == false) return useRouter().replace("/agendamento");
  
  updateTimeRemaining(); // Atualiza imediatamente ao montar
  intervalId = setInterval(updateTimeRemaining, 1000);
});

onUnmounted(() => {
  if (intervalId !== undefined) clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
});
</script>