import { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, View, Image } from 'react-native';

import { theme } from '../constants';

import { fetchPopularMovies } from '../services/movies.service';

import SafeAreaComponent from '../components/safe-area.component';
import ImageCard from '../components/image-card.component';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const popularMovies = await fetchPopularMovies();
      setPopularMovies(popularMovies);
    };

    getMovies();
  }, []);

  return (
    <SafeAreaComponent>
      <View>
        <View style={styles.sectionHeading}>
          <Text style={styles.text}>Filmes populares</Text>
          <Text style={styles.text}>Ver mais</Text>
        </View>

        <FlatList
          data={popularMovies}
          renderItem={({ item }) => <ImageCard show={item} />}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
    </SafeAreaComponent>
  );
};

export default Home;

const styles = StyleSheet.create({
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.SPACING.xlg,
  },
  text: {
    color: theme.COLORS.text.primary,
  },
});
