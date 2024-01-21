import { User } from "@supabase/supabase-js";
import supabase from "./index";

import { UserData } from "../../interfaces/user.interface";
import { MovieDetails } from "../../interfaces/show.interface";

export async function fetchUser(userId: string): Promise<UserData> {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function insertUserOnUserTable(userData: User | null) {
  const filterUserValues = {
    id: userData?.id,
    email: userData?.email,
    createdAt: userData?.created_at,
    displayName: userData?.user_metadata.displayName,
    watchedMovies: [],
  };

  const { data, error } = await supabase
    .from("users")
    .insert([filterUserValues]);

  if (error) throw new Error(error.message);

  return data;
}

export async function updatedWatchedMovies(
  user: UserData,
  show: MovieDetails,
): Promise<UserData> {
  const { data, error } = await supabase
    .from("users")
    .update({ ...user, watchedMovies: [{ ...show }, ...user.watchedMovies] })
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function removeFromWatchedMovies(
  user: UserData,
  shows: MovieDetails[],
): Promise<UserData> {
  const { data, error } = await supabase
    .from("users")
    .update({ ...user, watchedMovies: shows })
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchRecentWatchedMovies(
  userId: string,
): Promise<MovieDetails[]> {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .select("watchedMovies")
    .single();

  if (error) throw new Error(error.message);

  return data.watchedMovies;
}
