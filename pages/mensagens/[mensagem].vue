<template>
  <main class="bg-transparent text-black text-2xl text-center p-5 h-screen">
    <h1
      class="px-10 py-1 border-black border-2 w-full md:w-1/2 mx-auto rounded-xl bg-slate-100 font-bold"
    >
      {{ ocasiaoMensagem }}
    </h1>

    <div class="flex flex-row justify-center gap-20">
      <h2 
      @click="selectedCategory = 'feminina'"
      :class="[classCategorySelected('feminina'), 'p-2 text-white rounded-bl-xl rounded-br-xl mb-10']">Voz Feminina</h2>
      <h2 
      @click="selectedCategory = 'masculino'"
      :class="[classCategorySelected('masculino'), 'p-2 text-white rounded-bl-xl rounded-br-xl mb-10']">Voz Masculina</h2>
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
        <p class="text-3xl p-2 bg-red-600">{{ dialogTitle }}</p>
        <VueSound 
        :controller="controlPlayer"
        :file="dialogAudio" 
        />
      </div>

      <div class="flex flex-col p-5 md:flex-row justify-center gap-10">
        <button
          class="bg-red-700 hover:vermelho px-5 py-1 rounded-2xl text-white text-2xl"
          @click="otherMensagem"
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

const ocasiaoMensagem = useRoute().params.mensagem;

const selectedCategory = ref<string>('feminina');
const getMensagens = computed(() => {
  const categoria = mensagens[ocasiaoMensagem as keyof typeof mensagens]; // Verifica se a ocasião existe dentro de mensagens

  if (!categoria) return []; // Se a categoria for indefinida, retorna um array vazio para evitar erro

  let mensagem = categoria[selectedCategory.value as keyof typeof categoria]; // Tenta acessar a categoria selecionada

  // Verifica se a mensagem atual é indefinida ou um array vazio
  if (!mensagem || mensagem == undefined || mensagem.length === 0) {
    // Alterna o valor de selectedCategory para verificar a outra opção
    const novaCategoria = selectedCategory.value == 'feminina' ? 'masculino' : 'feminina';
    const novaMensagem = categoria[novaCategoria as keyof typeof categoria];

    // Verifica se a nova categoria tem conteúdo, senão mantém vazio
    if (novaMensagem && novaMensagem.length > 0) {
      // Se a nova categoria for válida, atualiza o selectedCategory e retorna a mensagem
      selectedCategory.value = novaCategoria;
      mensagem = novaMensagem;
    }
  }

  return mensagem ? mensagem : []; // Retorna a mensagem se ela existir, ou um array vazio se não existir
});

const isCategorySelected = (category: string): boolean => selectedCategory.value === category;
const classCategorySelected = (category: string): string => {
  const categoria = mensagens[ocasiaoMensagem as keyof typeof mensagens];
  const mensagem = categoria[selectedCategory.value as keyof typeof categoria];

  // Verifica se a categoria existe e se a mensagem é um array vazio
  if (mensagem && mensagem.length === 0) 
    return 'bg-gray-500 opacity-70 cursor-not-allowed';

  // Verifica se a categoria está selecionada
  if (isCategorySelected(category)) 
    return 'bg-red-600 hover:bg-red-700 cursor-pointer';
  return 'bg-red-700 hover:bg-red-600 cursor-pointer'; // Classe padrão
};
  
const dialogScreen = ref<HTMLDialogElement>();
const dialogTitle = ref<string>("");
const dialogAudio = ref<string>("");
const controlPlayer = ref<boolean>(false);
const setDialog = (title: string, audioPath: string): void => {
  dialogAudio.value = `/aniversarios/${ audioPath }`;
  dialogTitle.value = title;
  dialogScreen.value?.showModal();
  controlPlayer.value = true; // Bota a música pra toca
}

const otherMensagem = () => {
  controlPlayer.value = false; // Para a música
  dialogScreen.value?.close()
}

const sendSelectedMensagem = () => {
  userFormStore().formData.mensagem = dialogTitle.value;
  useRouter().go(-1);
};
</script>
