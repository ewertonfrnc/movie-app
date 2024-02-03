import supabase from './index';
import {
  Show,
  SUPAEpisode,
  WatchedMovie,
} from '../../interfaces/show.interface';

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
    .from('watched_shows')
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
    .from('watched_shows')
    .select()
    .eq('movieId', movieId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteWatchedMovieById(movieId: number, userId: string) {
  const { error } = await supabase
    .from('watched_shows')
    .delete()
    .eq('movieId', movieId)
    .eq('userId', userId);

  if (error) {
    throw new Error(error.message);
  }
}

// watched episodes
export async function updateSeasonEpisodes(episodes: SUPAEpisode[]) {
  const { data, error } = await supabase
    .from('watched_episodes')
    .insert([...episodes])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteSeasonEpisodes(
  showId: number,
  seasonNumber: number,
) {
  const { error } = await supabase
    .from('watched_episodes')
    .delete()
    .eq('showId', showId)
    .eq('seasonNumber', seasonNumber);

  if (error) {
    throw new Error(error.message);
  }
}

export async function checkForWatchedEpisodes(showId: number) {
  const { data, error } = await supabase
    .from('watched_episodes')
    .select()
    .eq('showId', showId)
    .select('userId,seasonNumber,episodeId');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
