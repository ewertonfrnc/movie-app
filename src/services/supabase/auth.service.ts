import supabase from "../supabase";
import { User } from "@supabase/supabase-js";

export const signUp = async (
  displayName: string,
  email: string,
  password: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { displayName } },
  });

  if (error) throw new Error(error.message);

  return data;
};

export async function insertUserOnUserTable(userData: User | null) {
  const { data, error } = await supabase.from("users").insert([userData]);

  console.log("insertUserOnUserTable", data, error);
  console.log("userData", userData);

  if (error) throw new Error(error.message);

  return data;
}

export const logInWithEmailPassword = async (
  email: string,
  password: string,
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
