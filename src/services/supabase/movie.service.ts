import supabase from './index';
import { Show, WatchedMovie } from '../../interfaces/show.interface';

export async function insertMovie(movie: Show) {
  const { data, error } = await supabase
    .from('show')
    .insert([{ ...movie }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// WATCHED MOVIES
export async function insertWatchedMovie(watchedMovie: WatchedMovie) {
  const { data, error } = await supabase
    .from('watched_movie')
    .insert([{ ...watchedMovie }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getShowOnDB(movieId: number): Promise<Show> {
  const { data, error } = await supabase
    .from('show')
    .select()
    .eq('movieId', movieId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getWatchedMovieById(
  movieId: number,
): Promise<WatchedMovie[]> {
  const { data, error } = await supabase
    .from('watched_movie')
    .select()
    .eq('movieId', movieId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteWatchedMovieById(movieId: number, userId: string) {
  const { error } = await supabase
    .from('watched_movie')
    .delete()
    .eq('movieId', movieId)
    .eq('userId', userId);

  if (error) {
    throw new Error(error.message);
  }
}
