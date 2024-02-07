import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { HomeStackParamsList } from '../interfaces/navigator.interface';

import BottomTabBar from '../components/BottomTabBar';
import ExploreScreen from '../features/explore/screens/explore.screen';
import SettingsScreen from '../features/account/screens/settings.screen';
import HomeScreen from '../features/home/screens/home.screen';

const HomeStack = createBottomTabNavigator<HomeStackParamsList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
    >
      <HomeStack.Screen name="activity" component={HomeScreen} />
      <HomeStack.Screen name="movies" component={ExploreScreen} />
      <HomeStack.Screen name="settings" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
