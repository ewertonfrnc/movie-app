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

export function formatDate(date: string) {
  return moment(date).format('ll');
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
