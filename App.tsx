import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as RNStatuBar,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  RootStackParamsList,
  CreateScreenOptionsProps,
  TabBarIconProps,
} from './src/interfaces/navigator.interface';

import Home from './src/screens/home.screen';
import Settings from './src/screens/settings.screen';

const Tab = createBottomTabNavigator<RootStackParamsList>();

const TAB_ICON = {
  home: 'home',
  settings: 'settings',
};

const createScreenOptions = ({ route }: CreateScreenOptionsProps) => {
  let iconName: string;

  return {
    tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
      if (focused) iconName = `${TAB_ICON[route.name]}`;
      else iconName = `${TAB_ICON[route.name]}-outline`;

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    headerShown: false,
  };
};

export default function App() {
  return (
    <>
      <StatusBar style='auto' />

      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name='home' component={Home} />
            <Tab.Screen name='settings' component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Number(Platform.OS === 'android' && RNStatuBar.currentHeight),
  },
});
