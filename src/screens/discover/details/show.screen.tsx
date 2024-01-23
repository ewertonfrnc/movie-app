import { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SafeAreaComponent from '../../../components/safe-area.component';

import { theme } from '../../../constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../interfaces/navigator.interface';
import { BASE_IMAGE_URL, decimalToPercentage } from '../../../utils/tmdb.utils';
import { getFullYear, minToHours } from '../../../utils/time.utils';
import {
  fetchShowDetails,
  fetchShowSeasonDetails,
} from '../../../services/tmdb/shows.service';
import {
  Episode,
  MovieDetails,
  SeasonDetails,
} from '../../../interfaces/show.interface';
import CastAvatar from './components/cast-avatar.component';
import {
  addToFinishedSeasons,
  removeFromFinishedSeasons,
  removeFromWatchedMovies,
  updatedWatchedMovies,
} from '../../../services/supabase/user.service';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  setUser,
  setUserError,
  updateWatchedMovies,
} from '../../../redux/user/user.slice';
import Button from '../../../components/button.component';
import RadioButton from '../../../components/radio-button';
import Progress from './components/progress';
import { setMovieError } from '../../../redux/movies/movie.slice';
import {
  addMovieRow,
  getMovieById,
} from '../../../services/supabase/movie.service';

type ShowScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  'showDetails'
>;

const ShowScreen: FC<ShowScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const movies = useAppSelector((state) => state.movies.watchedMovies);

  const { showId, showType } = route.params;

  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [isWatchedMovie, setIsWatchedMovie] = useState(false);
  const [dbMovieInfo, setDbMovieInfo] = useState<MovieDetails>();

  const getMovieDetails = async () => {
    setLoading(true);

    try {
      const [details] = await Promise.all([fetchShowDetails(showId, showType)]);

      setMovieDetails(details);
      setIsWatchedMovie(
        !!user?.watchedMovies.find((movie) => movie.id === details.id)
      );

      const currentMovie = await getMovieById(details.id);
      setDbMovieInfo(currentMovie);
      console.log('currentMovie', currentMovie);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  async function markAsWatched() {
    if (!user || !movieDetails) return;

    try {
      setLoading(true);

      if (!isWatchedMovie) {
        const response = await addMovieRow(user.id, movieDetails.id);
        console.log(response);

        const { watchedMovies } = await updatedWatchedMovies(
          user,
          movieDetails
        );
        dispatch(updateWatchedMovies(watchedMovies));
        setIsWatchedMovie(true);
      } else {
        const updatedWatchedList = user?.watchedMovies.filter(
          (movie) => movie.id !== movieDetails.id
        );

        const { watchedMovies } = await removeFromWatchedMovies(
          user,
          updatedWatchedList
        );
        dispatch(updateWatchedMovies(watchedMovies));
        setIsWatchedMovie(false);
      }
    } catch (error) {
      dispatch(setMovieError(error as Error));
    }

    setLoading(false);
  }

  function goToEpisodesScreen(season: SeasonDetails) {
    if (movieDetails)
      navigation.navigate('episodes', {
        seriesId: movieDetails.id,
        season,
      });
  }

  async function watchSeasonHandler(season: SeasonDetails) {
    const watchedSeason = movieDetails?.seasons.find((s) => s.id === season.id);
    if (watchedSeason) watchedSeason.finished_watching = true;

    try {
      setLoading(true);

      if (user && watchedSeason) {
        console.log('watchedSeason', watchedSeason);

        const { episodes } = await fetchShowSeasonDetails(
          movieDetails.id,
          watchedSeason.season_number
        );

        const episodeInfo = episodes.map((episode: Episode) => ({
          episodeId: episode.id,
          showId: episode.show_id,
          seasonNumber: episode.season_number,
          finished_watching: true,
        }));
        console.log('seasonDetails', episodes);

        const updatedUser = await addToFinishedSeasons(user, {
          ...watchedSeason,
          episodes: episodeInfo,
        });
        dispatch(setUser(updatedUser));
      }
    } catch (error) {
      dispatch(setUserError(error as Error));
    }

    setLoading(false);
  }

  async function removeSeasonHandler(season: SeasonDetails) {
    try {
      setLoading(true);

      const updatedFinishedSeasons = user?.seriesFinishedSeasons.filter(
        (finishedSeason) => finishedSeason.id !== season.id
      );
      const updatedUser = await removeFromFinishedSeasons(
        user,
        updatedFinishedSeasons
      );
      dispatch(setUser(updatedUser));
    } catch (error) {
      dispatch(setUserError(error as Error));
    }

    setLoading(false);
  }

  useEffect(() => {
    getMovieDetails();
    console.log('movies', movies);
  }, [movies]);

  return (
    <SafeAreaComponent>
      {!movieDetails ? (
        <ActivityIndicator size={'large'} color={theme.COLORS.darkRed} />
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <ImageBackground
              style={styles.imageBackground}
              resizeMode='cover'
              source={{
                uri: `${BASE_IMAGE_URL}${movieDetails.backdrop_path}`,
              }}
            />

            <View style={styles.informationContainer}>
              <Image
                style={styles.posterImage}
                source={{
                  uri: `${BASE_IMAGE_URL}${movieDetails.poster_path}`,
                }}
              />

              <View style={styles.watchBtnContainer}>
                <Button
                  label={
                    isWatchedMovie
                      ? '➖ Remover da lista'
                      : '➕ Adicionar à lista'
                  }
                  loading={loading}
                  onPress={markAsWatched}
                />
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.title}>
                  {movieDetails.title || movieDetails.name}
                </Text>
                <Text style={styles.subtitle}>{movieDetails.tagline}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.sectionContainer}>
                <View style={styles.stats}>
                  <Text
                    style={[
                      styles.rank,
                      movieDetails.vote_average < 5
                        ? styles.badRank
                        : movieDetails.vote_average < 7
                        ? styles.goodRank
                        : styles.awesomeRank,
                    ]}
                  >
                    ⭐ {decimalToPercentage(movieDetails.vote_average)}
                  </Text>

                  <Text style={styles.subtitle}>
                    {getFullYear(
                      movieDetails.release_date || movieDetails.first_air_date
                    )}
                  </Text>

                  <Text style={styles.subtitle}>
                    {movieDetails.genres[0].name}
                  </Text>

                  {showType === 'movie' && (
                    <Text style={styles.subtitle}>
                      ⏳ {minToHours(movieDetails.runtime)}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.divider} />

              {showType === 'tv' && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.title}>Temporadas</Text>

                  {movieDetails?.seasons.map((season) => {
                    const currSeason = user?.seriesFinishedSeasons.find(
                      (s) => s.id === season.id
                    );

                    if (currSeason) console.log('currSeason', currSeason);

                    return (
                      <Pressable
                        key={season.id}
                        style={({ pressed }) => [
                          styles.progressContainer,
                          pressed && styles.pressed,
                        ]}
                        onPress={goToEpisodesScreen.bind(this, season)}
                      >
                        <RadioButton
                          selected={!!currSeason}
                          onPress={
                            currSeason?.finished_watching
                              ? removeSeasonHandler.bind(this, season)
                              : watchSeasonHandler.bind(this, season)
                          }
                        />

                        <View style={styles.progressInfoContainer}>
                          <Text
                            style={[styles.subtitle, { flex: 1 }]}
                            numberOfLines={2}
                          >
                            {season.name}
                          </Text>

                          <Progress
                            currentValue={
                              currSeason?.finished_watching
                                ? currSeason?.episode_count
                                : 0
                            }
                            totalValue={season.episode_count}
                          />

                          <Text style={styles.subtitle}>
                            {`${currSeason?.episode_count || 0} / ${
                              season.episode_count
                            }  >`}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}

              <View style={styles.sectionContainer}>
                <Text style={styles.title}>Sinopse</Text>
                <ScrollView>
                  <Text style={styles.subtitle}>{movieDetails.overview}</Text>
                </ScrollView>
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.title}>Elenco principal</Text>
              </View>

              <FlatList
                data={movieDetails.credits.cast}
                renderItem={({ item }) => <CastAvatar castMember={item} />}
                horizontal
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaComponent>
  );
};

export default ShowScreen;

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: theme.SPACING.xlg,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.lightDark,
  },
  pressed: {
    opacity: 0.5,
  },
  progressInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    height: 300,
  },
  divider: {
    height: 1,
    borderRadius: theme.SIZES.lg,
    marginHorizontal: theme.SPACING.xlg,
    marginBottom: theme.SPACING.xlg,
    backgroundColor: theme.COLORS.silver,
    opacity: 0.3,
  },
  informationContainer: {
    marginTop: theme.SPACING.lg,
    padding: theme.SPACING.lg,
    paddingTop: theme.SPACING.xxxlg,
  },
  sectionContainer: {
    paddingHorizontal: theme.SPACING.xlg,
    marginBottom: theme.SPACING.xlg,
  },
  title: {
    fontWeight: 'bold',
    fontSize: theme.SIZES.lg,
    color: theme.COLORS.whiteSmoke,
  },
  subtitle: {
    fontSize: theme.SIZES.md,
    color: theme.COLORS.silver,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: theme.SPACING.lg,
  },
  rank: {
    fontWeight: 'bold',
    fontSize: theme.SIZES.md,
  },
  badRank: {
    color: theme.COLORS.ranks.bad,
  },
  goodRank: {
    color: theme.COLORS.ranks.regular,
  },
  awesomeRank: {
    color: theme.COLORS.ranks.good,
  },
  posterImage: {
    width: 75,
    height: 100,
    borderRadius: 4,

    position: 'absolute',
    top: -50,
    left: 20,
  },
  watchBtnContainer: {
    width: '65%',
    position: 'absolute',
    top: 10,
    right: 20,
  },
});
