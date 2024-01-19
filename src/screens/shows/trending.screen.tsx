import { FC, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { theme } from "../../constants";

import SafeAreaComponent from "../../components/safe-area.component";
import ImageCard from "../../components/image-card.component";

import { fetchTrending } from "../../services/tmdb/shows.service";

import { HomeStackParamsList } from "../../interfaces/navigator.interface";
import { MovieDetails } from "../../interfaces/movie.interface";

type TrendingProps = {} & NativeStackScreenProps<
  HomeStackParamsList,
  "trending"
>;

const Trending: FC<TrendingProps> = ({ navigation }) => {
  // const {
  //   state: { loading, user },
  //   userDispatch,
  // } = useUser();

  const [recentlyWatched, setRecentlyWatched] = useState<MovieDetails[]>([]);
  const [trending, setTrending] = useState<MovieDetails[]>([]);

  async function getShows() {
    const [trendingShows] = await Promise.all([
      fetchTrending(),
      // user && fetchRecentWatchedMovies(user?.id),
    ]);

    setTrending(trendingShows);
    // setRecentlyWatched(recentMovies);
  }

  const onPressHandler = (params: { showId: number; showType: string }) => {
    navigation.navigate("showDetails", {
      showId: params.showId,
      showType: params.showType,
    });
  };

  async function getUserData() {
    // return await loadUserData(userDispatch);
  }

  useEffect(() => {
    getUserData();
    getShows();

    console.log("recent", recentlyWatched);
    // if (user) console.log("user", user?.id, user?.watchedMovies);
  }, []);

  return (
    <SafeAreaComponent>
      <ScrollView>
        <View>
          <View style={styles.sectionHeading}>
            <Text style={styles.title}>🔥 Seleção semanal</Text>
            <Text style={styles.subtitle}>Ver mais</Text>
          </View>

          <FlatList
            data={trending}
            renderItem={({ item }) => (
              <ImageCard show={item} onPress={onPressHandler} />
            )}
            horizontal
          />
        </View>

        <View>
          <View style={styles.sectionHeading}>
            <Text style={styles.title}>Vistos recentemente</Text>
            <Text style={styles.subtitle}>Ver mais</Text>
          </View>

          {recentlyWatched.length ? (
            <FlatList
              data={recentlyWatched}
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
