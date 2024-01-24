import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { HomeStackParamsList } from '../interfaces/navigator.interface';

import BottomTabBar from '../components/BottomTabBar';
import HomeScreen from '../features/explore/screens/home.screen';
import SettingsScreen from '../features/account/screens/settings.screen';

const HomeStack = createBottomTabNavigator<HomeStackParamsList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
    >
      <HomeStack.Screen name="movies" component={HomeScreen} />
      <HomeStack.Screen name="settings" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
