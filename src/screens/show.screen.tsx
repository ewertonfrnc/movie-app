import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamsList } from '../interfaces/navigator.interface';

type ShowScreenProps = {} & NativeStackScreenProps<
  HomeStackParamsList,
  'showDetails'
>;

const ShowScreen: FC<ShowScreenProps> = ({ route }) => {
  const { showId } = route.params;

  return (
    <View style={styles.container}>
      <Text>ShowScreen</Text>
      <Text>{showId}</Text>
    </View>
  );
};

export default ShowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
