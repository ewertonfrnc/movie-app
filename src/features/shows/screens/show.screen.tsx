import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../interfaces/navigator.interface';
import {
  SeasonDetails,
  SerializedShow,
  Show,
  SUPAEpisode,
  TMDBShow,
} from '../../../interfaces/show.interface';

import SafeAreaComponent from '../../../components/utility/safe-area.component';
import CastAvatar from '../components/cast-avatar.component';
import ShowHeader from '../components/header.component';
import { ShowDescription } from '../components/show-description.component';
import SectionContainer from '../components/section.component';
import TextComponent from '../../../components/typography/text.component';
import { theme } from '../../../constants';
import {
  checkForWatchedEpisodes,
  deleteSeasonEpisodes,
  deleteWatchedMovieById,
  getShowOnDB,
  getWatchedMovieById,
  insertMovie,
  insertWatchedMovie,
  readWatchlistedShows,
  removeWatchlistedShows,
  updateSeasonEpisodes,
  updateWatchlistedShows,
} from '../../../services/supabase/movie.service';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  setIsWatchedMovie,
  setWatchedEpisodes,
  setWatchedMovie,
  setWatchList,
} from '../../../redux/movies/movie.slice';
import SeasonProgress from '../components/season-progress.component';
import { fetchShowSeasonDetails } from '../../../services/tmdb/shows.service';
import { Ionicons } from '@expo/vector-icons';
import { serializeTMDBShow } from '../helpers/show.helpers';

type ShowScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  'showDetails'
>;

const ShowScreen: FC<ShowScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();

  const TMDBMovie = route.params;

  const user = useAppSelector((state) => state.user.userData);
  const { watchList, isWatchedByCurrentUser, watchedEpisodes } = useAppSelector(
    ({ movies }) => movies,
  );

  const [loading, setLoading] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  async function checkIfWatchedMovie() {
    setLoading(true);

    try {
      if (user) {
        const watchlistedShows = await readWatchlistedShows(user?.id);

        if (watchlistedShows) {
          dispatch(setWatchList(watchlistedShows));

          dispatch(
            setIsWatchedMovie(
              watchList.find((show) => show.showId === TMDBMovie.id)?.userId ===
                user?.id,
            ),
          );
        }
      }
    } catch (error) {}

    setLoading(false);
  }

  // async function watchShowHandler() {
  //   const movieObj: Show = {
  //     movieId: TMDBMovie.id,
  //     title: TMDBMovie.title || TMDBMovie.name,
  //     tagline: TMDBMovie.tagline,
  //     backdropPath: TMDBMovie.backdrop_path,
  //     posterPath: TMDBMovie.poster_path,
  //     releaseDate: TMDBMovie.release_date,
  //     mediaType: TMDBMovie.type ? 'tv' : 'movie',
  //     runtime: TMDBMovie.runtime,
  //     voteAverage: TMDBMovie.vote_average,
  //     genre: TMDBMovie.genre[0].name,
  //     overview: TMDBMovie.overview,
  //   };

  //   setLoading(true);

  //   try {
  //     if (user) {
  //       if (!isMovieOnDB) {
  //         await insertMovie(movieObj);
  //       }

  //       if (!isWatchedByCurrentUser) {
  //         const movieWatchedBy = await insertWatchedMovie({
  //           title: movieObj.title,
  //           movieId: movieObj.movieId,
  //           userId: user.id,
  //         });

  //         dispatch(setWatchedMovie(movieWatchedBy));
  //         dispatch(setIsWatchedMovie(movieWatchedBy.userId === user?.id));
  //       } else {
  //         if (movie) {
  //           await deleteWatchedMovieById(movie.movieId, user.id);
  //           dispatch(setIsWatchedMovie(false));
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }

  //   setLoading(false);
  // }

  async function goToEpisodesScreen(season: SeasonDetails) {
    const episodes = await fetchShowSeasonDetails(
      TMDBMovie.id,
      season.season_number,
    );

    if (episodes) {
      navigation.navigate('episodes', {
        seasonEpisodes: episodes,
        watchedEpisodes,
      });
    }
  }

  // async function watchSeasonHandler(season: SeasonDetails) {
  //   const seasonDetails = await fetchShowSeasonDetails(
  //     TMDBMovie.id,
  //     season.season_number,
  //   );

  //   if (seasonDetails) {
  //     if (!isMovieOnDB || !isWatchedByCurrentUser) {
  //       await watchShowHandler();
  //     }

  //     const hasWatched = !!watchedEpisodes
  //       .filter((episode) => episode.seasonNumber === season.season_number)
  //       .find((episode) => episode.userId === user?.id);

  //     if (user && !hasWatched) {
  //       const episodesWatched: SUPAEpisode[] = seasonDetails.episodes.map(
  //         (episode) => ({
  //           showId: TMDBMovie.id,
  //           userId: user.id,
  //           episodeId: episode.id,
  //           seasonNumber: episode.season_number,
  //         }),
  //       );

  //       const newWatchedEpisodes = await updateSeasonEpisodes(episodesWatched);
  //       dispatch(
  //         setWatchedEpisodes([...watchedEpisodes, ...newWatchedEpisodes]),
  //       );
  //     } else {
  //       const updatedWatchedEpisodes = watchedEpisodes.filter(
  //         (episode) => episode.seasonNumber !== season.season_number,
  //       );
  //       await deleteSeasonEpisodes(TMDBMovie.id, season.season_number);
  //       dispatch(setWatchedEpisodes(updatedWatchedEpisodes));
  //     }
  //   }
  // }

  async function addToWatchlist(serializedShow: SerializedShow) {
    const watchlistedShows = await updateWatchlistedShows(serializedShow);
    dispatch(setWatchList([...watchlistedShows, ...watchList]));

    dispatch(
      setIsWatchedMovie(
        watchlistedShows.find((show) => show.showId === TMDBMovie.id)
          ?.userId === user?.id,
      ),
    );
  }

  async function watchlistHandler() {
    setLoading(true);

    const foundShow = !!watchList.find((show) => show.showId === TMDBMovie.id);

    if (TMDBMovie && user) {
      const serializedShow = serializeTMDBShow(TMDBMovie, user);

      try {
        if (!foundShow) {
          await addToWatchlist(serializedShow);
        } else {
          await removeWatchlistedShows(TMDBMovie.id, user.id);

          dispatch(
            setWatchList(
              watchList.filter((show) => show.showId !== TMDBMovie.id),
            ),
          );
          dispatch(setIsWatchedMovie(false));
        }
      } catch (error) {
        console.log(error.message);
      }

      setLoading(false);
    }
  }

  const toggleNumberOfLines = () => setTextShown(!textShown);

  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  useEffect(() => {
    checkIfWatchedMovie();
  }, []);

  return (
    <SafeAreaComponent>
      <Pressable
        style={({ pressed }) => [
          styles.searchContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="chevron-back"
          size={theme.SIZES.xlg}
          color={theme.COLORS.red}
        />
      </Pressable>

      <ScrollView>
        <ShowHeader
          loading={loading}
          isWatched={isWatchedByCurrentUser}
          title={TMDBMovie.title || TMDBMovie.name}
          tagline={TMDBMovie.tagline}
          backdrop_path={TMDBMovie.backdrop_path}
          poster_path={TMDBMovie.poster_path}
          onPress={watchlistHandler}
        />

        <ShowDescription
          releaseDate={TMDBMovie.release_date || TMDBMovie.first_air_date}
          runtime={TMDBMovie.runtime}
          mediaType={TMDBMovie.type}
          voteAverage={TMDBMovie.vote_average}
          genre={TMDBMovie.genres[0].name}
        />

        {TMDBMovie.seasons && user && (
          <SeasonProgress
            user={user}
            seasons={TMDBMovie.seasons}
            watchedEpisodes={watchedEpisodes}
            onEpisodePress={goToEpisodesScreen}
            onSeasonWatch={() => {}}
          />
        )}

        <SectionContainer title="Sinopse">
          <TextComponent
            type={'body'}
            textProps={{
              onTextLayout: onTextLayout,
              numberOfLines: textShown ? undefined : 4,
            }}
          >
            {TMDBMovie.overview}
          </TextComponent>

          {lengthMore && (
            <TextComponent
              type="body"
              textProps={{
                onPress: toggleNumberOfLines,
                style: { color: theme.COLORS.red },
              }}
            >
              {textShown ? 'Ler menos' : 'Ler mais'}
            </TextComponent>
          )}
        </SectionContainer>

        <SectionContainer title="Elenco principal">
          <View style={styles.avatarContainer}>
            <FlatList
              data={TMDBMovie.credits.cast}
              renderItem={({ item }) => <CastAvatar castMember={item} />}
              horizontal
            />
          </View>
        </SectionContainer>
      </ScrollView>
    </SafeAreaComponent>
  );
};

export default ShowScreen;

const styles = StyleSheet.create({
  avatarContainer: {
    marginBottom: theme.SPACING.xxxlg,
    marginTop: theme.SPACING.lg,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    backgroundColor: theme.COLORS.lightDark,
    padding: theme.SPACING.lg,
    borderRadius: theme.SIZES.md,
    zIndex: 9999,
    position: 'absolute',
    top: 50,
    left: 20,
  },
  pressed: { opacity: 0.5 },
});
