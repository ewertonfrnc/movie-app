import { createContext, FC, ReactNode, useState } from "react";
import { signOut } from "../services/auth";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  user: null,
  authenticate: (token) => {},
  logout: () => {},
});

type AuthContextProviderProps = {
  children: ReactNode;
};
const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const authenticate = (token: string) => setAuthToken(token);

  const logOut = async () => {
    await signOut();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
