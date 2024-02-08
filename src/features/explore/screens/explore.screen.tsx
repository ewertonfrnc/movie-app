import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
  useWindowDimensions,
} from 'react-native';

import { theme } from '../../../constants';

import { TMDBMovie } from '../../../interfaces/show.interface';
import {
  HomeStackParamsList,
  RootStackParamsList,
} from '../../../interfaces/navigator.interface';

import { Ionicons } from '@expo/vector-icons';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { readStorageItem } from '../../../utils/async-storage.utils';

import { useAppDispatch } from '../../../hooks/redux';
import { setUser } from '../../../redux/user/user.slice';

import {
  fetchNowPlayingMovies,
  fetchShowDetails,
  fetchTrendingMovies,
  fetchTrendingShows,
  fetchTrendingTvShows,
} from '../../../services/tmdb/shows.service';
import { fetchUser } from '../../../services/supabase/user.service';

import HeroImage from '../components/hero.component';
import TvShowsComponent from '../components/tv-shows.component';
import MoviesScreen from '../components/movies.component';
import SafeAreaComponent from '../../../components/utility/safe-area.component';
import TextComponent from '../../../components/typography/text.component';
import { BASE_IMAGE_URL } from '../../../utils/tmdb.utils';
import { FlatList } from 'react-native-gesture-handler';
import ImageCard from '../../../components/image-card.component';

type MoviesProps = {} & BottomTabScreenProps<
  HomeStackParamsList & RootStackParamsList,
  'movies'
>;

const ExploreScreen: FC<MoviesProps> = ({ navigation }) => {
  const dispatch = useAppDispatch(),
    { width } = useWindowDimensions();

  const [loading, setLoading] = useState(false),
    [recentMovie, setRecentMovie] = useState(''),
    [nowPlaying, setNowPlaying] = useState<TMDBMovie[]>([]),
    [trending, setTrending] = useState<TMDBMovie[]>();

  async function getShows() {
    setLoading(true);

    try {
      const [nowPlayingMovies, trendingShows] = await Promise.all([
        fetchNowPlayingMovies(),
        fetchTrendingShows(),
      ]);

      setTrending(trendingShows);
      setNowPlaying(nowPlayingMovies);
      setRecentMovie(trendingShows[0].backdrop_path);
    } catch (error) {
      console.log('An error occurred while fetching movies', error);
    }

    setLoading(false);
  }

  async function onPressHandler(params: { showId: number; showType: string }) {
    const showDetails = await fetchShowDetails(params.showId, params.showType);

    if (showDetails) {
      navigation.navigate('showDetails', showDetails);
    }
  }

  async function loadUserData() {
    const userIdFromStorage = await readStorageItem('user-id');

    try {
      setLoading(true);

      const userData = await fetchUser(userIdFromStorage);
      dispatch(setUser(userData));
    } catch (error) {
      // dispatch(setUserError(error as Error));
    }

    setLoading(false);
  }

  function searchHandler() {
    navigation.navigate('search');
  }

  useEffect(() => {
    loadUserData();
    getShows();
  }, []);

  return (
    <SafeAreaComponent>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{ uri: `${BASE_IMAGE_URL}${recentMovie}` }}
          style={styles.header}
        >
          <View>
            <TextComponent type="title">Explorar</TextComponent>
            <TextComponent type="caption">Descubra novos mundos</TextComponent>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.searchContainer,
              pressed && styles.onPressed,
            ]}
            onPress={searchHandler}
          >
            <Ionicons
              name="search"
              size={theme.SIZES.xlg}
              color={theme.COLORS.red}
            />
          </Pressable>
        </ImageBackground>

        <HeroImage nowPlayingMovies={nowPlaying} />

        <View style={styles.section}>
          <TextComponent type="title">Em alta</TextComponent>

          <View
            style={[
              styles.showList,
              { gap: width < 400 ? theme.SPACING.sm : theme.SPACING.xlg },
            ]}
          >
            {loading ? (
              <ActivityIndicator size={'large'} color={theme.COLORS.darkRed} />
            ) : (
              trending &&
              trending.map((show) => (
                <ImageCard key={show.id} show={show} onPress={onPressHandler} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaComponent>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.SPACING.xxxlg,
  },
  section: { padding: theme.SPACING.xlg },
  header: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: theme.SPACING.xlg,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    backgroundColor: theme.COLORS.lightDark,
    padding: theme.SPACING.lg,
    borderRadius: theme.SIZES.md,
  },
  onPressed: { opacity: 0.5 },
  showList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.SPACING.xlg,
    marginBottom: theme.SPACING.xxxlg,
  },
});
