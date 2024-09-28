<template>
  <div class="flex flex-col p-2">
    <div class="flex flex-row gap-5">
      <label
        v-if="forLabel !== 'mensagem'"
        :for="forLabel"
        class="bg-red-600 p-2 rounded-t-xl w-fit text-2xl font-bold text-center"
      >
        {{ inputTitle }}
      </label>
    </div>
    <div class="bg-red-600 p-2 w-full md:w-1/2 rounded-b-xl rounded-tr-xl flex">
      <input
        v-if="forLabel !== 'ocasiao' && forLabel !== 'mensagem'"
        class="px-2 py-1 text-black text-xl rounded-xl w-full md:w-50"
        :type="inputType"
        v-model="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        @focusin="showInfoMessage"
        @focusout="hideInfoMessage"
        @blur="verifyInput"
      />
      <button
        v-if="forLabel === 'musica'"
        type="button"
        class="p-2 text-xl font-bold hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path
            d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
          />
        </svg>
      </button>
    </div>
    <div
      v-if="forLabel === 'musica'"
      ref="search-container"
      class="bg-white text-black p-5 w-fit rounded-xl empty:hidden overflow-y-auto"
    ></div>
    <p v-if="isFocused && isValid" class="opacity-70 text-xl w-full md:w-1/2">
      {{ infoMessage }}
    </p>
    <p
      v-if="!isValid"
      class="text-red-600 text-xl italic font-bold w-full md:w-1/2 p-2"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Manda os dados o input para o father
defineProps<{
  forLabel: string;
  inputTitle: string;
  inputType?: string;
  modelValue: string;
  placeholder?: string;
  autocomplete?: string;
  infoMessage?: string;
  errorMessage?: string;
}>();

// Controle de foco e validação
const isFocused = ref(false);
const showInfoMessage = () => (isFocused.value = true);
const hideInfoMessage = () => (isFocused.value = false);

// Verifica se o input foi preenchido ou não
const modelValue = defineModel<string>("modelValue");
const isValid = ref<boolean>(true);

const verifyInput = () => (isValid.value = !!modelValue.value);
</script>
