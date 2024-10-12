<template>
  <header class="flex flex-col p-5 w-full h-full" id="cabecalho">
    <nuxt-link to="/">
      <div class="p-2">
        <h1 class="text-4xl md:text-6xl text-center p-2 font-IBM font-bold">
          TELEMENSAGEM <br />
          ROSA DE SAROM
        </h1>
        <p class="text-center text-lg font-playWrite">
          💌 Palavras que viram presentes 🎁
        </p>
      </div>
    </nuxt-link>
  </header>
  <hr />

  <main class="p-5 w-full">
    <section class="flex flex-col my-10">
      <h2
        class="text-center text-4xl my-10 bg-transparent p-3 rounded-3xl font-bold"
      >
        AGENDAMENTO
      </h2>
      <form
        id="form"
        class="flex flex-col gap-2 w-full"
        action="/submit"
        method="post"
      >
        <h2 class="bg-red-600 p-2 rounded-xl w-fit text-2xl font-bold">
          Modelo de mensagem
        </h2>
        <div class="flex flex-row-reverse md:flex-row gap-4 text-xl">
          <div
            class="bg-red-600 p-2 w-fit flex flex-row gap-2 rounded-b-xl rounded-tr-xl"
          >
            <label class="text-2xl" for="Ao Vivo"> R$180 | Ao Vivo </label>
            <input
              type="radio"
              name="modelo"
              value="Ao Vivo"
              v-model="form.modelo"
              @change="updateForm"
            />
          </div>
          <div
            class="bg-red-600 p-2 w-fit flex flex-row gap-2 rounded-b-xl rounded-tr-xl"
          >
            <label class="text-2xl" for="Por Telefone">
              R$20 | Telefone <br />
            </label>
            <input
              type="radio"
              name="modelo"
              value="Por Telefone"
              v-model="form.modelo"
              @change="updateForm"
            />
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <input-component
            forLabel="nome"
            inputTitle="Quem envia"
            inputType="text"
            v-model="form.nome"
            placeholder="Nome(s)"
            autocomplete="name"
            info-message="Preencha com o nome do remetente, que pode ser seu ou de várias pessoas."
            error-message="Informe pelo menos o primeiro nome de quem está enviando!"
          ></input-component>

          <input-component
            forLabel="para"
            inputTitle="Para quem"
            inputType="text"
            v-model="form.para"
            placeholder="Nome da homenagiada(o)"
            info-message="Preencha com o nome da pessoa a ser homenageada."
            error-message="Informe pelo menos o primeiro nome da pessoa que vai receber"
          ></input-component>

          <input-component
            forLabel="hora"
            inputTitle="Horário da mensagem"
            inputType="time"
            v-model="form.hora"
            info-message="Preencha este campo com a hora em que a mensagem deve ser enviada"
            error-message="É preciso informar o horário de envio da mensagem"
          ></input-component>

          <input-component
            forLabel="data"
            inputTitle="Data de envio"
            inputType="date"
            v-model="form.data"
            info-message="Preencha a data de envio da mensagem e agende com antecedência."
            error-message="É preciso informar a data de envio da mensagem"
          ></input-component>

          <div class="flex flex-col p-2">
            <div>
              <label
                class="bg-red-600 p-2 rounded-t-xl w-fit text-2xl font-bold text-center"
              >
                Ocasião da mensagem
              </label>
            </div>
            <div
              class="bg-red-600 p-2 w-full md:w-1/2 rounded-b-xl rounded-tr-xl"
            >
              <select
                class="px-2 py-1 text-black text-xl rounded-xl w-full md:w-50"
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
                  <option value="Aniversário de Namorda">
                    Aniversário de Namorada
                  </option>
                  <option value="Aniversário de Namorado">
                    Aniversário de Namorado
                  </option>
                  <option value="Aniversário de Noiva">
                    Aniversário de Noiva
                  </option>
                  <option value="Aniversário de Noivo">
                    Aniversário de Noivo
                  </option>
                  <option value="Aniversário de Marido">
                    Aniversário de Marido
                  </option>
                  <option value="Aniversário de Esposa">
                    Aniversário de Esposa
                  </option>
                  <option value="Aniversário de Sogra">
                    Aniversário de Sogra
                  </option>
                  <option value="Aniversário de Sogro">
                    Aniversário de Sogro
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
                <optgroup label="Datas comemorativas">
                  <option value="Dia das Mães">Dia das Mães</option>
                  <option value="Dia dos Pais">Dia dos Pais</option>
                  <option value="Dia dos Namorados">Dia dos Namorados</option>
                  <option value="Dia da Mulher">Dia da Mulher</option>
                  <option value="Natal">Natal</option>
                  <option value="Ano Novo">Ano Novo</option>
                </optgroup>
              </select>
            </div>
          </div>

          <input-component
            forLabel="contato"
            inputTitle="Telefone para contato"
            inputType="text"
            v-model="form.contato"
            placeholder="ex: 68 12345678"
            info-message="Digite seu número de telefone para mantermos contato"
            error-message="Precisamos manter contato! Nos informe seu número"
          ></input-component>

          <input-component
            v-if="form.modelo == 'Por Telefone'"
            forLabel="destinatariotel"
            inputTitle="Número do destinatário"
            inputType="text"
            v-model="form.destinatariotel"
            placeholder="ex: 68 12345678"
            info-message="Digite o número de telefone do homenagiada(o)"
            error-message="Precisamos do contato para o envio da mensagem"
          ></input-component>

          <input-component
            v-if="form.modelo == 'Ao Vivo'"
            forLabel="musica"
            inputTitle="Nome da música"
            inputType="text"
            v-model="form.musica"
            placeholder="ex: Esse cara sou eu - Roberto Carlos"
            info-message="Escreva o nome da música preferida do destinatário, pois ela tocará na chegada ao local."
            error-message="A escolha de uma música de sua preferencia é necessário"
          ></input-component>

          <div class="flex flex-col p-2">
            <div
              class="bg-red-600 p-4 w-full md:w-1/2 rounded-b-xl rounded-tr-xl"
            >
              <nuxt-link
                :to="`/mensagens/${form.ocasiao}`"
                class="p-2 text-2xl font-bold hover:cursor-pointer"
                >Escolher mensagem: {{ form.mensagem }}</nuxt-link
              >
            </div>
          </div>

          <input-component
            v-if="form.modelo == 'Ao Vivo'"
            forLabel="endereco"
            inputTitle="Endereço da comemoração"
            inputType="text"
            v-model="form.endereco"
            placeholder="ex: R. Cumaru, Portal da Amazônia, Rio Branco, Acre"
            info-message="Por último, insira o endereço do local da comemoração."
            error-message="Por favor, digite o endereço da comemoração corretamente"
          ></input-component>

          <div class="flex flex-col p-2 rounded-xl text-center gap-2">
            <button
              @click.prevent="dialogScreen?.showModal()"
              :disabled="isThereEmptyFields"
              :class="`${toggleButtonClass} p-2 rounded-xl text-2xl font-workSans w-full md:w-1/2 font-bold`"
            >
              {{ agendarBtn }}
            </button>
          </div>
        </div>
      </form>

      <dialog ref="dialogScreen" class="rounded-lg">
        <confirmation-screen
          @closeDialog="dialogScreen?.close()"
          @agendarBtnBadRequest="agendarBtn = 'Horário indisponível nessa data'"
          :prop-modelo="form.modelo"
          :prop-nome="form.nome"
          :prop-para="form.para"
          :prop-hora="form.hora"
          :prop-data="form.data.split('-').reverse().join('/')"
          :prop-ocasiao="form.ocasiao"
          :prop-contato="form.contato"
          :prop-endereco="form.endereco"
          :prop-musica="form.musica"
          :prop-destinatariotel="form.destinatariotel"
          :prop-mensagem="form.mensagem"
        ></confirmation-screen>
      </dialog>
    </section>
  </main>
</template>

<script lang="ts" setup>
// Verifica se já houve agendamento ou não ao acessar a página
onBeforeMount(() => {
  const isAgendadoActive = localStorage.getItem("agendado");
  if (isAgendadoActive === null)
    return localStorage.setItem("agendado", JSON.stringify(false));
  else {
    const isAgendado = computed(() => JSON.parse(isAgendadoActive));
    if (isAgendado.value) {
      form.isAgendado = isAgendado.value;
      useRouter().replace("/agendado");
    }
  }
});

// Armazenando variáveis globais com Pinia
import { userFormStore } from "~/store/userFormStore";
const form = userFormStore().formData;

const modeloParams = useRoute().query.modelo; // Muda os inputs mostrados no form de acordo com o radio
// Verifica a query do header quando a página é carregada
onMounted(() => {
  if (modeloParams === "Ao Vivo" || modeloParams === "Ao+Vivo")
    form.modelo = "Ao Vivo";
  else if (modeloParams === "Por Telefone" || modeloParams === "Por+Telefone")
    form.modelo = "Por Telefone";
});

const updateForm = () => form.modelo; // Altera o valor do formulário quando alterado

const agendarBtn = ref("AGENDAR");
const dialogScreen = ref<HTMLDialogElement | null>();

// Lógica da verificação do preenchimento dos inputs
const formDefaultSet = computed(
  () =>
    !form.nome ||
    !form.para ||
    !form.hora ||
    !form.data ||
    !form.ocasiao ||
    !form.contato || 
    !form.mensagem
);
const aovivoSet = computed(
  () => form.modelo === "Ao Vivo" && (!form.musica || !form.endereco)
);
const portelefoneSet = computed(
  () =>
    form.modelo === "Por Telefone" && (!form.destinatariotel)
);
// Lógica de verificação: será falso se qualquer um deles for falso
const isThereEmptyFields = computed(
  () => formDefaultSet.value || aovivoSet.value || portelefoneSet.value
);
// Verifica se há algum campo não preenchido
const toggleButtonClass = computed(() => {
  if (isThereEmptyFields.value)
    return "bg-gray-500 opacity-70 cursor-not-allowed";
  return "bg-red-700 hover:bg-red-600";
});

watch(agendarBtn, (agendarBtnValue: string) => {
  if (agendarBtnValue != "AGENDAR")
    setTimeout(() => (agendarBtn.value = "AGENDAR"), 5000);
});
</script>
