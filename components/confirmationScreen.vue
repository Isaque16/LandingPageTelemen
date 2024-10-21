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
import { loadStripe } from "@stripe/stripe-js";

const emit = defineEmits(["closeDialog", "agendarBtnBadRequest"]);

const { formData: form } = userFormStore();
const { showContent } = userFormStore();

async function handlePayment(): Promise<void> {
  confirmBtn.value = "Redirecionando para o pagamento...";
  const stripe = await loadStripe(
    "pk_test_51Q5rVPDzbkNorRzPt6RffYvbkjvnrzMeevSBWoi2yDEyRPzRK9e2wyAbjVa0fLFyahW3ZPpHaLjUkLLwSs1d3GY000226hO4MV",
  );
  try {
    // Chama a API para criar a sessão de checkout
    const { id, error } = await $fetch<{ id: string; error?: string }>(
      "/api/processPayment",
      { method: "GET" },
    );
    // Verifica se há erro no retorno da API
    if (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      return;
    }

    // Redireciona para o checkout usando o ID da sessão retornado pelo backend
    const { error: redirectError } = await stripe!.redirectToCheckout({
      sessionId: id,
    });

    if (redirectError) {
      console.error(
        "Erro ao redirecionar para o checkout:",
        redirectError.message,
      );
      return;
    }
  } catch (error) {
    console.error("Erro ao iniciar o pagamento:", error);
    return;
  }
}

const confirmBtn = ref<string>("Confirmar");
async function handleSendFormData(): Promise<void> {
  const result = showContent.reduce((acc: any, item: any) => {
    acc[item.contentTitle] = item.data; // Atualiza o acumulador
    return acc; // Retorna o acumulador atualizado
  }, {}); // Inicializa o acumulador como um objeto vazio
  try {
    confirmBtn.value = "Agendando...";
    await $fetch("/api/submitData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    form.isAgendado = true;
    useRouter().replace("/agendado");
  } catch (error) {
    emit("agendarBtnBadRequest");
    console.error("Houve um erro ao enviar os dados: ", error);
  } finally {
    emit("closeDialog");
    confirmBtn.value = "Confirmar";
  }
}

async function handleVerifyClone(): Promise<void> {
  const result = showContent.reduce((acc: any, item: any) => {
    acc[item.contentTitle] = item.data; // Atualiza o acumulador
    return acc; // Retorna o acumulador atualizado
  }, {}); // Inicializa o acumulador como um objeto vazio
  try {
    confirmBtn.value = "Verificando...";
    await $fetch("/api/middleware/verifyClone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
  } catch (error) {
    emit("agendarBtnBadRequest");
    console.error("Houve um erro ao enviar os dados: ", error);
  }
}

// Agendamento
async function handleAgendamento(): Promise<void> {
  if (form.modelo == "Por Telefone") {
    await handleVerifyClone();
    return handlePayment();
  }
  return await handleSendFormData();
}
</script>
