<template>
  <main
    class="bg-transparent text-black text-2xl text-center p-5 h-full md:h-screen"
  >
    <NuxtLink class="flex justify-start p-5" to="/agendamento">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        width="50"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
        />
      </svg>
    </NuxtLink>
    <div
      class="text-2xl md:text-3xl px-10 py-1 border-black border-2 w-full md:w-1/2 mx-auto rounded-xl bg-slate-100 font-bold"
    >
      <select
          class="px-2 py-1 text-black text-center text-xl bg-transparent border-none rounded-xl w-full"
          v-model="form.ocasiao"
      >
        <optgroup label="Aniversário">
          <option value="Aniversário de Mãe">Aniversário de Mãe</option>
          <option value="Aniversário de Pai">Aniversário de Pai</option>
          <option value="Aniversário de Irmã">
            Aniversário de Irmã
          </option>
          <option value="Aniversário de Irmão">
            Aniversário de Irmão
          </option>
          <option value="Aniversário de Filha">
            Aniversário de Filha
          </option>
          <option value="Aniversário de Filho">
            Aniversário de Filho
          </option>
          <option value="Aniversário de Namorada">
            Aniversário de Namorada
          </option>
          <option value="Aniversário de Namorado">
            Aniversário de Namorado
          </option>
          <option value="Aniversário de Esposo">
            Aniversário de Esposo
          </option>
          <option value="Aniversário de Esposa">
            Aniversário de Esposa
          </option>
          <option value="Aniversário de Sogra">
            Aniversário de Sogra
          </option>
          <option value="Aniversário de Cunhada">
            Aniversário de Cunhada
          </option>
          <option value="Aniversário de Cunhado">
            Aniversário de Cunhado
          </option>
          <option value="Aniversário de Amiga">
            Aniversário de Amiga
          </option>
          <option value="Aniversário de Amigo">
            Aniversário de Amigo
          </option>
        </optgroup>
      </select>
    </div>
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
        class="bg-gray-100 w-2/3 flex flex-row items-center justify-between text-black text-center rounded-2xl border-black border-2 m-10"
        v-for="(mensagem, index) in getMensagens"
        :key="index"
      >
        <p class="text-xl pl-5">
          {{ mensagem.name }}
        </p>
        <button
          class="dark-red hover:light-red px-5 py-1 rounded-tr-xl rounded-br-xl text-white text-xl text-center h-full ml-5 btn btn-error"
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
        <p class="text-3xl p-2 light-red box-content font-bold">
          {{ dialogTitle }}
        </p>
        <VueSound :controller="controlPlayer" :file="dialogAudio" />
      </div>

      <div class="flex flex-col p-5 md:flex-row justify-center gap-10">
        <button
          class="dark-red hover:light-red px-5 py-1 rounded-2xl text-white text-2xl btn btn-secondary"
          @click="otherMensagem"
        >
          Outro
        </button>
        <button
          class="dark-red hover:light-red px-5 py-1 rounded-2xl text-white text-2xl btn btn-primary"
          @click="sendSelectedMensagem"
        >
          Selecionar
        </button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import mensagens from "@/server/database/mensagens.json";

const { formData: form } = useUserFormStore();

// Definição do tipo de categoria
type CategoriaType = "feminina" | "masculino";
const selectedCategory = ref<CategoriaType>("feminina");

// Obtenção da mensagem baseada na ocasião
const mensagem = ref<any>(mensagens[form.ocasiao as keyof typeof mensagens]);

// Computado que retorna as mensagens filtradas pela categoria selecionada
const getMensagens = computed(() => {
  if (!mensagem.value.feminina.length) selectedCategory.value = "masculino";
  else if (!mensagem.value.masculino.length) selectedCategory.value = "feminina";
  return mensagem.value[selectedCategory.value];
});

// Função para determinar a classe da categoria selecionada
const classCategorySelected = (category: CategoriaType): string => {
  if (selectedCategory.value !== category && !mensagem.value[category].length)
    return "bg-gray-500 opacity-70 cursor-not-allowed"; // Categoria indisponível

  return selectedCategory.value === category
    ? "light-red hover:dark-red cursor-pointer" // Categoria selecionada
    : "dark-red hover:light-red cursor-pointer"; // Classe padrão
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
  useUserFormStore().formData.mensagem = dialogTitle.value;
  useRouter().go(-1);
};

watch(() => form.ocasiao, (novaOcasiao) => {
  mensagem.value = mensagens[novaOcasiao as keyof typeof mensagens];
});
</script>
