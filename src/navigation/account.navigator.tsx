import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import LoginScreen from "../screens/auth/login";
import RegisterScreen from "../screens/auth/register";
import { AccountStackParamsList } from "../interfaces/navigator.interface";

const Stack = createStackNavigator<AccountStackParamsList>();

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
