// Importações das funções necessárias
import { updateForm, verifyInput, cancelSubmition, submitInputValues, popupInputData } from "./Modules/formFunctions.js" // Funções que fazem o form funcionar
import { setCurrentTime, setCurrentDate } from "./Modules/setToday.js" // Funções que mostram o tempo no placeholder do formulário
import { formData } from "./Modules/formData.js"

const tipoMensagem = document.getElementsByName('modelo') as NodeListOf<HTMLInputElement>
// Função que passa o número do radio selecionado
tipoMensagem.forEach(tipo => {
  tipo.addEventListener('change', () => {
    let numForm: number = 0
    // Verifica qual dos radios está sendo marcado e define numForm
    if      (tipo.value == 'aovivo')      numForm = 0 // Número do form ao vivo
    else if (tipo.value == 'portelefone') numForm = 1 // Número do form por telefone
    updateForm(numForm)
  })
})

const submitbtn = document.getElementById('agendar') as HTMLButtonElement
// Escutador de eventos do botão de enviar do form
submitbtn.addEventListener('click', () => {
  let isValid: boolean = false
  if (verifyInput(isValid)) popupInputData()  // Função que mostra os dados passado nos inputs
})

// Botão para confirmar e enviar os dados para o servidor
const cancelBtn = document.getElementById('cancelar-agendamento') as HTMLButtonElement
const confirmBtn = document.getElementById('confirmar-agendamento') as HTMLButtonElement
confirmBtn.addEventListener('click', () => submitInputValues())
cancelBtn.addEventListener('click', () => cancelSubmition())

// Adiciona um info sob cada input text ao focar
formData.forEach(data => data.id.addEventListener('focus', () => {
  const spanInfo = document.createElement('span') as HTMLSpanElement
  data.cont.appendChild(spanInfo)
  spanInfo.classList.add('opacity-70')
  spanInfo.textContent = data.infoMessage

  // Retira o info
  data.id.onblur = () => {
    spanInfo.textContent = ''
    data.cont.removeChild(spanInfo)
    spanInfo.classList.remove('opacity-70')
  }
}))

updateForm() // Atualiza o formulário ao carregar a página
// Escreve as horas e data nos campos
formData[2].id.value = setCurrentTime()
formData[3].id.value = setCurrentDate()
