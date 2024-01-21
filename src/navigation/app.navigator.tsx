import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { RootStackParamsList } from "../interfaces/navigator.interface";

import BottomTabBar from "../components/BottomTabBar";
import HomeNavigator from "./home.navigator";
import Settings from "../screens/settings.screen";

const Tab = createBottomTabNavigator<RootStackParamsList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="home" component={HomeNavigator} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
}
