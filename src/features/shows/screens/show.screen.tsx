import React, { FC, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../interfaces/navigator.interface';
import { SeasonDetails, Show } from '../../../interfaces/show.interface';

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
  updateSeasonEpisodes,
} from '../../../services/supabase/movie.service';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  setIsWatchedMovie,
  setWatchedMovie,
} from '../../../redux/movies/movie.slice';
import SeasonProgress from '../components/season-progress.component';
import { fetchShowSeasonDetails } from '../../../services/tmdb/shows.service';

type ShowScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  'showDetails'
>;

const ShowScreen: FC<ShowScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();

  const TMDBMovie = route.params;

  const user = useAppSelector((state) => state.user.userData);
  const { movie, isMovieOnDB, isWatchedByCurrentUser } = useAppSelector(
    ({ movies }) => movies,
  );

  const [loading, setLoading] = useState(false);
  const [watchedEpisodes, setWatchedEpisodes] = useState([]);

  async function checkIfWatchedMovie() {
    setLoading(true);

    try {
      const show = await getShowOnDB(TMDBMovie.id);
      dispatch(setWatchedMovie(show));

      const watchedMovies = await getWatchedMovieById(TMDBMovie.id);
      const listOfWatchedEpisodes = await checkForWatchedEpisodes(TMDBMovie.id);
      console.log('listOfWatchedEpisodes', listOfWatchedEpisodes);

      setWatchedEpisodes(listOfWatchedEpisodes);
      dispatch(
        setIsWatchedMovie(
          !!watchedMovies.find(
            (watchedMovie) => watchedMovie?.userId === user?.id,
          ),
        ),
      );
    } catch (error) {
      dispatch(setIsWatchedMovie(false));
      dispatch(setWatchedMovie(null));
      console.log(error);
    }

    setLoading(false);
  }

  async function handleMovieHandler() {
    const movieObj: Show = {
      movieId: TMDBMovie.id,
      title: TMDBMovie.title || TMDBMovie.name,
      tagline: TMDBMovie.tagline,
      backdropPath: TMDBMovie.backdrop_path,
      posterPath: TMDBMovie.poster_path,
      releaseDate: TMDBMovie.release_date,
      mediaType: TMDBMovie.type ? 'tv' : 'movie',
      runtime: TMDBMovie.runtime,
      voteAverage: TMDBMovie.vote_average,
      genre: TMDBMovie.genres[0].name,
      overview: TMDBMovie.overview,
    };

    setLoading(true);

    try {
      if (user) {
        if (!isMovieOnDB) {
          await insertMovie(movieObj);
        }

        if (!isWatchedByCurrentUser) {
          const movieWatchedBy = await insertWatchedMovie({
            title: movieObj.title,
            movieId: movieObj.movieId,
            userId: user.id,
          });

          dispatch(setWatchedMovie(movieWatchedBy));
          dispatch(setIsWatchedMovie(movieWatchedBy.userId === user?.id));
        } else {
          if (movie) {
            await deleteWatchedMovieById(movie.movieId, user.id);
            dispatch(setIsWatchedMovie(false));
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }

    setLoading(false);
  }

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

  async function watchSeasonHandler(season: SeasonDetails) {
    const seasonDetails = await fetchShowSeasonDetails(
      TMDBMovie.id,
      season.season_number,
    );

    if (seasonDetails) {
      if (!isMovieOnDB) {
        await handleMovieHandler();
      }

      if (!watchedEpisodes.find((episode) => episode.userId === user?.id)) {
        const episodesWatched = seasonDetails.episodes.map((episode) => ({
          showId: TMDBMovie.id,
          userId: user?.id,
          episodeId: episode.id,
          seasonNumber: episode.season_number,
        }));

        const response = await updateSeasonEpisodes(episodesWatched);
        setWatchedEpisodes(response);
      } else {
        await deleteSeasonEpisodes(TMDBMovie.id, season.season_number);
        setWatchedEpisodes([]);
      }
    }
  }

  useEffect(() => {
    checkIfWatchedMovie();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaComponent>
      <ScrollView>
        <ShowHeader
          loading={loading}
          isWatched={isWatchedByCurrentUser}
          title={TMDBMovie.title || TMDBMovie.name}
          tagline={TMDBMovie.tagline}
          backdrop_path={TMDBMovie.backdrop_path}
          poster_path={TMDBMovie.poster_path}
          onPress={handleMovieHandler}
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
            onSeasonWatch={watchSeasonHandler}
          />
        )}

        <SectionContainer title="Sinopse">
          <View>
            <TextComponent type={'body'}>{TMDBMovie.overview}</TextComponent>
          </View>
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
});
