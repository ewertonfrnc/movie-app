import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app.navigator";
import AccountNavigator from "./account.navigator";

const isAuthenticated = false;

const Navigation = () => {
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
