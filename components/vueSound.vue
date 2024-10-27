<template>
  <div class="flex flex-row w-full items-center justify-center gap-10">
    <!-- Botão de Play/Pause -->
    <button>
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
      class="appearance-none bg-red-700 h-2 rounded-full w-1/2 range range-error "
    />
  </div>
</template>

<script lang="ts" setup>
import { Howl } from "howler";
import PlayIcon from "./PlayerSvg/PlayIcon.vue";
import PauseIcon from "./PlayerSvg/PauseIcon.vue";
// import VolumeIcon from "./PlayerSvg/VolumeIcon.vue";

const props = defineProps<{
  controller: boolean;
  file: string;
}>();

// Refs para controlar o player
const isPlaying = ref<boolean>(false);
const volume = ref<number>(1.0); // Volume padrão 100%
const currentTime = ref<number>(0); // Tempo atual
const duration = ref<number>(0); // Duração total

// Exemplo de caminho do áudio
let sound: Howl;

// const showVolumeControl = ref(false); // Controle de volume oculto inicialmente

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
    onload: () => (duration.value = sound.duration()), // Define a duração total após o áudio ser carregado
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
}

// Reagir a mudanças em `props.controller`
watch(() => props.controller, (newVal: boolean) => {
  if (newVal) {
    initSound();
    sound.play(); // Toca o som se controller for true
    isPlaying.value = true;
  }
  else {
    sound.pause(); // Pausa o som se controller for false
    isPlaying.value = false;
  }
});

// Função para mudar o volume
// const changeVolume = () => {
//   if (sound)
//     sound.volume(volume.value);
// }

// Função para alternar a visibilidade do controle de volume
// const toggleVolumeControl = () => showVolumeControl.value = !showVolumeControl.value; // Alterna a visibilidade;

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
