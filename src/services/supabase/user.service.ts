import { User } from '@supabase/supabase-js';
import supabase from './index';

import { UserData } from '../../interfaces/user.interface';
import { SeasonDetails, TMDBMovie } from '../../interfaces/show.interface';

export async function fetchUser(userId: string): Promise<UserData> {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function insertUserOnUserTable(userData: User | null) {
  const filterUserValues = {
    id: userData?.id,
    email: userData?.email,
    displayName: userData?.user_metadata.displayName,
  };

  const { data, error } = await supabase
    .from('users')
    .insert([filterUserValues]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updatedWatchedMovies(
  user: UserData,
  show: TMDBMovie,
): Promise<UserData> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...user, watchedMovies: [{ ...show }, ...user.watchedMovies] })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function removeFromWatchedMovies(
  user: UserData,
  shows: TMDBMovie[],
): Promise<UserData> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...user, watchedMovies: shows })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addToFinishedSeasons(
  user: UserData,
  finishedSeason: SeasonDetails,
): Promise<UserData> {
  const { data, error } = await supabase
    .from('users')
    .update({
      ...user,
      seriesFinishedSeasons: [finishedSeason, ...user.seriesFinishedSeasons],
    })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function removeFromFinishedSeasons(
  user: UserData,
  finishedSeason: SeasonDetails[],
): Promise<UserData> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...user, seriesFinishedSeasons: finishedSeason })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addEpisodeToSeasons(user: UserData): Promise<UserData> {
  const { data, error } = await supabase
    .from('users')
    .update(user)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchRecentWatchedMovies(
  userId: string,
): Promise<TMDBMovie[]> {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    .select('watchedMovies')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.watchedMovies;
}
