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
