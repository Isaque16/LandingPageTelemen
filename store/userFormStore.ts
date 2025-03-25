import { defineStore } from "pinia";

export const useUserFormStore = defineStore("form", {
  state: () => ({
    formData: {
      modelo: "Ao Vivo",
      nome: "",
      para: "",
      hora: setCurrentTime(),
      data: setCurrentDate(),
      ocasiao: "Aniversário de Mãe",
      contato: "",
      destinatariotel: "",
      mensagem: "",
      musica: "",
      endereco: "",
      isAgendado: false,
    }
  }),
  getters: {
    showContent: ({ formData }) => {
      let content = [
        { contentTitle: "Modelo de Mensagem", data: formData.modelo },
        { contentTitle: "Nome de Quem Envia", data: formData.nome },
        { contentTitle: "Nome de Quem Receberá", data: formData.para },
        { contentTitle: "Horário da Mensagem", data: formData.hora },
        { contentTitle: "Data da Mensagem", data: formData.data.split("-").reverse().join("/") },
        { contentTitle: "Ocasião da Mensagem", data: formData.ocasiao },
        { contentTitle: "Telefone para Contato", data: formData.contato },
        { contentTitle: "Mensagem", data: formData.mensagem },
      ];

      const variableItems = [];
      
      if (formData.modelo === "Ao Vivo") {
        variableItems.push(
          { contentTitle: "Música para chegar tocando", data: formData.musica },
          { contentTitle: "Endereço da Comemoração", data: formData.endereco },
        );
      } else if (formData.modelo === "Por Telefone") {
        variableItems.push({
          contentTitle: "Telefone do Destinatário",
          data: formData.destinatariotel,
        });
      }

      return [...content, ...variableItems];
    }
  },
  persist: true
});
