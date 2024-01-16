import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeStackParamsList } from "../interfaces/navigator.interface";

import Trending from "../screens/shows/trending.screen";
import ShowScreen from "../screens/shows/details";

const HomeStack = createStackNavigator<HomeStackParamsList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <HomeStack.Screen name="trending" component={Trending} />
      <HomeStack.Screen name="showDetails" component={ShowScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
