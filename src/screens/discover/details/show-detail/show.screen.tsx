import { FC } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../../../interfaces/navigator.interface";

import { theme } from "../../../../constants";
import { useAppSelector } from "../../../../hooks/redux";
import { SeasonDetails } from "../../../../interfaces/show.interface";

import SafeAreaComponent from "../../../../components/safe-area.component";
import CastAvatar from "../components/cast-avatar.component";
import RadioButton from "../../../../components/radio-button";
import Progress from "../components/progress";
import ShowHeader from "../components/header.component";
import { ShowDescription } from "../components/show-description.component";

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
          <ShowHeader
            title={movieDetails.title || movieDetails.name}
            tagline={movieDetails.tagline}
            backdrop_path={movieDetails.backdrop_path}
            poster_path={movieDetails.poster_path}
          />

          <View style={styles.divider} />

          <ShowDescription
            releaseDate={
              movieDetails.release_date || movieDetails.first_air_date
            }
            runtime={movieDetails.runtime}
            mediaType={movieDetails.media_type}
            voteAverage={movieDetails.vote_average}
            genre={movieDetails.genres[0].name}
          />

          <View style={styles.divider} />

          <View style={styles.informationContainer}>
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
});
