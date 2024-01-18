import { Session, User } from "@supabase/supabase-js";

export type AuthActions =
  | { type: "app start"; payload: string | undefined }
  | { type: "start auth" }
  | {
      type: "finish auth";
      payload: { session: Session | null; user: User | null };
    }
  | { type: "fail auth"; payload: Error }
  | { type: "start logout" }
  | { type: "finish logout" }
  | { type: "fail logout"; payload: Error };

export type AuthState = {
  loading: boolean;
  token: string | undefined;
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  error: Error | null;
};
