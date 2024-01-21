import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeStackParamsList } from "../interfaces/navigator.interface";

import MoviesScreen from "../screens/discover/movies.screen";
import ShowScreen from "../screens/discover/details";

const HomeStack = createStackNavigator<HomeStackParamsList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <HomeStack.Screen name="movies" component={MoviesScreen} />
      <HomeStack.Screen name="showDetails" component={ShowScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
