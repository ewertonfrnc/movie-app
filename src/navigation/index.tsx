import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app.navigator";
import AccountNavigator from "./account.navigator";

import { useAuth } from "../contexts/auth.context";

const Navigation = () => {
  const {
    state: { isAuthenticated, user, session },
  } = useAuth();

  console.log(user, session);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
