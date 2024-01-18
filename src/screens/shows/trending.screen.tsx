import { FC, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "../../constants";

import SafeAreaComponent from "../../components/safe-area.component";
import ImageCard from "../../components/image-card.component";

import {
  fetchTrending,
  fetchTrendingMovies,
  fetchTrendingTvShows,
} from "../../services/tmdb/shows.service";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParamsList } from "../../interfaces/navigator.interface";
import { Show } from "../../interfaces/movie.interface";

type TrendingProps = {} & NativeStackScreenProps<
  HomeStackParamsList,
  "trending"
>;

const Trending: FC<TrendingProps> = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState<Show[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Show[]>([]);
  const [trending, setTrending] = useState<Show[]>([]);

  const getShows = async () => {
    const [movies, tvShows, trendingShows] = await Promise.all([
      fetchTrendingMovies(),
      fetchTrendingTvShows(),
      fetchTrending(),
    ]);

    setPopularMovies(movies);
    setPopularTVShows(tvShows);
    setTrending(trendingShows);
  };

  const onPressHandler = (params: { showId: number; showType: string }) => {
    navigation.navigate("showDetails", {
      showId: params.showId,
      showType: params.showType,
    });
  };

  useEffect(() => {
    getShows();
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
