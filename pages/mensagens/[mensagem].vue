<template>
  <main class="bg-transparent text-black text-2xl text-center p-5 h-screen">
    <h1
      class="px-10 py-1 border-black border-2 w-1/2 mx-auto rounded-xl bg-slate-100 font-bold"
    >
      {{ $route.params.mensagem }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3">
      <div
        class="bg-gray-100 flex flex-col justify-center text-black p-5 text-center rounded-xl border-black border-2 m-10"
      >
        <p class="text-xl pb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        <button
          class="bg-red-700 hover:vermelho px-5 py-1 rounded-2xl text-white text-xl text-center w-fit self-center"
          @click="openDialog"
        >
          Ouvir
        </button>
      </div>
    </div>
  </main>

  <dialog
    class="bg-zinc-100 text-black text-2xl w-fit h-fit flex justify-center rounded-2xl"
    ref="dialogScreen"
  >
    <div
      class="bg-white text-black p-5 text-center rounded-xl w-1/2 border-black border-2 m-10"
    >
      <p class="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing</p>
      <p class="py-5">audio</p>
      <div class="flex flex-row justify-between">
        <button
          class="bg-red-700 hover:vermelho px-5 py-1 rounded-2xl text-white text-xl"
          @click="closeDialog"
        >
          Outro
        </button>
        <button
          class="bg-red-700 hover:vermelho px-5 py-1 rounded-2xl text-white text-xl"
        >
          Selecionar
        </button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const dialogScreen = ref<HTMLDialogElement | null>();
const openDialog = () => dialogScreen.value?.showModal();
const closeDialog = () => dialogScreen.value?.close();
</script>
