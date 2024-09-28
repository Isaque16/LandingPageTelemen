<template>
  <div
    class="bg-red-600 p-4 rounded-lg shadow-lg max-w-full max-h-full backdrop:bg-black text-white"
  >
    <h1 class="text-2xl text-center p-2 font-bold">
      Confime suas informações antes de enviar
    </h1>
    <div
      class="bg-white p-5 rounded-lg text-black text-2xl text-center flex flex-col gap-5 overflow-y-auto max-h-[70vh]"
    >
      <div v-for="(content, index) in showContent" :key="index">
        <p class="text-2xl">{{ content.contentTitle }}</p>
        <span class="font-bold text-black">{{ content.data }}</span>
      </div>
    </div>
    <div class="flex flex-row p-2 rounded-xl gap-2">
      <button
        @click="emit('closeDialog')"
        class="p-2 bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer text-2xl font-workSans w-1/2"
      >
        Cancelar
      </button>
      <button
        @click.prevent="handleAgendar()"
        class="p-2 bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer text-2xl font-workSans w-1/2"
      >
        {{ confirmBtn }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useFetch } from "#app";

const emit = defineEmits([
  "closeDialog",
  "agendarBtnBadRequest",
  "agendadoResponse",
]);

// Input refs
const props = defineProps({
  propInputRadio: String,
  propNome: String,
  propPara: String,
  propHora: String,
  propData: String,
  propOcasiao: String,
  propContato: String,
  propDestinatariotel: String,
  propMensagem: String,
  propMusica: String,
  propEndereco: String,
});

// Computed para mostrar apenas dados que satisfazem a condição do inputRadio
const showContent = computed(() => {
  let content = [
    { contentTitle: "Modelo de Mensagem", data: props.propInputRadio },
    { contentTitle: "Nome de Quem Envia", data: props.propNome },
    { contentTitle: "Nome de Quem Receberá", data: props.propPara },
    { contentTitle: "Horário da Mensagem", data: props.propHora },
    { contentTitle: "Data da Mensagem", data: props.propData },
    { contentTitle: "Ocasião da Mensagem", data: props.propOcasiao },
    { contentTitle: "Telefone para Contato", data: props.propContato },
  ];

  const variableItems = []; // Adicionar itens variáveis com base no valor de propInputRadio

  if (props.propInputRadio === "Ao Vivo") {
    variableItems.push(
      { contentTitle: "Música para chegar tocando", data: props.propMusica },
      { contentTitle: "Endereço da Comemoração", data: props.propEndereco },
    );
  } else if (props.propInputRadio === "Por Telefone") {
    variableItems.push(
      {
        contentTitle: "Telefone do Destinatário",
        data: props.propDestinatariotel,
      },
      { contentTitle: "Mensagem", data: props.propMensagem },
    );
  }

  // Retornar a combinação dos itens fixos e variáveis
  return [...content, ...variableItems];
});

// Agendamento
const confirmBtn = ref<string>("Confirmar");
async function handleAgendar() {
  const result = showContent.value.reduce((acc: any, item: any) => {
    acc[item.contentTitle] = item.data; // Atualiza o acumulador
    return acc; // Retorna o acumulador atualizado
  }, {}); // Inicializa o acumulador como um objeto vazio

  confirmBtn.value = "Agendando..."; // Envia feedback para o usuário de espera

  // Primeiro tenta enviar os dados para a url da rota POST
  try {
    await $fetch("/api/submitData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    emit("agendadoResponse", true);
  } catch (error) {
    // Caso ocorra um erro, mostra no botão do formulário
    emit("agendarBtnBadRequest");
    console.error("Houve um erro ao enviar os dados: ", error);
    confirmBtn.value = "Confirmar";
  } finally {
    // Qualquer que seja o resultado fecha a tela de confirmação
    emit("closeDialog");
  }
}
</script>
