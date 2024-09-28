import { defineStore } from "pinia";

export const useFormStore = defineStore('form', {
  state: () => ({
    formData: {
      radioValue: 'Ao Vivo',
      nome: '',
      para: '',
      hora: setCurrentTime(),
      data: setCurrentDate(),
      ocasiao: 'Aniversário de Mãe',
      contato: '',
      destinatariotel: '',
      mensagem: '',
      musica: '',
      endereco: ''
    }
  })
})