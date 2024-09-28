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
        v-if="!isAgendado"
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
              v-model="form.radioValue"
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
              v-model="form.radioValue"
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
            info-message="Neste campo você deve preencher com o nome de quem está enviando, podendo ser somente o seu ou de várias pessoas em conjunto"
            error-message="Informe pelo menos o primeiro nome de quem está enviando!"
          ></input-component>

          <input-component
            forLabel="para"
            inputTitle="Para quem"
            inputType="text"
            v-model="form.para"
            placeholder="Nome da homenagiada(o)"
            info-message="Aqui, você deve preencher com o nome da pessoa que será homenagiada(o)"
            error-message="Informe pelo menos o primeiro nome da pessoa que vai receber"
          ></input-component>

          <input-component
            forLabel="hora"
            inputTitle="Horário da mensagem"
            inputType="time"
            v-model="form.hora"
            info-message="Agora você deve preencher este campo com a horá que a mensagem deve ocorrer, podendo estar ou não disponível no dia"
            error-message="É preciso informar o horário de envio da mensagem"
          ></input-component>

          <input-component
            forLabel="data"
            inputTitle="Data de envio"
            inputType="date"
            v-model="form.data"
            info-message="Da mesma forma a data de envio da mensagem. Por favor, sempre agende com antecedencia"
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
                  <option value="Aniversário de Mãe">
                    Aniversário de Mãe
                  </option>
                  <option value="Aniversário de Pai">
                    Aniversário de Pai
                  </option>
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
            info-message="Digite aqui o seu número de telefone para mantermos contato"
            error-message="Precisamos manter contato! Nos informe seu número"
          ></input-component>

          <input-component
            v-if="form.radioValue == 'Por Telefone'"
            forLabel="destinatariotel"
            inputTitle="Número do destinatário"
            inputType="text"
            v-model="form.destinatariotel"
            placeholder="ex: 68 12345678"
            info-message="Digite aqui o número de telefone da pessoa que vai receber a mensagem"
            error-message="Precisamos do contato para o envio da mensagem"
          ></input-component>

          <div class="flex flex-col p-2" v-if="form.radioValue == 'Por Telefone'">
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
            v-if="form.radioValue == 'Ao Vivo'"
            forLabel="musica"
            inputTitle="Nome da música"
            inputType="text"
            v-model="form.musica"
            placeholder="ex: Esse cara sou eu - Roberto Carlos"
            info-message="Escreva o nome da música da preferencia de quem vai receber a mensagem, pois essa chegará tocando na chegada ao local"
            error-message="A escolha de uma música de sua preferencia é necessário"
          ></input-component>

          <input-component
            v-if="form.radioValue == 'Ao Vivo'"
            forLabel="endereco"
            inputTitle="Endereço da comemoração"
            inputType="text"
            v-model="form.endereco"
            placeholder="ex: R. Cumaru, Portal da Amazônia, Rio Branco, Acre"
            info-message="Por último, escreva ou cole neste campo o endereço do local onde ocorrerá a comemoração da data em questão"
            error-message="Por favor, digite o endereço/local da comemoração corretamente"
          ></input-component>

          <div class="flex flex-col p-2 rounded-xl text-center gap-2">
            <button
              @click.prevent="sendInputValues()"
              class="p-2 bg-red-700 hover:bg-red-600 rounded-xl cursor-pointer text-2xl font-workSans w-full md:w-1/2 font-bold"
            >
              {{ agendarBtn }}
            </button>
          </div>
        </div>
      </form>

      <dialog ref="dialogScreen" class="rounded-lg">
        <confirmation-screen
          @closeDialog="closeDialog"
          @agendadoResponse="agendadoResponse"
          @agendarBtnBadRequest="agendarBadRequest"
          :prop-input-radio="form.radioValue"
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

      <confirmed-screen
        v-if="isAgendado"
        @agendamentoAtivo="agendamentoAtivo"
        :prop-sent-time="form.hora"
        :prop-sent-date="form.data"
      ></confirmed-screen>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useFormStore } from "~/store/userFormStore";

// Utilizando Pinia
const formStore = useFormStore();
const form = formStore.formData;

// Muda os inputs mostrados no form de acordo com o radio
const route = useRoute();
const modeloParams = route.query.modelo;

// Executa a lógica quando o componente é montado
onMounted(() => {
  if (modeloParams === 'Ao Vivo' || modeloParams === 'Ao+Vivo') form.radioValue = "Ao Vivo";
  else if (modeloParams === 'Por Telefone' || modeloParams === 'Por+Telefone') form.radioValue = "Por Telefone";
});

const updateForm = () => form.radioValue; // Altera o valor do formulário quando alterado

const agendarBtn = ref("AGENDAR");
const dialogScreen = ref<HTMLDialogElement | null>();

// Verifica o preenchimento dos inputs
function sendInputValues() {
  const formDefaultSet: boolean =
    !form.nome ||
    !form.para ||
    !form.hora ||
    !form.data ||
    !form.ocasiao ||
    !form.contato;
  const aovivoSet: boolean =
    form.radioValue === "Ao Vivo" && 
    (!form.musica || !form.endereco);
  const portelefoneSet: boolean =
    form.radioValue === "Por Telefone" &&
    (!form.destinatariotel || !form.mensagem);

  // Verifica se há algum campo obrigatório não preenchido
  if (formDefaultSet || aovivoSet || portelefoneSet) {
    agendarBtn.value = "Verifique os campos vazios!";
    setTimeout(() => (agendarBtn.value = "AGENDAR"), 5000);
  } else dialogScreen.value?.showModal();
}

// Respostas do agendamento
const closeDialog = () => dialogScreen.value?.close();
const agendarBadRequest = () => {
  closeDialog();
  agendarBtn.value = "Houve um erro ao enviar os dados";
  setTimeout(() => (agendarBtn.value = "AGENDAR"), 5000);
};

// Define o estado do formulário como agendado ou não
const isAgendado = ref<boolean>(false); // Status de agendamento
const agendamentoAtivo = (isAtivo: boolean) => (isAgendado.value = isAtivo);
const agendadoResponse = (res: boolean) => (isAgendado.value = res);

// Verifica se já houve agendamento ou não
onMounted(() => {
  const isAgendadoActive = localStorage.getItem("agendado");
  if (isAgendadoActive !== null) isAgendado.value = isAgendadoActive == "true";
});

watch(isAgendado, (newAgendado: boolean) =>
  localStorage.setItem("agendado", String(newAgendado)),
); // Observa o valor do isAgendado
</script>
