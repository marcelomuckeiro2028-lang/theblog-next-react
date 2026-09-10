import { format, formatDistanceToNow as dateFnsFormatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDatetime(rawDate: string): string {
  if (!rawDate) return 'Data inválida';

  const date = new Date(rawDate);

  if (isNaN(date.getTime())) return 'Data inválida';

  return format(date, "dd/MM/yyyy 'as' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatDistanceToNow(rawDate: string): string {
  if (!rawDate) return '';
  const date = new Date(rawDate);
  if (isNaN(date.getTime())) return '';

  return dateFnsFormatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}

export function formatHour(timestamps: number): string {
  if (timestamps === undefined || timestamps === null || isNaN(timestamps)) {
    return 'Horário inválido';
  }
  const hour = new Date(timestamps);
  if (isNaN(hour.getTime())) return 'Horário inválido';

  return format(hour, 'HH:mm:ss', {
    locale: ptBR,
  });
}
