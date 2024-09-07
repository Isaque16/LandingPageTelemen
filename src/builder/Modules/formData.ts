interface forData {
  cont: HTMLDivElement
  id: HTMLInputElement
  infoMessage: string
  errorMessage: string
}

// Lista de objetos com inputs e containers do form
export const formData: forData[] = [
  { // [0]
    cont:    document.querySelector('#cont-nome') as HTMLDivElement,
    id:      document.querySelector('#nome') as HTMLInputElement, 
    infoMessage: 'Neste campo você deve preencher com o nome de quem está enviando, podendo ser somente o seu ou de várias pessoas em conjunto',
    errorMessage: 'Informe pelo menos o primeiro nome de quem está enviando!',
  },

  { // [1]
    cont:    document.querySelector('#cont-para') as HTMLDivElement, 
    id:      document.querySelector('#para') as HTMLInputElement, 
    infoMessage: 'Aqui você deve preencher o campo com o nome da pessoa que será homenagiado(a)',
    errorMessage: 'Informe pelo menos o primeiro nome da pessoa que vai receber',
  },

  { // [2]
    cont:     document.querySelector('#cont-hora') as HTMLDivElement,
    id:       document.querySelector('#hora') as HTMLInputElement, 
    infoMessage: 'Agora você deve preencher este campo com a horá que a mensagem deve ocorrer, podendo esta ou não disponível no dia',
    errorMessage: 'É preciso informar o horário de envio da mensagem',
  },

  { // [3]
    cont:    document.querySelector('#cont-data') as HTMLDivElement,
    id:      document.querySelector('#data') as HTMLInputElement, 
    infoMessage: 'Da mesma forma a data de envio da mensagem. Por favor, sempre agende com antecedencia',
    errorMessage: 'É preciso informar a data de envio da mensagem',
  },

  { // [4]
    cont:    document.querySelector('#cont-ocasiao') as HTMLDivElement,
    id:      document.querySelector('#ocasiao') as HTMLInputElement, 
    infoMessage: 'Neste campo você deve responder qual a ocasião da mensagem',
    errorMessage: 'É preciso informar a ocasião de envio da mensagem',
  },

  { // [5]
    cont:    document.querySelector('#cont-seutelefone') as HTMLDivElement,
    id:      document.querySelector('#seutelefone') as HTMLInputElement, 
    infoMessage: 'Digite aqui o seu número de telefone para mantermos contato e nos dar mais informações',
    errorMessage: 'Precisamos manter contato! Nos informe seu número',
  },

  { // [6]
    cont:    document.querySelector('#cont-destinatariotel') as HTMLDivElement,
    id:      document.querySelector('#destinatariotel') as HTMLInputElement, 
    infoMessage: 'Digite aqui o número de telefone da pessoa que vai receber a mensagem',
    errorMessage: 'Precisamos do contato para o envio da mensagem',
  },

  { // [7]
    cont:    document.querySelector('#cont-music') as HTMLDivElement,
    id:      document.querySelector('#music') as HTMLInputElement, 
    infoMessage: 'Escreva o nome da música da preferencia de quem vai receber a mensagem, pois essa chegará tocando na chegada ao local',
    errorMessage: 'A escolha de uma música de sua preferencia é necessário',
  },

  { // [8]
    cont:    document.querySelector('#cont-endereco') as HTMLDivElement,
    id:      document.querySelector('#endereco') as HTMLInputElement, 
    infoMessage: 'Por último, escreva ou cole neste campo o endereço do local onde ocorrerá a comemoração da data em questão',
    errorMessage: 'Por favor, digite o endereço/local da comemoração corretamente',
  }
]
