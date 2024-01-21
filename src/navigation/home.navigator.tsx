import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeStackParamsList } from "../interfaces/navigator.interface";

import Movies from "../screens/discover/movies.screen";
import ShowScreen from "../screens/discover/details";
import TvShowsScreen from "../screens/discover/tv-shows.screen";

const HomeStack = createStackNavigator<HomeStackParamsList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <HomeStack.Screen name="movies" component={Movies} />
      <HomeStack.Screen name="tvshows" component={TvShowsScreen} />
      <HomeStack.Screen name="showDetails" component={ShowScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
