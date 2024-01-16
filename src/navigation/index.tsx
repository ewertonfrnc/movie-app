import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app.navigator";
import AccountNavigator from "./account.navigator";

const isAuthenticated = true;

const Navigation = () => {
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
