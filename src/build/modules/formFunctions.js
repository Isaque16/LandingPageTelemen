import { formData } from "./formData.js"; // Importa os dados do formulário
// Elementos a serem manipulados
const pageBody = document.getElementById('pageBody');
const form = document.getElementById('form');
const tipoMensagem = document.getElementsByName('modelo');
const agendarBtn = document.getElementById('agendar');
const displayData = document.getElementsByName('show-data');
const overlay = document.getElementById('overlay');
const contShow = document.getElementsByName('cont-show-data');
const confirmContainer = document.getElementById('confirm-container');
const confirmBtn = document.getElementById('confirmar-agendamento');
const confirmScreen = document.getElementById('confirm-screen');
export function changeDisplay(elements, display) {
    const elementArry = Array.isArray(elements) ? elements : [elements];
    elementArry.forEach(element => {
        if (display === 'display') {
            element.classList.remove('hidden');
            element.classList.add('flex', 'flex-col');
        }
        else if (display === 'hide') {
            element.classList.remove('flex', 'flex-col');
            element.classList.add('hidden');
        }
        else
            throw new Error(" Display parameter must be equal to 'display' or 'hide' ");
    });
}
export function updateForm(numForm = 0) {
    if (numForm === 0) {
        // Hide
        changeDisplay([formData[6].cont], 'hide');
        // Display
        changeDisplay([formData[7].cont, formData[8].cont], 'display');
    }
    else if (numForm === 1) {
        // Hide
        changeDisplay([formData[7].cont, formData[8].cont], 'hide');
        // Display
        changeDisplay([formData[6].cont], 'display');
    }
}
export function verifyInput(isValid) {
    // Valida cada campo
    formData.forEach(data => {
        // Cria o elemento de erro
        const spanError = document.createElement('span');
        // Verifica se o campo está visível e vazio
        if (data.id.offsetParent !== null && !data.id.value) {
            // Se o campo está vazio, mostra a mensagem de erro
            spanError.textContent = data.errorMessage;
            spanError.classList.add('text-red-600', 'text-xl', 'italic', 'font-bold', 'w-full', 'md:w-1/2', 'p-2');
            // Verifica se já existe um span de erro antes de adicionar um novo
            if (!data.cont.querySelector('.text-red-600'))
                data.cont.appendChild(spanError);
            isValid = false; // Formulário não preenchido
        }
        // Verifica se o campo está visível e preenchido
        else if (data.id.offsetParent !== null && data.id.value) {
            // Limpa as mensagens de erro removendo o elemento já existente no DOM
            const existingError = data.cont.querySelector('.text-red-600');
            if (existingError)
                data.cont.removeChild(existingError);
            isValid = true; // Formulário preenchido
        }
    });
    return isValid;
}
function hideData() {
    const isNotSetTelefone = formData[6].id.offsetParent === null;
    const isNotSetAoVio = formData[7].id.offsetParent === null && formData[8].id.offsetParent === null;
    // Se os inputs do form telefone não forem preenchidos ou não aparecerem, são escondidos
    if (isNotSetTelefone) { // AoVivo checked
        changeDisplay(contShow[7], 'hide');
        changeDisplay([contShow[8], contShow[9]], 'display');
    }
    else if (isNotSetAoVio) { // Telefone checked
        changeDisplay([contShow[8], contShow[9]], 'hide');
        changeDisplay(contShow[7], 'display');
    }
}
function showData() {
    const DataDeEnvioFormated = formData[3].id.value.split('-').reverse().join('/');
    const content = {
        Modelo: tipoMensagem[0].checked ? 'Ao Vivo' : 'Por Telefone',
        De: formData[0].id.value,
        Para: formData[1].id.value,
        HoraDeEnvio: formData[2].id.value,
        DataDeEnvio: DataDeEnvioFormated,
        Ocasiao: formData[4].id.value,
        TelefoneDe: formData[5].id.value,
        TelefonePara: formData[6].id.value,
        MusicaAoVivo: formData[7].id.value,
        Endereco: formData[8].id.value,
    };
    const keys = Object.keys(content);
    displayData.forEach((data, index) => { data.textContent = content[keys[index]]; });
}
// Função que invoca o popup de confirmação de dados
export function popupInputData() {
    hideData(); // Esconde dados invisíveis
    showData(); // Mostra os dados preenchidos
    changeDisplay(overlay, 'display');
    overlay.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-black', 'bg-opacity-70', 'z-50');
    changeDisplay(confirmContainer, 'display');
    confirmContainer.classList.add('fixed,', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'bg-red-600', 'flex-col', 'p-5', 'rounded-lg', 'shadow-lg', 'z-50', 'max-w-[90vw]', 'max-h-[90vh]', 'backdrop:bg-black');
    pageBody.style.overflow = 'hidden';
}
export function cancelSubmition() {
    overlay.classList.remove('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-black', 'bg-opacity-70', 'z-50');
    confirmContainer.classList.remove('fixed,', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'bg-red-600', 'flex-col', 'p-5', 'rounded-lg', 'shadow-lg', 'z-50', 'max-w-[90vw]', 'max-h-[90vh]', 'backdrop:bg-black');
    pageBody.style.overflow = 'auto';
}
// Função que se comunica com o servidor
export async function submitInputValues() {
    const DataDeEnvioFormated = formData[3].id.value.split('-').reverse().join('/');
    const content = {
        Modelo: tipoMensagem[0].checked ? 'Ao Vivo' : 'Por Telefone',
        De: formData[0].id.value,
        Para: formData[1].id.value,
        HoraDeEnvio: formData[2].id.value,
        DataDeEnvio: DataDeEnvioFormated,
        Ocasiao: formData[4].id.value,
        TelefoneDe: formData[5].id.value,
        TelefonePara: formData[6].id.offsetParent !== null ? formData[6].id.value : null,
        MusicaAoVivo: formData[7].id.offsetParent !== null ? formData[7].id.value : null,
        Endereco: formData[8].id.offsetParent !== null ? formData[8].id.value : null,
    };
    confirmBtn.value = 'Um momento...'; // Envia feedback para o usuário de espera
    // Primeiro tenta enviar os dados para a url da rota POST
    try {
        const response = await fetch('http://localhost:3500/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        });
        const data = await response.text();
        agendarBtn.value = data;
        changeDisplay(form, 'hide');
        confirmScreen.classList.add('overlfow-y-auto', 'max-h-[70vh]');
    }
    // Caso ocorra um erro, mostra no botão do formulário
    catch (error) {
        console.error('Houve um erro ao enviar os dados: ', error);
        agendarBtn.value = 'Houve um erro ao enviar os dados, tente novamente';
    }
    // Qualquer que seja o resultado, esconde a tela de confirmação
    finally {
        setTimeout(() => { agendarBtn.value = 'AGENDAR'; }, 5000);
        cancelSubmition();
    }
}
