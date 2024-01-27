import supabase from './index';
import {
  MovieWatchedByList,
  WatchedMovie,
} from '../../interfaces/show.interface';

export async function insertMovie(movie: WatchedMovie) {
  const { data, error } = await supabase
    .from('movie')
    .insert([{ ...movie }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getMovieById(movieId: number) {
  try {
    return await supabase.from('movie').select('*').eq('id', movieId);
  } catch (error) {
    return error;
  }
}

// WATCHED MOVIES
export async function insertWatchedMovie(
  watchedMovie: MovieWatchedByList,
): Promise<MovieWatchedByList> {
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

export async function updateWatchedMovie(
  movieId: number,
  watchedByList: string[],
): Promise<MovieWatchedByList> {
  const { data, error } = await supabase
    .from('watched_movie')
    .update({ watchedBy: watchedByList })
    .eq('id', movieId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getWatchedMovieById(
  movieId: number,
): Promise<MovieWatchedByList> {
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
