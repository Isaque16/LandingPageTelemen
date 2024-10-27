<template>
  <main class="bg-transparent text-black text-2xl text-center p-5 h-screen">
    <h1
      class="text-2xl md:text-3xl px-10 py-1 border-black border-2 w-full md:w-1/2 mx-auto rounded-xl bg-slate-100 font-bold"
    >
      {{ ocasiaoMensagem }}
    </h1>

    <div class="flex flex-row justify-center gap-20">
      <button
        @click="selectedCategory = 'feminina'"
        :class="[
          classCategorySelected('feminina'),
          'p-2 text-white rounded-bl-xl rounded-br-xl mb-10',
        ]"
      >
        Voz Feminina
      </button>
      <button
        @click="selectedCategory = 'masculino'"
        :class="[
          classCategorySelected('masculino'),
          'p-2 text-white rounded-bl-xl rounded-br-xl mb-10',
        ]"
      >
        Voz Masculina
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3">
      <div
        class="bg-gray-100 w-fit flex flex-row items-center justify-between text-black text-center rounded-2xl border-black border-2 m-10"
        v-for="(mensagem, index) in getMensagens"
        :key="index"
      >
        <p class="text-xl pl-5">
          {{ mensagem.name }}
        </p>
        <button
          class="bg-red-700 hover:bg-red-600 px-5 py-1 rounded-tr-xl rounded-br-xl text-white text-xl text-center h-full ml-5"
          @click="setDialog(mensagem.name, mensagem.path)"
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
      <div class="flex flex-col gap-5">
        <p class="text-3xl p-2 bg-red-600 box-content font-bold">{{ dialogTitle }}</p>
        <VueSound :controller="controlPlayer" :file="dialogAudio" />
      </div>

      <div class="flex flex-col p-5 md:flex-row justify-center gap-10">
        <button
          class="bg-red-700 hover:bg-red-600 px-5 py-1 rounded-2xl text-white text-2xl btn btn-secondary"
          @click="otherMensagem"
        >
          Outro
        </button>
        <button
          class="bg-red-700 hover:bg-red-600 px-5 py-1 rounded-2xl text-white text-2xl btn btn-primary"
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
const ocasiaoMensagem = useRoute().params.mensagem;

// Definição do tipo de categoria
type CategoriaType = "feminina" | "masculino";
const selectedCategory = ref<CategoriaType>("feminina");

// Obtenção da mensagem baseada na ocasião
const mensagem = mensagens[ocasiaoMensagem as keyof typeof mensagens];

// Computado que retorna as mensagens filtradas pela categoria selecionada
const getMensagens = computed(() => {
  if (!mensagem.feminina.length) selectedCategory.value = "masculino";
  else if (!mensagem.masculino.length) selectedCategory.value = "feminina";
  return mensagem[selectedCategory.value];
});

// Função para determinar a classe da categoria selecionada
const classCategorySelected = (category: CategoriaType): string => {
  if (selectedCategory.value !== category && !mensagem[category].length)
    return "bg-gray-500 opacity-70 cursor-not-allowed"; // Categoria indisponível

  return selectedCategory.value === category
    ? "bg-red-600 hover:bg-red-700 cursor-pointer" // Categoria selecionada
    : "bg-red-700 hover:bg-red-600 cursor-pointer"; // Classe padrão
};

// Controle do diálogo de exibição da mensagem e do player de áudio
const dialogScreen = ref<HTMLDialogElement | null>(null);
const dialogTitle = ref<string>("");
const dialogAudio = ref<string>("");
const controlPlayer = ref<boolean>(false);

// Exibe o diálogo com o título e caminho do áudio
const setDialog = (title: string, audioPath: string): void => {
  dialogAudio.value = `/aniversarios/${audioPath}`;
  dialogTitle.value = title;
  dialogScreen.value?.showModal();
  controlPlayer.value = true; // Toca o áudio
};

// Fecha o diálogo e para o player
const otherMensagem = (): void => {
  controlPlayer.value = false; // Para a música
  dialogScreen.value?.close();
};

// Envia a mensagem selecionada e navega de volta
const sendSelectedMensagem = (): void => {
  userFormStore().formData.mensagem = dialogTitle.value;
  useRouter().go(-1);
};
</script>
