<template>
  <main class="bg-transparent text-black text-2xl text-center p-5">
    <h1
      class="px-10 py-1 border-black border-2 w-full md:w-1/2 mx-auto rounded-xl bg-slate-100 font-bold"
    >
      {{ $route.params.mensagem }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3">
      <div
        class="bg-gray-100 flex flex-row items-center justify-between text-black text-center rounded-2xl border-black border-2 m-10"
        v-for="(mensagem, index) of mensagens"
        :key="index"
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
    class="bg-transparent text-2xl w-full md:w-1/2 h-1/2 rounded-2xl"
    ref="dialogScreen"
  >
    <div
      class="bg-white text-white text-center flex flex-col justify-center rounded-xl w-full border-black border-2"
    >
      <p class="text-3xl p-2 bg-red-600">{{ dialogTitle }}</p>
      <vue-sound
        :title="dialogTitle"
        file="dasd"
      ></vue-sound>

      <div class="flex flex-col py-5 md:flex-row justify-center gap-10">
        <button
          class="bg-red-700 hover:vermelho px-5 py-1 rounded-2xl text-white text-2xl"
          @click="dialogScreen?.close()"
        >
          Outro
        </button>
        <button
          class="bg-red-700 hover:vermelho px-5 py-1 rounded-2xl text-white text-2xl"
          @click="sendSelectedMensagem"
        >
          Selecionar
        </button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import mensagens from "../../server/database/mensagens.json";
import { useFormStore } from "~/store/userFormStore";

const dialogScreen = ref<HTMLDialogElement>();
const dialogTitle = ref<string>("");
const setDialog = (title: string) => {
  dialogTitle.value = title;
  dialogScreen.value?.showModal();
};

const sendSelectedMensagem = () => {
  useFormStore().formData.mensagem = dialogTitle.value;
  useRouter().go(-1);
};
</script>
