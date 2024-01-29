import React, { FC, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../interfaces/navigator.interface';
import {
  SeasonDetails,
  WatchedMovie,
} from '../../../interfaces/show.interface';

import SafeAreaComponent from '../../../components/utility/safe-area.component';
import CastAvatar from '../components/cast-avatar.component';
import ShowHeader from '../components/header.component';
import { ShowDescription } from '../components/show-description.component';
import SectionContainer from '../components/section.component';
import TextComponent from '../../../components/typography/text.component';
import { theme } from '../../../constants';
import {
  getWatchedMovieById,
  insertMovie,
  insertWatchedMovie,
  updateWatchedMovie,
} from '../../../services/supabase/movie.service';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  setIsWatchedMovie,
  setWatchedMovie,
} from '../../../redux/movies/movie.slice';
import SeasonProgress from '../components/season-progress.component';

type ShowScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  'showDetails'
>;

const ShowScreen: FC<ShowScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();

  const TMDBMovie = route.params;

  const user = useAppSelector((state) => state.user.userData);
  const { movie, isWatchedByCurrentUser } = useAppSelector(
    ({ movies }) => movies,
  );

  const [loading, setLoading] = useState(false);

  async function checkIfWatchedMovie() {
    setLoading(true);

    try {
      const watchedMovie = await getWatchedMovieById(TMDBMovie.id);
      dispatch(setWatchedMovie(watchedMovie));

      if (user) {
        dispatch(setIsWatchedMovie(watchedMovie.watchedBy.includes(user.id)));
      }
    } catch (error) {
      dispatch(setIsWatchedMovie(false));
      dispatch(setWatchedMovie(null));
      console.log(error);
    }

    setLoading(false);
  }

  async function handleMovieHandler() {
    const movieObj: WatchedMovie = {
      id: TMDBMovie.id,
      title: TMDBMovie.title,
      tagline: TMDBMovie.tagline,
      backdropPath: TMDBMovie.backdrop_path,
      posterPath: TMDBMovie.poster_path,
      releaseDate: TMDBMovie.release_date,
      mediaType: TMDBMovie.media_type,
      runtime: TMDBMovie.runtime,
      voteAverage: TMDBMovie.vote_average,
      genre: TMDBMovie.genres[0].name,
      overview: TMDBMovie.overview,
    };

    setLoading(true);

    try {
      if (user && !movie) {
        await insertMovie(movieObj);

        const movieWatchedBy = await insertWatchedMovie({
          id: movieObj.id,
          title: movieObj.title,
          watchedBy: [user.id],
        });

        dispatch(setWatchedMovie(movieWatchedBy));
        dispatch(setIsWatchedMovie(movieWatchedBy.watchedBy.includes(user.id)));
      }

      if (user && movie) {
        const newWatchByList = isWatchedByCurrentUser
          ? movie.watchedBy.filter((id) => id !== user.id)
          : [user.id, ...movie.watchedBy];

        const movieWatchedBy = await updateWatchedMovie(
          movie.id,
          newWatchByList,
        );

        dispatch(setWatchedMovie(movieWatchedBy));
        dispatch(setIsWatchedMovie(movieWatchedBy.watchedBy.includes(user.id)));
      }
    } catch (error) {
      console.log('error', error);
    }

    setLoading(false);
  }

  useEffect(() => {
    checkIfWatchedMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToEpisodesScreen(season: SeasonDetails) {
    navigation.navigate('episodes', {
      seriesId: TMDBMovie.id,
      season,
    });
  }

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
          mediaType={TMDBMovie.media_type}
          voteAverage={TMDBMovie.vote_average}
          genre={TMDBMovie.genres[0].name}
        />

        {TMDBMovie.seasons && user && (
          <SeasonProgress
            user={user}
            seasons={TMDBMovie.seasons}
            onPress={goToEpisodesScreen}
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
