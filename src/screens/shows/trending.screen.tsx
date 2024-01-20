import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { theme } from "../../constants";

import SafeAreaComponent from "../../components/safe-area.component";
import ImageCard from "../../components/image-card.component";

import { fetchTrending } from "../../services/tmdb/shows.service";

import { HomeStackParamsList } from "../../interfaces/navigator.interface";
import { MovieDetails } from "../../interfaces/movie.interface";

import { fetchUser } from "../../services/supabase/user.service";
import { readStorageItem } from "../../utils/async-storage.utils";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUser, setUserError } from "../../redux/user/user.slice";

type TrendingProps = {} & NativeStackScreenProps<
  HomeStackParamsList,
  "trending"
>;

const Trending: FC<TrendingProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ user }) => user);

  const [loading, setLoading] = useState(false);
  const [recentlyWatched, setRecentlyWatched] = useState<MovieDetails[]>([]);
  const [trending, setTrending] = useState<MovieDetails[]>([]);

  async function getShows() {
    setLoading(true);

    try {
      const [trendingShows] = await Promise.all([fetchTrending()]);
      setTrending(trendingShows);
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

    if (user) console.log("user", user?.id, user?.watchedMovies);
  }, []);

  return (
    <SafeAreaComponent>
      <ScrollView>
        <View>
          <View style={styles.sectionHeading}>
            <Text style={styles.title}>🔥 Seleção semanal</Text>
            <Text style={styles.subtitle}>Ver mais</Text>
          </View>

          {loading ? (
            <ActivityIndicator size={"large"} color={theme.COLORS.darkRed} />
          ) : (
            <FlatList
              data={trending}
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

export default Trending;

const styles = StyleSheet.create({
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
});
