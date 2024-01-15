import { useState, useEffect, FC } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { theme } from '../constants';

import SafeAreaComponent from '../components/safe-area.component';
import ImageCard from '../components/image-card.component';

import {
  fetchTrendingMovies,
  fetchTrendingTvShows,
} from '../services/shows.service';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamsList } from '../interfaces/navigator.interface';
import { Show } from '../interfaces/movie.interface';

type TrendingProps = {} & NativeStackScreenProps<
  HomeStackParamsList,
  'trending'
>;

const Trending: FC<TrendingProps> = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState<Show[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Show[]>([]);

  const getShows = async () => {
    const [movies, tvShows] = await Promise.all([
      fetchTrendingMovies(),
      fetchTrendingTvShows(),
    ]);

      setPopularMovies(movies);
      setPopularTVShows(tvShows);
  };

  const onPressHandler = (showId: number) => {
    console.log('onPressHandler', showId);
    navigation.navigate('showDetails', { showId });
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <SafeAreaComponent>
      <View>
        <View style={styles.sectionHeading}>
          <Text style={styles.title}>Seleção semanal de filmes</Text>
          <Text style={styles.subtitle}>Ver mais</Text>
        </View>

        <FlatList
          data={popularMovies}
          renderItem={({ item }) => (
            <ImageCard show={item} onPress={onPressHandler} />
          )}
          horizontal
        />
      </View>

      <View>
        <View style={styles.sectionHeading}>
          <Text style={styles.title}>Seleção semanal de séries</Text>
          <Text style={styles.subtitle}>Ver mais</Text>
        </View>

        <FlatList
          data={popularTVShows}
          renderItem={({ item }) => (
            <ImageCard show={item} onPress={onPressHandler} />
          )}
          horizontal
        />
      </View>
    </SafeAreaComponent>
  );
};

export default Trending;

const styles = StyleSheet.create({
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.SPACING.xlg,
    paddingTop: theme.SPACING.lg,
    marginBottom: theme.SPACING.lg,
    marginTop: theme.SPACING.xxlg,
  },
  title: {
    fontWeight: 'bold',
    fontSize: theme.SIZES.lg,
    color: theme.COLORS.text.primary,
  },
  subtitle: {
    fontSize: theme.SIZES.md,
    color: theme.COLORS.text.secondary,
  },
});
