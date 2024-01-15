import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

import { theme } from '../constants';

import { fetchPopularMovies } from '../services/movies.service';

import SafeAreaComponent from '../components/safe-area.component';

const Home = () => {
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <SafeAreaComponent>
      <Text style={styles.text}>Home</Text>
    </SafeAreaComponent>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    color: theme.COLORS.text.primary,
  },
});
