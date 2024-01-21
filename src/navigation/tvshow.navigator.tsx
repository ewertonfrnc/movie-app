import { StyleSheet } from "react-native";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import tvShowsScreen from "../screens/discover/components/tv-shows.component";
import showScreen from "../screens/discover/details";

import { ShowStackParamsList } from "../interfaces/navigator.interface";

const TvShowStack = createStackNavigator<ShowStackParamsList>();

const TvShowNavigator = () => {
  return (
    <TvShowStack.Navigator
      initialRouteName="tvshows"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <TvShowStack.Screen name="tvshows" component={tvShowsScreen} />
      <TvShowStack.Screen name="movieDetails" component={showScreen} />
    </TvShowStack.Navigator>
  );
};

export default TvShowNavigator;

const styles = StyleSheet.create({});
