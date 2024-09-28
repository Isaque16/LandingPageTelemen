<template>
  <main class="bg-transparent text-black text-2xl text-center p-5">
    <h1
      class="px-10 py-1 border-black border-2 w-1/2 mx-auto rounded-xl bg-slate-100 font-bold"
    >
      {{ $route.params.mensagem }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3">
      <div
        class="bg-gray-100 flex flex-row items-center justify-between text-black text-center rounded-2xl border-black border-2 m-10" v-for="(mensagem, index) of mensagens" :key="index"
      >
        <p class="text-xl pl-5">
          {{ mensagem.nome }}
        </p>
        <button
          class="bg-red-700 hover:bg-red-600 px-5 py-1 rounded-tr-xl rounded-br-xl text-white text-xl text-center h-full"
          @click="setDialog(mensagem.nome)"
        >
          Ouvir
        </button>
      </div>
    </div>
  </main>

  <dialog
    class="bg-zinc-100 text-black text-2xl w-1/2 h-1/2 flex justify-center rounded-2xl"
    ref="dialogScreen"
  >
    <div
      class="bg-white text-black p-5 text-center flex flex-col justify-center rounded-xl w-1/2 border-black border-2 m-10"
    >
      <p class="text-3xl">{{ dialogTitle }}</p>
      <p class="py-5">audio</p>
      <div class="flex flex-row justify-around">
        <button
          class="bg-red-700 hover:vermelho px-5 py-1 rounded-2xl text-white text-2xl"
          @click="closeDialog"
        >
          Outro
        </button>
        <button class="bg-red-700 hover:vermelho px-5 py-1 rounded-2xl text-white text-2xl" 
        @click="sendSelectedMensagem">
          Selecionar
        </button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import mensagens from '../../backend/database/mensagens.json'
import { useFormStore } from "~/store/userFormStore";

const route = useRouter();

const dialogScreen = ref<HTMLDialogElement>();
const dialogTitle = ref<string>('');
const setDialog = (title: string) => {
  dialogTitle.value = title
  dialogScreen.value?.showModal();
};
const closeDialog = () => dialogScreen.value?.close();

const sendSelectedMensagem = () => {
  useFormStore().formData.mensagem = dialogTitle.value;
  route.go(-1);
}
</script>
