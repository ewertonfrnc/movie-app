import { createContext, ReactNode, useContext, useReducer } from "react";

import { AuthActions } from "../interfaces/auth.interface";

import { logInWithEmailPassword, signUp } from "../services/auth";
import { Session, User } from "@supabase/supabase-js";

type Action = AuthActions;
type State = {
  loading: boolean;
  token: string;
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  error: Error | null;
};
type Dispatch = (action: Action) => void;
type AuthProviderProps = { children: ReactNode };

const AuthContext = createContext<
  { state: State; authDispatch: Dispatch } | undefined
>(undefined);

function authReducer(state: State, action: Action) {
  switch (action.type) {
    case "start auth": {
      return { ...state, loading: true };
    }

    case "finish auth": {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        ...action.payload,
      };
    }

    case "fail auth": {
      return { ...state, loading: false, error: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

type AdditionalInformation = {
  isRegister: boolean;
  displayName: string;
};
async function setUser(
  dispatch: Dispatch,
  email: string,
  password: string,
  additionalInformation?: AdditionalInformation,
) {
  dispatch({ type: "start auth" });

  try {
    if (additionalInformation?.isRegister) {
      const { session, user } = await signUp(
        additionalInformation.displayName,
        email,
        password,
      );
      dispatch({ type: "finish auth", payload: { session, user } });
    } else {
      const { session, user } = await logInWithEmailPassword(email, password);
      dispatch({ type: "finish auth", payload: { session, user } });
    }
  } catch (error) {
    dispatch({ type: "fail auth", payload: error as Error });
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, authDispatch] = useReducer(authReducer, {
    loading: false,
    token: "",
    isAuthenticated: false,
    user: null,
    session: null,
    error: null,
  });

  const value = { state, authDispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

  // const [authToken, setAuthToken] = useState<string | null>(null);
  //
  // const authenticate = (token: string) => setAuthToken(token);
  //
  // const logOut = async () => {
  //   await signOut();
  //   setAuthToken(null);
  // };
  //
  // return (
  //   <AuthContext.Provider
  //     value={{
  //       token: authToken,
  //       isAuthenticated: !!authToken,
  //       authenticate: authenticate,
  //       logout: logOut,
  //     }}
  //   >
  //     {children}
  //   </AuthContext.Provider>
  // );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider!");

  return context;
}

export { AuthProvider, useAuth, setUser };
