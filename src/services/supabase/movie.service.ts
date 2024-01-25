import supabase from './index';
import { MovieDetails } from '../../interfaces/show.interface';

export async function insertMovie(movie: MovieDetails) {
  const { data, error } = await supabase
    .from('movie')
    .insert([{ ...movie }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getMovieById(movieId: number) {
  const { data, error } = await supabase
    .from('movie')
    .select('*')
    .eq('id', movieId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// WATCHED MOVIES
export async function insertWatchedMovie(watchedMovie) {
  const { data, error } = await supabase
    .from('watched_movie')
    .insert([{ ...watchedMovie }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateWatchedMovie(
  movieId: number,
  watchedByList: string[],
) {
  const { data, error } = await supabase
    .from('watched_movie')
    .update({ watchedBy: watchedByList })
    .eq('id', movieId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getWatchedMovieById(movieId: number) {
  const { data, error } = await supabase
    .from('watched_movie')
    .select('*')
    .eq('id', movieId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateMovieRow(userId: string[], movieId: number) {
  const { data, error } = await supabase
    .from('movie')
    .update({ watched_by: userId })
    .eq('id', movieId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
