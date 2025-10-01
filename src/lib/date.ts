import { isToday, isYesterday, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatRelativeDate(date: Date | number): string {
  if (isToday(date)) {
    return 'Hoje'
  }

  if (isYesterday(date)) {
    return 'Ontem'
  }

  return format(date, "EEEE, dd 'de' MMMM", {
    locale: ptBR,
  })
}

export function formatTime(milliseconds: number): string {
  if (isNaN(milliseconds) || milliseconds < 0) {
    return "00:00:00";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(1, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
