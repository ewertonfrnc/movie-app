import { createContext, ReactNode, useContext, useReducer } from "react";
import { UserActions, UserData, UserState } from "../interfaces/user.interface";
import { fetchUser } from "../services/supabase/user.service";
import { MovieDetails } from "../interfaces/movie.interface";
import { readStorageItem } from "../utils/async-storage.utils";

type Action = UserActions;
type State = UserState;
type Dispatch = (action: Action) => void;
type UserProviderProps = { children: ReactNode };

const UserContext = createContext<
  { state: State; userDispatch: Dispatch } | undefined
>(undefined);

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case "start fetch user":
      return { ...state, loading: true };

    case "finish fetch user":
      return { ...state, loading: false, user: action.payload };

    case "fail fetch user":
      return { ...state, payload: action.payload };

    case "start updating watched show":
      return {
        ...state,
        loading: true,
      };

    case "finish updating watched show":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case "fail updating watched show":
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

async function loadUserData(dispatch: Dispatch): Promise<UserData | undefined> {
  const userIdFromStorage = await readStorageItem("user-id");
  dispatch({ type: "start fetch user" });

  try {
    const userData = await fetchUser(userIdFromStorage);
    dispatch({ type: "finish fetch user", payload: userData });

    return userData;
  } catch (error) {
    dispatch({ type: "fail fetch user", payload: error as Error });
  }
}

async function addMovieToWatchList(
  dispatch: Dispatch,
  user: UserData,
  show: MovieDetails,
  showType: string,
) {
  dispatch({ type: "start updating watched show" });
  const { watchedMovies } = user;

  try {
    // const response = await updatedWatchedMovies(user, show, showType);
    // console.log("addMovieToWatchList response", response);
    dispatch({
      type: "finish updating watched show",
      payload: { ...user, watchedMovies: [show, ...watchedMovies] },
    });

    console.log(user, watchedMovies);
  } catch (error) {
    dispatch({ type: "fail updating watched show", payload: error as Error });
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [state, userDispatch] = useReducer(userReducer, {
    loading: false,
    user: null,
    error: null,
  });

  const value = { state, userDispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider!");

  return context;
}

export { UserProvider, useUser, loadUserData, addMovieToWatchList };
