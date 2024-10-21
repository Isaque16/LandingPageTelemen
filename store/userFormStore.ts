import { defineStore } from "pinia";
export const userFormStore = defineStore('form', {
  state: () => ({
    formData: {
      modelo: 'Ao Vivo',
      nome: '',
      para: '',
      hora: setCurrentTime(),
      data: setCurrentDate(),
      ocasiao: 'Aniversário de Mãe',
      contato: '',
      destinatariotel: '',
      mensagem: '',
      musica: '',
      endereco: '',
      isAgendado: false,
    }
  }),
  getters: {
    showContent: (state) => {
      let content = [
        { contentTitle: "Modelo de Mensagem", data: state.formData.modelo },
        { contentTitle: "Nome de Quem Envia", data: state.formData.nome },
        { contentTitle: "Nome de Quem Receberá", data: state.formData.para },
        { contentTitle: "Horário da Mensagem", data: state.formData.hora },
        { contentTitle: "Data da Mensagem", data: state.formData.data.split('-').reverse().join('/') },
        { contentTitle: "Ocasião da Mensagem", data: state.formData.ocasiao },
        { contentTitle: "Telefone para Contato", data: state.formData.contato },
        { contentTitle: "Mensagem", data: state.formData.mensagem },
      ];

      const variableItems = [];
      
      if (state.formData.modelo === "Ao Vivo") {
        variableItems.push(
          { contentTitle: "Música para chegar tocando", data: state.formData.musica },
          { contentTitle: "Endereço da Comemoração", data: state.formData.endereco },
        );
      } else if (state.formData.modelo === "Por Telefone") {
        variableItems.push({
          contentTitle: "Telefone do Destinatário",
          data: state.formData.destinatariotel,
        });
      }

      return [...content, ...variableItems];
    }
  },
  persist: true
});
