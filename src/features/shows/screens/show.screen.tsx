import React, { FC, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../interfaces/navigator.interface';
import { SeasonDetails } from '../../../interfaces/show.interface';

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
import { useAppSelector } from '../../../hooks/redux';

type ShowScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  'showDetails'
>;

const ShowScreen: FC<ShowScreenProps> = ({ navigation, route }) => {
  const movieDetails = route.params;

  const user = useAppSelector(({ user }) => user.userData);

  const [loading, setLoading] = useState(false);
  const [isWatchedMovie, setIsWatchedMovie] = useState(false);
  const [watchedByList, setWatchedByList] = useState([]);
  const [isMovieOnDB, setIsMovieOnDB] = useState(false);

  async function checkIfWatchedMovie() {
    setLoading(true);

    try {
      const watchedMovie = await getWatchedMovieById(movieDetails.id);

      setIsMovieOnDB(!!watchedMovie);
      setWatchedByList(watchedMovie.watchedBy);
      setIsWatchedMovie(
        !!watchedMovie && watchedMovie.watchedBy.includes(user.id),
      );
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  }

  async function addToWatchedMovies() {
    const movieObj = {
      id: movieDetails.id,
      title: movieDetails.title,
      tagline: movieDetails.tagline,
      backdropPath: movieDetails.backdrop_path,
      posterPath: movieDetails.poster_path,
      releaseDate: movieDetails.release_date,
      mediaType: movieDetails.media_type,
      runtime: movieDetails.runtime,
      voteAverage: movieDetails.vote_average,
      genre: movieDetails.genres[0].name,
      overview: movieDetails.overview,
    };

    setLoading(true);
    try {
      if (!isMovieOnDB && !isWatchedMovie) {
        await Promise.all([
          insertMovie(movieObj),
          await insertWatchedMovie({
            id: movieObj.id,
            title: movieObj.title,
            watchedBy: [user.id],
          }),
        ]);
      }

      if (isMovieOnDB && !isWatchedMovie) {
        await updateWatchedMovie(movieObj.id, [user.id, ...watchedByList]);
      }
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    checkIfWatchedMovie();
  }, []);

  function goToEpisodesScreen(season: SeasonDetails) {
    navigation.navigate('episodes', {
      seriesId: movieDetails.id,
      season,
    });
  }

  return (
    <SafeAreaComponent>
      <ScrollView>
        <ShowHeader
          loading={loading}
          isWatched={isWatchedMovie}
          title={movieDetails.title || movieDetails.name}
          tagline={movieDetails.tagline}
          backdrop_path={movieDetails.backdrop_path}
          poster_path={movieDetails.poster_path}
          onPress={addToWatchedMovies}
        />

        <ShowDescription
          releaseDate={movieDetails.release_date || movieDetails.first_air_date}
          runtime={movieDetails.runtime}
          mediaType={movieDetails.media_type}
          voteAverage={movieDetails.vote_average}
          genre={movieDetails.genres[0].name}
        />

        <SectionContainer title="Sinopse">
          <View>
            <TextComponent type={'body'}>{movieDetails.overview}</TextComponent>
          </View>
        </SectionContainer>

        <SectionContainer title="Elenco principal">
          <View style={styles.avatarContainer}>
            <FlatList
              data={movieDetails.credits.cast}
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
