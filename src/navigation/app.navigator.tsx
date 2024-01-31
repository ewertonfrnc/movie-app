import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import HomeNavigator from './home.navigator';
import ShowScreen from '../features/shows/screens/show.screen';
import EpisodesScreen from '../features/shows/screens/episodes.screen';
import SearchScreen from '../features/search/screens/search.screen';

import { RootStackParamsList } from '../interfaces/navigator.interface';
import EpisodeDetailScreen from '../features/shows/screens/episode-detail.screen';

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
      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{
          ...TransitionPresets.ModalFadeTransition,
        }}
      />
      <Stack.Screen name="showDetails" component={ShowScreen} />
      <Stack.Screen name="episodes" component={EpisodesScreen} />
      <Stack.Screen name="episodeDetails" component={EpisodeDetailScreen} />
    </Stack.Navigator>
  );
}
