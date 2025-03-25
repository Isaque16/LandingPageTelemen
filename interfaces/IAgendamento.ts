export default interface IAgendamento {
  Modelo_de_Mensagem: string;
  Nome_de_Quem_Envia: string;
  Nome_de_Quem_Recebera: string;
  Horario_da_Mensagem: string;
  Data_da_Mensagem: string;
  Ocasiao_da_Mensagem: string;
  Telefone_para_Contato: string;
  Musica_para_chegar_tocando?: string;
  Endereco_da_Comemoracao?: string;
  Telefone_do_Destinatario?: string;
  Mensagem: string;
}
