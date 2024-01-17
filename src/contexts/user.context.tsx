import { createContext, FC, ReactNode, useState } from "react";

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

  const logOut = () => setAuthToken(null);

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
