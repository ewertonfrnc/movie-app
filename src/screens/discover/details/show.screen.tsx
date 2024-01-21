import { FC, useEffect, useState } from "react";
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
} from "react-native";
import SafeAreaComponent from "../../../components/safe-area.component";

import { theme } from "../../../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamsList } from "../../../interfaces/navigator.interface";
import { BASE_IMAGE_URL, decimalToPercentage } from "../../../utils/tmdb.utils";
import { getFullYear, minToHours } from "../../../utils/time.utils";
import { fetchShowDetails } from "../../../services/tmdb/shows.service";
import { MovieDetails } from "../../../interfaces/movie.interface";
import CastAvatar from "./components/cast-avatar.component";
import {
  removeFromWatchedMovies,
  updatedWatchedMovies,
} from "../../../services/supabase/user.service";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setUserError,
  updateWatchedMovies,
} from "../../../redux/user/user.slice";
import Button from "../../../components/button.component";
import Progress from "./components/progress";
import RadioButton from "../../../components/radio-button";

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
  const [isWatchedMovie, setIsWatchedMovie] = useState(false);

  const getMovieDetails = async () => {
    setLoading(true);

    try {
      const [details] = await Promise.all([fetchShowDetails(showId, showType)]);

      setMovieDetails(details);
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

      if (!isWatchedMovie) {
        const { watchedMovies } = await updatedWatchedMovies(
          user,
          movieDetails,
        );
        dispatch(updateWatchedMovies(watchedMovies));
        setIsWatchedMovie(true);
      } else {
        const updatedWatchedList = user?.watchedMovies.filter(
          (movie) => movie.id !== movieDetails.id,
        );

        const { watchedMovies } = await removeFromWatchedMovies(
          user,
          updatedWatchedList,
        );
        dispatch(updateWatchedMovies(watchedMovies));
        setIsWatchedMovie(false);
      }
    } catch (error) {
      dispatch(setUserError(error as Error));
    }

    setLoading(false);
  }

  useEffect(() => {
    getMovieDetails();
    console.log("details", movieDetails);
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
                      ? "➖ Remover da lista"
                      : "➕ Adicionar à lista"
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
                      movieDetails.release_date || movieDetails.first_air_date,
                    )}
                  </Text>

                  <Text style={styles.subtitle}>
                    {movieDetails.genres[0].name}
                  </Text>

                  <Text style={styles.subtitle}>
                    ⏳ {minToHours(movieDetails.runtime)}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              {showType === "tv" && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.title}>Temporadas</Text>

                  {movieDetails?.seasons.map((season) => (
                    <Pressable
                      key={season.id}
                      style={({ pressed }) => [
                        styles.progressContainer,
                        pressed && styles.pressed,
                      ]}
                    >
                      <RadioButton selected={true} />

                      <View style={styles.progressInfoContainer}>
                        <Text style={styles.subtitle}>{season.name}</Text>

                        <Progress
                          currentValue={3}
                          totalValue={season.episode_count}
                        />

                        <Text
                          style={styles.subtitle}
                        >{`0 / ${season.episode_count}  >`}</Text>
                      </View>
                    </Pressable>
                  ))}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: theme.SPACING.xlg,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.lightDark,
  },
  pressed: {
    opacity: 0.5,
  },
  progressInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
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
    justifyContent: "space-evenly",
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
  posterImage: {
    width: 75,
    height: 100,
    borderRadius: 4,

    position: "absolute",
    top: -50,
    left: 20,
  },
  watchBtnContainer: {
    width: "65%",
    position: "absolute",
    top: 10,
    right: 20,
  },
});
