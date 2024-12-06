import { model, models, Schema } from "mongoose";
import IAgendamento from "~/interfaces/IAgendamento";

const agendamentoSchema = new Schema<IAgendamento>({
  Modelo_de_Mensagem: { type: String, required: true },
  Nome_de_Quem_Envia: { type: String, required: true },
  Nome_de_Quem_Receberá: { type: String, required: true },
  Horário_da_Mensagem: { type: String, required: true },
  Data_da_Mensagem: { type: String, required: true },
  Ocasião_da_Mensagem: { type: String, required: true },
  Telefone_para_Contato: { type: String, required: true },
  Mensagem: { type: String, required: true },
  Telefone_do_Destinatário: { type: String, required: false },
  Endereço_da_Comemoração: { type: String, required: false },
  Música_para_chegar_tocando: { type: String, required: false },
});

export default model<IAgendamento>("Agendamento", agendamentoSchema);
