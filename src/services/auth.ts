import { supabase } from "../utils/supabase/supabase.utils";

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
