import { formatDistanceToNow, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const getHumanReadableDiff = (date: string) => {
  const distance = formatDistanceToNow(parseISO(date), { locale: es })

  // 'Hace 2 días' or 'Hace 2 días atrás' in Spanish
  return `Hace ${distance}`.replace(/alrededor de /gi, '')
}
