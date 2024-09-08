// Função que retorna o horário atual e a data de hoje
const time = new Date(); // Cria uma nova instância da classe Date
// Define o horário atual
export function setCurrentTime() {
    let hours = time.getHours() < 10 ? time.getHours().toString().padStart(2, '0') : time.getHours();
    let minutes = time.getMinutes() < 10 ? time.getMinutes().toString().padStart(2, '0') : time.getMinutes();
    return `${hours}:${minutes}`;
}
// Define a data de hoje
export function setCurrentDate() {
    let day = time.getDate() < 10 ? time.getDate().toString().padStart(2, '0') : time.getDate();
    let month = (time.getMonth() + 1) < 10 ? (time.getMonth() + 1).toString().padStart(2, '0') : (time.getMonth() + 1);
    let year = time.getFullYear();
    return `${year}-${month}-${day}`;
}
