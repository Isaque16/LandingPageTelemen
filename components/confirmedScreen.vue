<template>
  <div
    id="confirm-screen"
    class="vermelho opacity-70 p-5 text-2xl rounded-xl text-center"
  >
    <div class="flex flex-col items-center p-5 text-center">
      <h1 class="font-bold text-5xl">Agendamento realizado!</h1>
      <p class="text-2xl font-bold">
        O pagamento é feito no local da mensagem ao vivo
      </p>
      <p class="text-2xl">Agora basta confiar e aguardar</p>
      <p class="">Faltam {{ timeRemaining }} até a data da mensagem</p>
      <div>
        <img src="/images/check-icon-gif.gif" alt="Check" class="w-40" />
      </div>
    </div>
    <p>
      <a href="../../../index.html" class="hover:underline hover:text-blue-400"
        >Voltar</a
      >
    </p>
    <div>
      Qualquer dúvida, entre em contato através do nosso
      <a
        href="https://wa.me/556899111571"
        class="text-green-400 underline"
        target="_blank"
        >Whatsapp</a
      >
    </div>
    <div class="flex flex-col gap-3 items-center">
      <h2 class="text-xl">Aproveite e veja mais sobre nosso trabalho!</h2>
      <ul class="flex flex-row gap-10">
        <li class="w-10">
          <a
            href="https://www.facebook.com/telemensagem.rosadesarom"
            target="_blank"
          >
            <img src="../assets/SVG/facebook_logo.svg" alt="Facebook"
          /></a>
        </li>
        <li class="w-10">
          <a
            href="https://www.instagram.com/telemensagem_rosadesarom_acre/"
            target="_blank"
          >
            <img src="../assets/SVG/instagram_logo.svg" alt="Instagram"
          /></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, onMounted } from "vue";

const emit = defineEmits(["agendamentoAtivo"]);

const props = defineProps<{
  propSentTime: string;
  propSentDate: string;
}>();

const timeRemaining = ref<string>("");

function updateTimeRemaining(): void {
  const now = new Date();
  const target = new Date(props.propSentDate);

  const diff: number = target.getTime() - now.getTime();

  if (diff <= 0) {
    emit("agendamentoAtivo", false);
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

// Atualiza a cada segundo
let intervalId: any;

onMounted(() => {
  updateTimeRemaining(); // Atualiza imediatamente ao montar
  intervalId = setInterval(updateTimeRemaining, 1000); // Atualiza a cada segundo
});

onUnmounted(() => {
  if (intervalId !== undefined) clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
});
</script>
