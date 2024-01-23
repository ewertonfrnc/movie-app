import supabase from "./index";
import { MovieDetails } from "../../interfaces/show.interface";

export async function getMovieById(
  movieId: number,
): Promise<MovieDetails | undefined> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", movieId);

  if (error) throw new Error(error.message);

  return data;
}

export async function addMovieRow(userId: string | string[], movieId?: number) {
  console.log("userId", userId);

  const { data, error } = await supabase
    .from("movies")
    .insert([{ id: movieId, watched_by: [userId] }])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateMovieRow(userId: string[], movieId: number) {
  const { data, error } = await supabase
    .from("movies")
    .update({ watched_by: userId })
    .eq("id", movieId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
