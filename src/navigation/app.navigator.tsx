import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import HomeNavigator from "./home.navigator";
import ShowScreen from "../screens/discover/details";
import EpisodesScreen from "../screens/discover/details/episodes.screen";

import { RootStackParamsList } from "../interfaces/navigator.interface";

const Stack = createStackNavigator<RootStackParamsList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="home" component={HomeNavigator} />
      <Stack.Screen name="showDetails" component={ShowScreen} />
      <Stack.Screen name="episodes" component={EpisodesScreen} />
    </Stack.Navigator>
  );
}
