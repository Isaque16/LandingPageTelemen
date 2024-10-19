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
      paymentStatus: '',
      isAgendado: false,
    }
  }),
  persist: {
    pick: [
      "formData.modelo", 
      "formData.hora", 
      "formData.data", 
      "formData.isAgendado"
    ]
  }
})