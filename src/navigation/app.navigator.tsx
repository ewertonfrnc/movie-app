import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  CreateScreenOptionsProps,
  RootStackParamsList,
  TabBarIconProps,
} from "../interfaces/navigator.interface";

import HomeNavigator from "./home.navigator";
import Settings from "../screens/settings.screen";

const Tab = createBottomTabNavigator<RootStackParamsList>();

const TAB_ICON = {
  home: "home",
  settings: "settings",
};

const createScreenOptions = ({ route }: CreateScreenOptionsProps) => {
  let iconName: string;

  return {
    tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
      if (focused) iconName = `${TAB_ICON[route.name]}`;
      else iconName = `${TAB_ICON[route.name]}-outline`;

      //@ts-ignore
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    headerShown: false,
  };
};

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="home" component={HomeNavigator} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
}
