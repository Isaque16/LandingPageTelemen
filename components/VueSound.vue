<template>
  <div class="flex flex-row w-full items-center justify-center gap-10">
    <!-- Indicador de Loading -->
    <div v-if="isLoading" class="loading-spinner"></div>

    <!-- Botão de Play/Pause -->
    <button v-else>
      <span v-if="isPlaying" @click="togglePlayPause">
        <!-- Ícone de Pausa -->
        <PauseIcon />
      </span>
      <span v-else @click="togglePlayPause">
        <!-- Ícone de Play -->
        <PlayIcon />
      </span>
    </button>

    <input
      type="range"
      min="0"
      :max="duration"
      :value="currentTime"
      @input="setCurrentTime"
      class="appearance-none bg-red-700 h-2 rounded-full w-1/2 range range-error"
    />
  </div>
</template>

<script lang="ts" setup>
import { Howl } from "howler";
import PlayIcon from "./PlayerSvg/PlayIcon.vue";
import PauseIcon from "./PlayerSvg/PauseIcon.vue";

const props = defineProps<{
  controller: boolean;
  file: string;
}>();

// Refs para controlar o player
const isLoading = ref<boolean>(true);
const isPlaying = ref<boolean>(false);
const volume = ref<number>(1.0); // Volume padrão 100%
const currentTime = ref<number>(0); // Tempo atual
const duration = ref<number>(0); // Duração total

let sound: Howl;

// Função para inicializar o Howler
const initSound = () => {
  sound = new Howl({
    src: [props.file],
    volume: volume.value,
    format: ["mp3"],
    onend: () => {
      isPlaying.value = false; // Define como não tocando quando acaba
      currentTime.value = 0; // Reseta o tempo atual
    },
    onload: () => {
      duration.value = sound.duration(); // Define a duração total após o áudio ser carregado
      isLoading.value = false; // Define como carregado
    },
    onplay: () => requestAnimationFrame(updateCurrentTime), // Atualiza o tempo atual enquanto está tocando
  });
};

// Atualiza o tempo atual
const updateCurrentTime = () => {
  currentTime.value = sound.seek(); // Busca a posição atual
  requestAnimationFrame(updateCurrentTime); // Chama novamente para atualizar
};

const togglePlayPause = () => {
  if (isPlaying.value) {
    sound.pause();
    isPlaying.value = false;
  } else {
    sound.play();
    isPlaying.value = true;
  }
};

// Reagir a mudanças em `props.controller`
watch(
  () => props.controller,
  (newVal: boolean) => {
    if (newVal) {
      initSound();
      sound.play(); // Toca o som se controller for true
      isPlaying.value = true;
    } else {
      sound.pause(); // Pausa o som se controller for false
      isPlaying.value = false;
    }
  },
);

// Função para definir o tempo atual
const setCurrentTime = (event: any) => {
  const newTime = event.target.value;
  if (sound) sound.seek(newTime); // Muda a posição do áudio
};

watch(isPlaying, (newVal) => {
  if (!newVal) currentTime.value = 0; // Reseta o tempo quando pausa
});

onMounted(initSound);

onBeforeUnmount(() => sound && sound.unload());
</script>

<style scoped>
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
