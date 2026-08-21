import { format, formatDistanceToNow as dateFnsFormatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDatetime(rawDate: string): string {
  const date = new Date(rawDate);

  return format(date, "dd/MM/yyyy 'as' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatDistanceToNow(rawDate: string): string {
  const date = new Date(rawDate);

  return dateFnsFormatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}

const rawDate = '2025-04-12T06:31:23.411Z';
console.log(rawDate);
console.log(formatDatetime(rawDate));
