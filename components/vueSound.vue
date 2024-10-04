<template>
  <div>
    <div class="flex flex-row justify-between bg-red-600 text-white p-2">
      <div class="flex flex-col gap-5">
        <div class="flex flex-row justify-center gap-5 mx-10">
          <div>
            <a aria-label="go back 15 seconds" @click="goBack15">
              <back15-icon class="hover:cursor-pointer" />
            </a>
          </div>
          <div>
            <a
              :aria-label="state.playing ? 'pause' : 'play'"
              @click="togglePlay"
            >
              <play-icon v-if="!state.playing" class="hover:cursor-pointer" />
              <pause-icon v-if="state.playing" class="hover:cursor-pointer" />
            </a>
          </div>
          <div>
            <a aria-label="go ahead 15 seconds" @click="goAhead15">
              <ahead15-icon class="hover:cursor-pointer" />
            </a>
          </div>
        </div>
        <template>
          <div @click.prevent="seek">
            <div
              :style="{ width: percentComplete + '%' }"
              class="player-track-seeker"
            />
            <div
              :style="{ width: percentBuffered + '%' }"
              class="player-track-buffered"
            />
          </div>
          <div class="player-track-time">
            <span>{{ convertTimeHHMMSS(state.currentSeconds) }}</span>
            <span>/</span>
            <span>{{ convertTimeHHMMSS(state.durationSeconds) }}</span>
          </div>
        </template>
      </div>
      <div
        class="flex flex-row justify-end items-center mx-10"
        @mouseover.prevent="state.showVolume = true"
        @mouseleave.prevent="state.showVolume = false"
      >
        <transition name="slide-left" class="">
          <input
            class="h-2 w-1/4 appearance-none bg-white rounded-lg mx-4"
            v-show="state.showVolume"
            id="playerVolume"
            v-model="state.volume"
            type="range"
            min="0"
            max="100"
          />
        </transition>
        <a
          tabindex="0"
          class="player-volume-icon"
          :aria-label="muted ? 'unmute' : 'mute'"
          @click="mute"
          @keypress.space.enter="mute"
        >
          <volume-icon v-if="!muted" />
          <volume-muted-icon v-if="muted" />
        </a>
      </div>
    </div>
    <audio ref="audioFile" :loop="false" :src="file" preload="auto" />
  </div>
</template>

<script lang="ts" setup>
import PlayIcon from "./svg/PlayIcon.vue";
import PauseIcon from "./svg/PauseIcon.vue";
import Back15Icon from "./svg/Back15Icon.vue";
import Ahead15Icon from "./svg/Ahead15Icon.vue";
import VolumeIcon from "./svg/VolumeIcon.vue";
import VolumeMutedIcon from "./svg/VolumeMutedIcon.vue";

defineProps({
  file: { type: String, required: true },
});

const state = reactive({
  currentSeconds: 0,
  durationSeconds: 0,
  buffered: 0,
  loaded: false,
  playing: false,
  previousVolume: 35,
  showVolume: false,
  volume: 100,
});

const muted = computed(() => state.volume === 0);
const percentBuffered = computed(
  () => (state.buffered / state.durationSeconds) * 100,
);
const percentComplete = computed(
  () => (state.currentSeconds / state.durationSeconds) * 100,
);

const audioFile = ref<HTMLAudioElement>();

const convertTimeHHMMSS = (val: number) => {
  const hhmmss = new Date(val * 1000).toISOString().substr(11, 8);
  return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
};

const togglePlay = () => (state.playing = !state.playing);

const goAhead15 = () => (audioFile.value!.currentTime += 15);

const goBack15 = () => (audioFile.value!.currentTime -= 15);

const load = () => {
  if (audioFile.value!.readyState >= 2) {
    state.loaded = true;
    state.durationSeconds = audioFile.value!.duration;
  } else throw new Error("Failed to load sound file.");
};

const mute = () => {
  if (state.volume === 0) state.volume = state.previousVolume;
  else {
    state.previousVolume = state.volume;
    state.volume = 0;
  }
};

const seek = (e: any) => {
  if (!state.loaded) return;
  const el = e.target.getBoundingClientRect();
  const seekPos = (e.clientX - el.left) / el.width;
  audioFile.value!.currentTime = audioFile.value!.duration * seekPos;
};

const update = () => {
  state.currentSeconds = audioFile.value!.currentTime;
  state.buffered =
    audioFile.value!.buffered.length > 0 ? audioFile.value!.buffered.end(0) : 0;
};

watch(
  () => state.playing,
  (value) => {
    if (value) {
      audioFile.value!.play();
    } else {
      audioFile.value!.pause();
    }
  },
);

watch(
  () => state.volume,
  (newVolume) => {
    audioFile.value!.volume = newVolume / 100;
  },
);

onMounted(() => {
  audioFile.value?.addEventListener("timeupdate", update);
  audioFile.value?.addEventListener("loadeddata", load);
  audioFile.value?.addEventListener("pause", () => state.playing = false);
  audioFile.value?.addEventListener("play", () => state.playing = true);

  window.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "Space":
      case "Enter":
        togglePlay();
        break;
      case "ArrowUp":
        if (state.volume < 100) state.volume++;
        break;
      case "ArrowDown":
        if (state.volume > 0) state.volume--;
        break;
      case "ArrowLeft":
        goBack15();
        break;
      case "ArrowRight":
        goAhead15();
        break;
    }
  });
});
</script>
