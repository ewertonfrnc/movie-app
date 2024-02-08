import { TMDBMovie } from './../interfaces/show.interface';
import moment from 'moment';

export const minToHours = (minutos: number) => {
  if (minutos < 0) return;

  const hours = Math.floor(minutos / 60);
  const remainderMin = minutos % 60;

  const formattedHours = hours > 0 ? `${hours}h` : '';
  const formatterMin = remainderMin > 0 ? `${remainderMin}m` : '';

  return formattedHours + formatterMin;
};

export const getFullYear = (date: string) => {
  return new Date(date).getFullYear();
};

export function formatDate(dateTime: string) {
  const date = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateTime));

  return `${date}`;
}

export function formatLongDateTime(dateTime: string) {
  const date = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  }).format(new Date(dateTime));

  const time = new Intl.DateTimeFormat('pt-BR', {
    timeStyle: 'short',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(dateTime));

  // return `📅 ${date} 🕓 ${time}`;
  return `Assistido em ${date} às ${time}`;
}

export function countReleaseDays(date: string) {
  const TMDBDate = moment(date);
  const today = moment(new Date());
  return TMDBDate.diff(today, 'days');
}

export function sortUpcomingMovies(TMDBMovies: TMDBMovie[]) {
  return TMDBMovies.sort(
    (a: TMDBMovie, b: TMDBMovie) =>
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
  );
}
