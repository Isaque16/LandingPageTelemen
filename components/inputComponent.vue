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
    </div>
    <p v-if="isFocused && isValid" class="opacity-70 text-xl font-bold w-full md:w-1/2">
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
