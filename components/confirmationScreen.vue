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
        @click.prevent="handleAgendamento()"
        class="p-2 bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer text-2xl font-workSans w-1/2"
      >
        {{ confirmBtn }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userFormStore } from "~/store/userFormStore";

const emit = defineEmits(["closeDialog", "agendarBtnBadRequest"]);

// Input refs
const props = defineProps<{
  propModelo: string;
  propNome: string;
  propPara: string;
  propHora: string;
  propData: string;
  propOcasiao: string;
  propContato: string;
  propDestinatariotel: string;
  propMensagem: string;
  propMusica: string;
  propEndereco: string;
}>();

// Computed para mostrar apenas dados que satisfazem a condição do inputRadio
const showContent = computed(() => {
  let content = [
    { contentTitle: "Modelo de Mensagem", data: props.propModelo },
    { contentTitle: "Nome de Quem Envia", data: props.propNome },
    { contentTitle: "Nome de Quem Receberá", data: props.propPara },
    { contentTitle: "Horário da Mensagem", data: props.propHora },
    { contentTitle: "Data da Mensagem", data: props.propData },
    { contentTitle: "Ocasião da Mensagem", data: props.propOcasiao },
    { contentTitle: "Telefone para Contato", data: props.propContato },
    { contentTitle: "Mensagem", data: props.propMensagem }
  ];

  const variableItems = []; // Adicionar itens variáveis com base no valor de propModelo

  if (props.propModelo === "Ao Vivo") {
    variableItems.push(
      { contentTitle: "Música para chegar tocando", data: props.propMusica },
      { contentTitle: "Endereço da Comemoração", data: props.propEndereco }
    );
  } else if (props.propModelo === "Por Telefone") {
    variableItems.push(
      { contentTitle: "Telefone do Destinatário", data: props.propDestinatariotel },
    );
  }
  // Retornar a combinação dos itens fixos e variáveis
  return [...content, ...variableItems];
});

const confirmBtn = ref<string>("Confirmar");

async function handlePayment(): Promise<void> {
  const { stripe } = useClientStripe(); // Obtém a instância do Stripe uma vez
  if (stripe.value != undefined) {
    try {
      // Chama a API para criar a sessão de checkout
      const response = await $fetch<{ id: string, error?: string }>('/api/processPayment', { method: 'POST' });

      // Verifica se há erro no retorno da API
      if (response.error) {
        console.error('Erro ao criar sessão de checkout:', response.error);
        return;
      }

      // Redireciona para o checkout usando o ID da sessão retornado pelo backend
      const { error: redirectError } = await stripe.value.redirectToCheckout({ sessionId: response.id });

      if (redirectError) {
        console.error('Erro ao redirecionar para o checkout:', redirectError.message);
        return;
      }
      // Outros códigos aqui, se necessário
    } catch (error) {
      console.error('Erro ao iniciar o pagamento:', error);
      return;
    }
  } else throw new Error("Stripe não está definido");
}

async function handleSendFormData() {
  // Envia os dados para a url da rota POST
  try {
    confirmBtn.value = "Agendando..."; // Envia feedback para o usuário de espera
    const result = showContent.value.reduce((acc: any, item: any) => {
      acc[item.contentTitle] = item.data; // Atualiza o acumulador
      return acc; // Retorna o acumulador atualizado
    }, {}); // Inicializa o acumulador como um objeto vazio

    await $fetch("/api/submitData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    localStorage.setItem("agendado", JSON.stringify(true));
    userFormStore().formData.isAgendado = true;
  } catch (error) {
    // Caso ocorra um erro, mostra no botão do formulário
    emit("agendarBtnBadRequest");
    console.error("Houve um erro ao enviar os dados: ", error);
  } finally {
    // Qualquer que seja o resultado fecha a tela de confirmação
    emit("closeDialog");
    confirmBtn.value = "Confirmar";
  }
}

// Agendamento
function handleAgendamento(): void {
  // Se o modelo for "Por Telefone", o pagamento deve ser realizado
  if (props.propModelo === "Por Telefone") 
    handlePayment();
  handleSendFormData();
}
</script>
