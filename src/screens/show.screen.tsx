import { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

import SafeAreaComponent from '../components/safe-area.component';

import { theme } from '../constants';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamsList } from '../interfaces/navigator.interface';

import { BASE_IMAGE_URL, decimalToPercentage } from '../utils/tmdb.utils';
import { minToHours } from '../utils/time.utils';

import {
  fetchMovieDetails,
  fetchMovieCredits,
} from '../services/shows.service';

import { MovieDetails, Cast } from '../interfaces/movie.interface';
import CastAvatar from '../components/cast-avatar.component';

type ShowScreenProps = {} & NativeStackScreenProps<
  HomeStackParamsList,
  'showDetails'
>;

const ShowScreen: FC<ShowScreenProps> = ({ route }) => {
  const { showId } = route.params;

  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [cast, setCast] = useState<Cast[]>([]);

  const getMovieDetails = async () => {
    const [details, cast] = await Promise.all([
      fetchMovieDetails(showId),
      fetchMovieCredits(showId),
    ]);

    setMovieDetails(details);
    setCast(cast);
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <SafeAreaComponent>
      {movieDetails && (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: `${BASE_IMAGE_URL}${movieDetails.backdrop_path}`,
            }}
          />

          <View style={styles.informationContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.title}>{movieDetails.title}</Text>
              <Text style={styles.subtitle}>{movieDetails.tagline}</Text>
            </View>

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
                  {decimalToPercentage(movieDetails.vote_average)}
                </Text>

                <Text style={styles.subtitle}>
                  {minToHours(movieDetails.runtime)}
                </Text>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.title}>Sinopse</Text>
              <Text style={styles.subtitle}>{movieDetails.overview}</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.title}>Elenco principal</Text>
            </View>

            <FlatList
              data={cast}
              renderItem={({ item }) => <CastAvatar castMember={item} />}
              horizontal
            />
          </View>
        </View>
      )}
    </SafeAreaComponent>
  );
};

export default ShowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: theme.SPACING.xxxlg,
  },
  image: {
    width: '100%',
    height: '30%',
    objectFit: 'cover',
  },
  informationContainer: {
    marginTop: theme.SPACING.lg,
    padding: theme.SPACING.lg,
  },
  sectionContainer: {
    paddingHorizontal: theme.SPACING.xlg,
    marginBottom: theme.SPACING.xlg,
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
  stats: {
    flexDirection: 'row',
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
});
