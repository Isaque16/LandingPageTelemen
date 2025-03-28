// Função que retorna o horário atual e a data de hoje
const time = new Date(); // Cria uma nova instância da classe Date

// Define o horário atual
export function setCurrentTime(): string {
  const newTime = new Date(time.getTime() + 30 * 60000); // Adiciona 30 minutos
  const hours: string | number =
    newTime.getHours() < 10
      ? newTime.getHours().toString().padStart(2, "0")
      : newTime.getHours();
  const minutes: string | number =
    newTime.getMinutes() < 10
      ? newTime.getMinutes().toString().padStart(2, "0")
      : newTime.getMinutes();

  return `${hours}:${minutes}` as string;
}

// Define a data de hoje
export function setCurrentDate(): string {
  const day: string | number =
    time.getDate() < 10
      ? time.getDate().toString().padStart(2, "0")
      : time.getDate();
  const month: string | number =
    time.getMonth() + 1 < 10
      ? (time.getMonth() + 1).toString().padStart(2, "0")
      : time.getMonth() + 1;
  const year: string | number = time.getFullYear();

  return `${year}-${month}-${day}` as string;
}
