<template>
  <div
    class="light-red p-4 rounded-lg shadow-lg max-w-screen max-h-screen backdrop:bg-black text-white"
  >
    <h1 class="text-2xl text-center p-2 font-bold text-primary">
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
        class="p-2 light-red hover:dark-red rounded-xl cursor-pointer text-2xl font-workSans w-1/2 btn btn-secondary"
      >
        Cancelar
      </button>
      <button
        @click.prevent="handleAgendamento()"
        class="p-2 light-red hover:dark-red rounded-xl cursor-pointer text-2xl font-workSans w-1/2 btn btn-primary"
      >
        {{ confirmBtn }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { loadStripe } from "@stripe/stripe-js";

// Emissões do componente
const emit = defineEmits(["closeDialog", "agendarBtnBadRequest"]);

// Estado do formulário e dados
const { formData: form, showContent } = useUserFormStore();
const confirmBtn = ref<string>("Confirmar");

// Preparação de dados do formulário
const result = showContent.reduce((acc: Record<string, string>, item: any) => {
  acc[item.contentTitle] = item.data;
  return acc;
}, {});

// Função para redirecionar ao pagamento via Stripe
async function handlePayment(): Promise<void> {
  confirmBtn.value = "Redirecionando para o pagamento...";

  try {
    const stripe = await loadStripe(
      "pk_live_51Q5rVPDzbkNorRzP4U6Wk6Nm64Own1aSvOuquQyPJmoa6MDtyilvUb6fHlDO3mFMqjnbGshwASBNUYe9tEkatwT500KwAjMJPl",
    );

    const { id, error } = await $fetch<{ id: string; error?: string }>(
      "/api/processPayment",
      { method: "GET" },
    );
    if (error) throw new Error(`Erro ao criar sessão de checkout: ${error}`);

    const { error: redirectError } = await stripe!.redirectToCheckout({
      sessionId: id,
    });
    if (redirectError)
      throw new Error(`Erro ao redirecionar: ${redirectError.message}`);
  } catch (error) {
    console.error("Houve um erro ao tentar carregar o pagamento: ", error);
  }
}

// Função para envio de dados do formulário
async function handleSendFormData(): Promise<void> {
  confirmBtn.value = "Agendando...";

  try {
    await $fetch("/api/submitData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    form.isAgendado = true;
    useRouter().replace("/agendado");
  } catch (error) {
    emit("agendarBtnBadRequest");
    console.error("Erro ao enviar dados: ", error);
  } finally {
    emit("closeDialog");
    confirmBtn.value = "Confirmar";
  }
}

// Verificação de clonagem
async function handleVerifyClone(): Promise<void> {
  confirmBtn.value = "Verificando...";

  try {
    await $fetch("/api/middleware/verifyClone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
  } catch (error) {
    emit("agendarBtnBadRequest");
    console.error("Erro ao verificar clone: ", error);
  }
}

// Função principal de agendamento
async function handleAgendamento(): Promise<void> {
  if (form.modelo === "Por Telefone") {
    await handleVerifyClone();
    await handlePayment();
  } else await handleSendFormData();
}
</script>
