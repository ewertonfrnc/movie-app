import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import SafeAreaComponent from "../../../components/safe-area.component";

import { theme } from "../../../constants";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamsList } from "../../../interfaces/navigator.interface";

import { BASE_IMAGE_URL, decimalToPercentage } from "../../../utils/tmdb.utils";
import { getFullYear, minToHours } from "../../../utils/time.utils";

import {
  fetchShowCredits,
  fetchShowDetails,
} from "../../../services/tmdb/shows.service";

import { Cast, MovieDetails } from "../../../interfaces/movie.interface";

import Button from "../../../components/button.component";
import CastAvatar from "../../../components/cast-avatar.component";
import { updatedWatchedMovies } from "../../../services/supabase/user.service";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setUserError,
  updateWatchedMovies,
} from "../../../redux/user/user.slice";

type ShowScreenProps = {} & NativeStackScreenProps<
  HomeStackParamsList,
  "showDetails"
>;

const ShowScreen: FC<ShowScreenProps> = ({ route }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ user }) => user);

  const { showId, showType } = route.params;

  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [cast, setCast] = useState<Cast[]>([]);
  const [isWatchedMovie, setIsWatchedMovie] = useState(false);

  const getMovieDetails = async () => {
    setLoading(true);

    try {
      const [details, cast] = await Promise.all([
        fetchShowDetails(showId, showType),
        fetchShowCredits(showId, showType),
      ]);

      setMovieDetails(details);
      setCast(cast);
      setIsWatchedMovie(
        !!user?.watchedMovies.find((movie) => movie.id === details.id),
      );
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  async function markAsWatched() {
    if (!user || !movieDetails) return;

    try {
      setLoading(true);

      const { watchedMovies } = await updatedWatchedMovies(user, movieDetails);
      dispatch(updateWatchedMovies(watchedMovies));
      setIsWatchedMovie(true);
    } catch (error) {
      dispatch(setUserError(error as Error));
    }

    setLoading(false);
  }

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <SafeAreaComponent>
      {!movieDetails ? (
        <ActivityIndicator size={"large"} color={theme.COLORS.darkRed} />
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <ImageBackground
              style={styles.imageBackground}
              resizeMode="cover"
              source={{
                uri: `${BASE_IMAGE_URL}${movieDetails.backdrop_path}`,
              }}
            />

            <View style={styles.informationContainer}>
              <View style={styles.sectionContainer}>
                <Text style={styles.title}>
                  {movieDetails.title || movieDetails.name}
                </Text>
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
                    {getFullYear(
                      movieDetails.release_date || movieDetails.first_air_date,
                    )}
                  </Text>

                  <Text style={styles.subtitle}>
                    {minToHours(movieDetails.runtime)}
                  </Text>
                </View>
              </View>

              <View style={styles.sectionContainer}>
                <Button
                  label={
                    isWatchedMovie
                      ? "✅ Você já assistiu esse filme"
                      : "▶️ Marcar como assistido"
                  }
                  loading={loading}
                  onPress={markAsWatched}
                />
              </View>

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
                data={cast}
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
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    height: 300,
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
    fontWeight: "bold",
    fontSize: theme.SIZES.lg,
    color: theme.COLORS.whiteSmoke,
  },
  subtitle: {
    fontSize: theme.SIZES.md,
    color: theme.COLORS.silver,
  },
  stats: {
    flexDirection: "row",
    gap: theme.SPACING.lg,
  },
  rank: {
    fontWeight: "bold",
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
