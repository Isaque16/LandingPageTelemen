<template>
  <header class="flex flex-col p-5 w-full h-full" id="cabecalho">
    <NuxtLink to="/">
      <div class="p-2">
        <h1 class="text-4xl md:text-6xl text-center p-2 font-IBM font-bold">
          TELEMENSAGEM <br />
          ROSA DE SAROM
        </h1>
        <p class="text-center text-lg font-playWrite">
          💌 Palavras que viram presentes 🎁
        </p>
      </div>
    </NuxtLink>
  </header>

  <main class="p-5 w-full">
    <section class="flex flex-col my-10">
      <h2
        class="text-center text-4xl my-10 bg-transparent p-3 rounded-3xl font-bold"
      >
        AGENDAMENTO
      </h2>
      <form
        id="form"
        class="flex flex-col gap-2 w-full form-control"
        action="/submit"
        method="post"
      >
        <h2 class="bg-red-600 p-2 rounded-xl w-fit text-2xl font-bold">
          Modelo de mensagem
        </h2>
        <div class="flex flex-row-reverse md:flex-row gap-4 text-xl">
          <div
            class="bg-red-600 p-2 w-fit flex flex-row gap-2 rounded-b-xl rounded-tr-xl items-center"
          >
            <label class="text-2xl label" for="Ao Vivo">
              R$180 | Ao Vivo
            </label>
            <input
              class="radio radio-md"
              type="radio"
              name="modelo"
              value="Ao Vivo"
              v-model="form.modelo"
            />
          </div>
          <div
            class="bg-red-600 p-2 w-fit flex flex-row gap-2 rounded-b-xl rounded-tr-xl items-center"
          >
            <label class="text-2xl label" for="Por Telefone">
              R$20 | Telefone <br />
            </label>
            <input
              class="radio radio-md"
              type="radio"
              name="modelo"
              value="Por Telefone"
              v-model="form.modelo"
            />
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <InputComponent
            forLabel="nome"
            inputTitle="Quem envia"
            inputType="text"
            v-model="form.nome"
            placeholder="Nome(s)"
            autocomplete="name"
            info-message="Preencha com o nome do remetente, que pode ser seu ou de várias pessoas."
            error-message="Informe pelo menos o primeiro nome de quem está enviando!"
          />

          <InputComponent
            forLabel="para"
            inputTitle="Para quem"
            inputType="text"
            v-model="form.para"
            placeholder="Nome da homenagiada(o)"
            info-message="Preencha com o nome da pessoa a ser homenageada."
            error-message="Informe pelo menos o primeiro nome da pessoa que vai receber"
          />

          <InputComponent
            forLabel="hora"
            inputTitle="Horário da mensagem"
            inputType="time"
            v-model="form.hora"
            :min="currentTime"
            info-message="Preencha este campo com a hora em que a mensagem deve ser enviada"
            error-message="É preciso informar o horário de envio da mensagem"
          />

          <InputComponent
            forLabel="data"
            inputTitle="Data de envio"
            inputType="date"
            v-model="form.data"
            :min="currentDate"
            info-message="Preencha a data de envio da mensagem e agende com antecedência."
            error-message="É preciso informar a data de envio da mensagem"
          />

          <div class="flex flex-col p-2">
            <div>
              <label
                class="bg-red-600 p-2 rounded-t-xl w-fit text-2xl font-bold text-center label"
              >
                Ocasião da mensagem
              </label>
            </div>
            <div
              class="bg-red-600 p-2 w-full md:w-1/2 rounded-b-xl rounded-tr-xl"
            >
              <select
                class="px-2 py-1 text-black text-xl rounded-xl w-full md:w-50 select select-bordered"
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
          </div>

          <InputComponent
            forLabel="contato"
            inputTitle="Telefone para contato"
            inputType="text"
            v-model="form.contato"
            placeholder="ex: 68 12345678"
            info-message="Digite seu número de telefone para mantermos contato"
            error-message="Precisamos manter contato! Nos informe seu número"
          />

          <InputComponent
            v-if="form.modelo == 'Por Telefone'"
            forLabel="destinatariotel"
            inputTitle="Número do destinatário"
            inputType="text"
            v-model="form.destinatariotel"
            placeholder="ex: 68 12345678"
            info-message="Digite o número de telefone do homenagiada(o)"
            error-message="Precisamos do contato para o envio da mensagem"
          />

          <InputComponent
            v-if="form.modelo == 'Ao Vivo'"
            forLabel="musica"
            inputTitle="Nome da música"
            inputType="text"
            v-model="form.musica"
            placeholder="ex: Esse cara sou eu - Roberto Carlos"
            info-message="Escreva o nome da música preferida do destinatário, pois ela tocará na chegada ao local."
            error-message="A escolha de uma música de sua preferencia é necessário"
          />

          <div class="flex flex-col p-2">
            <div
              class="bg-red-600 p-4 w-full md:w-1/2 rounded-b-xl rounded-tr-xl"
            >
              <NuxtLink
                :to="`/mensagens/${form.ocasiao}`"
                class="p-2 text-2xl md:text-3xl font-bold hover:cursor-pointer"
                >{{
                  !form.mensagem ? "Escolher mensagem" : "Mensagem escolhida"
                }}: {{ form.mensagem }}
              </NuxtLink>
            </div>
          </div>

          <InputComponent
            v-if="form.modelo == 'Ao Vivo'"
            forLabel="endereco"
            inputTitle="Endereço da comemoração"
            inputType="text"
            v-model="form.endereco"
            placeholder="ex: R. Cumaru, Portal da Amazônia, Rio Branco, Acre"
            info-message="Por último, insira o endereço do local da comemoração."
            error-message="Por favor, digite o endereço da comemoração corretamente"
          />

          <div class="flex flex-col p-2 rounded-xl text-center gap-2">
            <button
              @click.prevent="dialogScreen?.showModal()"
              :disabled="isThereEmptyFields"
              :class="[
                toggleButtonClass,
                'p-2 rounded-xl text-2xl font-workSans w-full md:w-1/2 font-bold btn btn-primary',
              ]"
            >
              {{ agendarBtn }}
            </button>
          </div>
        </div>
      </form>

      <dialog ref="dialogScreen" class="rounded-lg">
        <ConfirmationScreen
          @closeDialog="dialogScreen?.close()"
          @agendarBtnBadRequest="agendarBtn = 'Horário indisponível nessa data'"
        />
      </dialog>
    </section>
  </main>
</template>

<script lang="ts" setup>
// Armazenando variáveis globais com Pinia
const { formData: form } = useUserFormStore();

// Redireciona se já houver agendamento
onBeforeMount(() => {
  if (form.isAgendado) useRouter().replace("/agendado");
});

const currentDate = new Date().toISOString().split("T")[0];
const currentTime = new Date().toISOString().split("T")[1];

// Captura parâmetros da rota para definir o modelo do formulário
const modeloParams = useRoute().query.modelo;
onMounted(() => {
  const modelo = modeloParams?.toString().replace("+", " ");
  if (modelo === "Ao Vivo" || modelo === "Por Telefone") form.modelo = modelo;
});

const agendarBtn = ref("AGENDAR");
const dialogScreen = ref<HTMLDialogElement | null>(null);

// Computados para verificar o preenchimento dos inputs
const formDefaultSet = computed(
  () =>
    !form.nome ||
    !form.para ||
    !form.hora ||
    !form.data ||
    !form.ocasiao ||
    !form.contato ||
    !form.mensagem,
);
const aovivoSet = computed(
  () => form.modelo === "Ao Vivo" && (!form.musica || !form.endereco),
);
const portelefoneSet = computed(
  () => form.modelo === "Por Telefone" && !form.destinatariotel,
);

// Verifica se há campos vazios
const isThereEmptyFields = computed(
  () => formDefaultSet.value || aovivoSet.value || portelefoneSet.value,
);

// Altera a classe do botão com base nos campos preenchidos
const toggleButtonClass = computed(() =>
  isThereEmptyFields.value
    ? "btn-disabled cursor-not-allowed"
    : "bg-red-700 hover:bg-red-600",
);

// Observa o estado do botão de agendar e reseta após 5 segundos
watch(agendarBtn, (newVal) => {
  if (newVal !== "AGENDAR")
    setTimeout(() => (agendarBtn.value = "AGENDAR"), 5000);
});
</script>
