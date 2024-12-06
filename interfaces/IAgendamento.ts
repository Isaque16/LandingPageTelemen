export default interface IAgendamento {
  Modelo_de_Mensagem: string;
  Nome_de_Quem_Envia: string;
  Nome_de_Quem_Receberá: string;
  Horário_da_Mensagem: string;
  Data_da_Mensagem: string;
  Ocasião_da_Mensagem: string;
  Telefone_para_Contato: string;
  Música_para_chegar_tocando?: string;
  Endereço_da_Comemoração?: string;
  Telefone_do_Destinatário?: string;
  Mensagem: string;
}
