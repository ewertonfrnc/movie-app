import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { theme } from "../../constants";

import SafeAreaComponent from "../../components/safe-area.component";
import ImageCard from "../../components/image-card.component";

import { fetchTrendingMovies } from "../../services/tmdb/shows.service";

import { HomeStackParamsList } from "../../interfaces/navigator.interface";
import { MovieDetails } from "../../interfaces/movie.interface";

import { fetchUser } from "../../services/supabase/user.service";
import { readStorageItem } from "../../utils/async-storage.utils";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUser, setUserError } from "../../redux/user/user.slice";
import { BASE_IMAGE_URL } from "../../utils/tmdb.utils";

type MoviesProps = {} & NativeStackScreenProps<HomeStackParamsList, "movies">;

const MoviesScreen: FC<MoviesProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ user }) => user);

  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState<MovieDetails[]>([]);
  const [recentMovie, setRecentMovie] = useState("");

  async function getShows() {
    setLoading(true);

    try {
      const [trendingMovies] = await Promise.all([fetchTrendingMovies()]);
      setTrendingMovies(trendingMovies);
      setRecentMovie(trendingMovies[0].backdrop_path);
    } catch (error) {
      console.log("An error occurred while fetching movies", error);
    }

    setLoading(false);
  }

  const onPressHandler = (params: { showId: number; showType: string }) => {
    navigation.navigate("showDetails", {
      showId: params.showId,
      showType: params.showType,
    });
  };

  async function loadUserData() {
    const userIdFromStorage = await readStorageItem("user-id");

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
        <ImageBackground
          style={styles.imageStyle}
          source={{ uri: `${BASE_IMAGE_URL}${recentMovie}` }}
          resizeMode={"cover"}
        >
          <View style={styles.blurWrap}>
            <ImageBackground
              source={{ uri: `${BASE_IMAGE_URL}${recentMovie}` }}
              resizeMode={"cover"}
              blurRadius={Platform.OS === "ios" ? 8 : 3}
              style={styles.blurImageStyle}
            />
          </View>
        </ImageBackground>

        <View>
          <View style={styles.sectionHeading}>
            <Text style={styles.title}>🔥 Seleção semanal</Text>
            <Text style={styles.subtitle}>Ver mais</Text>
          </View>

          {loading ? (
            <ActivityIndicator size={"large"} color={theme.COLORS.darkRed} />
          ) : (
            <FlatList
              data={trendingMovies}
              renderItem={({ item }) => (
                <ImageCard show={item} onPress={onPressHandler} />
              )}
              horizontal
            />
          )}
        </View>

        <View>
          <View style={styles.sectionHeading}>
            <Text style={styles.title}>Vistos recentemente</Text>
            <Text style={styles.subtitle}>Ver mais</Text>
          </View>

          {loading ? (
            <ActivityIndicator size={"large"} color={theme.COLORS.darkRed} />
          ) : user?.watchedMovies.length ? (
            <FlatList
              data={user?.watchedMovies}
              renderItem={({ item }) => (
                <ImageCard show={item} onPress={onPressHandler} />
              )}
              horizontal
            />
          ) : (
            <Text style={styles.subtitle}>
              Você não assistiu nenhum filme recentemente.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaComponent>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  heroImage: {
    height: 400,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.SPACING.xlg,
    paddingTop: theme.SPACING.lg,
    marginBottom: theme.SPACING.lg,
    marginTop: theme.SPACING.xxlg,
  },
  title: {
    fontWeight: "bold",
    fontSize: theme.SIZES.lg,
    color: theme.COLORS.text.primary,
  },
  subtitle: {
    fontSize: theme.SIZES.md,
    color: theme.COLORS.text.secondary,
  },

  blurWrap: {
    height: 150, //Here we need to specify the height of blurred part
    overflow: "hidden",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  imageStyle: {
    height: 300,
  },
  blurImageStyle: {
    height: 300,
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
  },
});
