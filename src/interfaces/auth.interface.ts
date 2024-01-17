import { Session, User } from "@supabase/supabase-js";

export type AuthActions =
  | { type: "start auth" }
  | {
      type: "finish auth";
      payload: { session: Session | null; user: User | null };
    }
  | { type: "fail auth"; payload: Error };
