<template>
  <div class="bg-red-600 opacity-70 p-5 text-2xl rounded-xl text-center">
    <div class="flex flex-col items-center p-5 text-center">
      <h1 class="font-bold text-5xl">Agendamento realizado!</h1>
      <p class="text-2xl font-bold underline" v-if="propModelo === 'Ao Vivo'">
        O pagamento é feito no local da mensagem ao vivo
      </p>
      <p class="text-2xl">Agora basta confiar e aguardar</p>
      <p class="text-2xl">Faltam {{ timeRemaining }} até a data da mensagem</p>
      <p class="text-2xl">Quando esta tela sumir, quer dizer que sua mensagem foi enviada</p>
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
      <p class="text-2xl">Em caso de dúvida, cancelamento ou reagendamento, <br>entre em contato através do nosso</p>
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
const emit = defineEmits(["agendamentoAtivo"]);

const props = defineProps<{
  propModelo: string;
  propSentTime: string;
  propSentDate: string;
}>();

function updateTimeRemaining(): string {
  const now = new Date();
  const target = new Date(props.propSentDate);
  const diff: number = Math.abs(target.getTime() - now.getTime());

  if (diff <= 0) {
    localStorage.clear();
    emit("agendamentoAtivo", false);
  } else emit("agendamentoAtivo", true);

  const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes: number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds: number = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Atualiza a cada segundo
const timeRemaining = ref<string>("");
onMounted(() => {
  timeRemaining.value = updateTimeRemaining(); // Atualiza imediatamente ao montar
  intervalId = setInterval(() => timeRemaining.value = updateTimeRemaining(), 1000);
});

let intervalId: any;
onUnmounted(() => {
  if (intervalId !== undefined) clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
});
</script>
