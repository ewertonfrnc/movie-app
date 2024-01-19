import { createContext, ReactNode, useContext, useReducer } from "react";

import { AuthActions, AuthState } from "../interfaces/auth.interface";

import {
  logInWithEmailPassword,
  signOut,
  signUp,
} from "../services/supabase/auth.service";
import { insertUserOnUserTable } from "../services/supabase/user.service";
import { storeToStorage } from "../utils/async-storage.utils";

type Action = AuthActions;
type State = AuthState;
type Dispatch = (action: Action) => void;
type AuthProviderProps = { children: ReactNode };

const AuthContext = createContext<
  { state: State; authDispatch: Dispatch } | undefined
>(undefined);

function authReducer(state: State, action: Action) {
  switch (action.type) {
    case "app start":
      return {
        ...state,
        isAuthenticated: !!action.payload,
        userId: action.payload,
      };

    case "start auth":
      return { ...state, loading: true };

    case "finish auth":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        ...action.payload,
      };

    case "fail auth":
      return { ...state, loading: false, error: action.payload };

    case "start logout":
      return { ...state, loading: true };

    case "finish logout":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        session: null,
      };

    case "fail logout":
      return { ...state, error: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

async function onAppStart(dispatch: Dispatch, userId: string) {
  dispatch({ type: "app start", payload: userId });
  console.log("appstart", userId);

  await storeToStorage("user-id", userId);
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
      await insertUserOnUserTable(user);
    } else {
      const { session, user } = await logInWithEmailPassword(email, password);
      dispatch({ type: "finish auth", payload: { session, user } });
    }
  } catch (error) {
    dispatch({ type: "fail auth", payload: error as Error });
  }
}

async function logUserOut(dispatch: Dispatch) {
  dispatch({ type: "start logout" });

  try {
    await signOut();
    dispatch({ type: "finish logout" });
  } catch (error) {
    dispatch({ type: "fail logout", payload: error as Error });
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, authDispatch] = useReducer(authReducer, {
    loading: false,
    userId: "",
    isAuthenticated: false,
    user: null,
    session: null,
    error: null,
  });

  const value = { state, authDispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider!");

  return context;
}

export { AuthProvider, useAuth, setUser, logUserOut, onAppStart };
