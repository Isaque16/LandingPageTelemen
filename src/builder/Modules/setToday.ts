// Função que retorna o horário atual e a data de hoje
const time = new Date() // Cria uma nova instância da classe Date
// Define o horário atual
export function setCurrentTime(): string {
  let hours:   string | number = time.getHours()   < 10 ? time.getHours().toString().padStart(2, '0')   : time.getHours()
  let minutes: string | number = time.getMinutes() < 10 ? time.getMinutes().toString().padStart(2, '0') : time.getMinutes()
  
  return `${hours}:${minutes}`
}
// Define a data de hoje
export function setCurrentDate(): string {
  let day:   string | number = time.getDate()  < 10 ? time.getDate().toString().padStart(2, '0')  : time.getDate()
  let month: string | number = (time.getMonth() + 1) < 10 ? (time.getMonth() + 1).toString().padStart(2, '0') : (time.getMonth() + 1)
  let year:  string | number = time.getFullYear()
  
  return `${ year }-${ month }-${ day }` as string
}