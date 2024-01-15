import { StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamsList } from '../interfaces/navigator.interface';

import Trending from './trending.screen';
import ShowScreen from './show.screen';

const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

const Home = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='trending' component={Trending} />
      <HomeStack.Screen name='showDetails' component={ShowScreen} />
    </HomeStack.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
