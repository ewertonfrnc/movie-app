import { FC } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../../interfaces/navigator.interface";

import { theme } from "../../../constants";

import { getFullYear, minToHours } from "../../../utils/time.utils";
import { BASE_IMAGE_URL, decimalToPercentage } from "../../../utils/tmdb.utils";
import { useAppSelector } from "../../../hooks/redux";
import { SeasonDetails } from "../../../interfaces/show.interface";

import SafeAreaComponent from "../../../components/safe-area.component";
import CastAvatar from "./components/cast-avatar.component";
import Button from "../../../components/button.component";
import RadioButton from "../../../components/radio-button";
import Progress from "./components/progress";

type ShowScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  "showDetails"
>;

const ShowScreen: FC<ShowScreenProps> = ({ navigation, route }) => {
  const movieDetails = route.params;

  const user = useAppSelector((state) => state.user.user);

  function goToEpisodesScreen(season: SeasonDetails) {
    navigation.navigate("episodes", {
      seriesId: movieDetails.id,
      season,
    });
  }

  return (
    <SafeAreaComponent>
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
                label={true ? "➖ Remover da lista" : "➕ Adicionar à lista"}
                loading={false}
                onPress={() => {}}
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

                {movieDetails.media_type === "movie" && (
                  <Text style={styles.subtitle}>
                    ⏳ {minToHours(movieDetails.runtime)}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.divider} />

            {movieDetails.media_type === "tv" && (
              <View style={styles.sectionContainer}>
                <Text style={styles.title}>Temporadas</Text>

                {movieDetails?.seasons.map((season) => {
                  const currSeason = user?.seriesFinishedSeasons.find(
                    (s) => s.id === season.id,
                  );

                  if (currSeason) console.log("currSeason", currSeason);

                  return (
                    <Pressable
                      key={season.id}
                      style={({ pressed }) => [
                        styles.progressContainer,
                        pressed && styles.pressed,
                      ]}
                      onPress={goToEpisodesScreen.bind(this, season)}
                    >
                      <RadioButton selected={!!currSeason} onPress={() => {}} />

                      <View style={styles.progressInfoContainer}>
                        <Text
                          style={[styles.subtitle, { flex: 1 }]}
                          numberOfLines={2}
                        >
                          {season.name}
                        </Text>

                        <Progress
                          currentValue={
                            currSeason?.finished_watching
                              ? currSeason?.episode_count
                              : 0
                          }
                          totalValue={season.episode_count}
                        />

                        <Text style={styles.subtitle}>
                          {`${currSeason?.episode_count || 0} / ${
                            season.episode_count
                          }  >`}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
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
    </SafeAreaComponent>
  );
};

export default ShowScreen;

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    gap: 10,
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
