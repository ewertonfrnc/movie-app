import { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';

import { theme } from '../../../constants';

import { MovieDetails } from '../../../interfaces/show.interface';
import {
  HomeStackParamsList,
  RootStackParamsList,
} from '../../../interfaces/navigator.interface';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { readStorageItem } from '../../../utils/async-storage.utils';

import { useAppDispatch } from '../../../hooks/redux';
import { setUser, setUserError } from '../../../redux/user/user.slice';

import {
  fetchShowDetails,
  fetchTrendingMovies,
  fetchTrendingTvShows,
} from '../../../services/tmdb/shows.service';
import { fetchUser } from '../../../services/supabase/user.service';

import HeroImage from '../components/hero.component';
import TvShowsComponent from '../components/tv-shows.component';
import MoviesScreen from '../components/movies.component';
import SafeAreaComponent from '../../../components/utility/safe-area.component';

type MoviesProps = {} & BottomTabScreenProps<
  HomeStackParamsList & RootStackParamsList,
  'movies'
>;

const HomeScreen: FC<MoviesProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState<MovieDetails[]>([]);
  const [trendingTvShows, setTrendingTvShows] = useState<MovieDetails[]>([]);

  const [recentMovie, setRecentMovie] = useState('');
  const [isTvShows, setIsTvShows] = useState(false);

  async function getShows() {
    setLoading(true);

    try {
      const [trendingMovies, trendingTvShows] = await Promise.all([
        fetchTrendingMovies(),
        fetchTrendingTvShows(),
      ]);

      setTrendingMovies(trendingMovies);
      setTrendingTvShows(trendingTvShows);

      setRecentMovie(trendingMovies[0].backdrop_path);
    } catch (error) {
      console.log('An error occurred while fetching movies', error);
    }

    setLoading(false);
  }

  async function onPressHandler(params: { showId: number; showType: string }) {
    const movieDetails = await fetchShowDetails(params.showId, params.showType);
    if (movieDetails) {
      navigation.navigate('showDetails', movieDetails);
    }
  }

  const toggleSwitch = () => {
    setIsTvShows((previousState) => !previousState);
  };

  async function loadUserData() {
    const userIdFromStorage = await readStorageItem('user-id');

    try {
      setLoading(true);

      const userData = await fetchUser(userIdFromStorage);
      dispatch(setUser(userData));
    } catch (error) {
      dispatch(setUserError(error as Error));
    }

    setLoading(false);
  }

  useEffect(() => {
    loadUserData();
    getShows();
  }, []);

  return (
    <SafeAreaComponent>
      <ScrollView>
        <HeroImage backdropPath={recentMovie} />

        <Switch
          trackColor={{
            false: theme.COLORS.silver,
            true: theme.COLORS.whiteSmoke,
          }}
          thumbColor={isTvShows ? theme.COLORS.red : theme.COLORS.darkRed}
          onValueChange={toggleSwitch}
          value={isTvShows}
        />

        <View>
          {isTvShows ? (
            <TvShowsComponent
              loading={loading}
              trendingShow={trendingTvShows}
              onPress={onPressHandler}
            />
          ) : (
            <MoviesScreen
              loading={loading}
              trendingShow={trendingMovies}
              onPress={onPressHandler}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
