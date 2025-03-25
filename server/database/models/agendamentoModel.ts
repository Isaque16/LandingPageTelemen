import { model, Schema } from "mongoose";
import IAgendamento from "~/interfaces/IAgendamento";

const agendamentoSchema = new Schema<IAgendamento>({
  Modelo_de_Mensagem: { type: String, required: true },
  Nome_de_Quem_Envia: { type: String, required: true },
  Nome_de_Quem_Recebera: { type: String, required: true },
  Horario_da_Mensagem: { type: String, required: true },
  Data_da_Mensagem: { type: String, required: true },
  Ocasiao_da_Mensagem: { type: String, required: true },
  Telefone_para_Contato: { type: String, required: true },
  Mensagem: { type: String, required: true },
  Telefone_do_Destinatario: { type: String, required: false },
  Endereco_da_Comemoracao: { type: String, required: false },
  Musica_para_chegar_tocando: { type: String, required: false },
});

export default model<IAgendamento>("Agendamento", agendamentoSchema);
