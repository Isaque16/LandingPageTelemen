// Lista de objetos com inputs e containers do form
export const formData = [
    {
        cont: document.querySelector('#cont-nome'),
        id: document.querySelector('#nome'),
        infoMessage: 'Neste campo você deve preencher com o nome de quem está enviando, podendo ser somente o seu ou de várias pessoas em conjunto',
        errorMessage: 'Informe pelo menos o primeiro nome de quem está enviando!',
    },
    {
        cont: document.querySelector('#cont-para'),
        id: document.querySelector('#para'),
        infoMessage: 'Aqui você deve preencher o campo com o nome da pessoa que será homenagiado(a)',
        errorMessage: 'Informe pelo menos o primeiro nome da pessoa que vai receber',
    },
    {
        cont: document.querySelector('#cont-hora'),
        id: document.querySelector('#hora'),
        infoMessage: 'Agora você deve preencher este campo com a horá que a mensagem deve ocorrer, podendo esta ou não disponível no dia',
        errorMessage: 'É preciso informar o horário de envio da mensagem',
    },
    {
        cont: document.querySelector('#cont-data'),
        id: document.querySelector('#data'),
        infoMessage: 'Da mesma forma a data de envio da mensagem. Por favor, sempre agende com antecedencia',
        errorMessage: 'É preciso informar a data de envio da mensagem',
    },
    {
        cont: document.querySelector('#cont-ocasiao'),
        id: document.querySelector('#ocasiao'),
        infoMessage: 'Neste campo você deve responder qual a ocasião da mensagem',
        errorMessage: 'É preciso informar a ocasião de envio da mensagem',
    },
    {
        cont: document.querySelector('#cont-seutelefone'),
        id: document.querySelector('#seutelefone'),
        infoMessage: 'Digite aqui o seu número de telefone para mantermos contato e nos dar mais informações',
        errorMessage: 'Precisamos manter contato! Nos informe seu número',
    },
    {
        cont: document.querySelector('#cont-destinatariotel'),
        id: document.querySelector('#destinatariotel'),
        infoMessage: 'Digite aqui o número de telefone da pessoa que vai receber a mensagem',
        errorMessage: 'Precisamos do contato para o envio da mensagem',
    },
    {
        cont: document.querySelector('#cont-music'),
        id: document.querySelector('#music'),
        infoMessage: 'Escreva o nome da música da preferencia de quem vai receber a mensagem, pois essa chegará tocando na chegada ao local',
        errorMessage: 'A escolha de uma música de sua preferencia é necessário',
    },
    {
        cont: document.querySelector('#cont-endereco'),
        id: document.querySelector('#endereco'),
        infoMessage: 'Por último, escreva ou cole neste campo o endereço do local onde ocorrerá a comemoração da data em questão',
        errorMessage: 'Por favor, digite o endereço/local da comemoração corretamente',
    }
];
