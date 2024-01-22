import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SafeAreaComponent from "../../../components/safe-area.component";
import { theme } from "../../../constants";
import { fetchShowSeasonDetails } from "../../../services/tmdb/shows.service";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../../interfaces/navigator.interface";
import { SeasonDetails } from "../../../interfaces/show.interface";
import { formatDate } from "../../../utils/time.utils";
import RadioButton from "../../../components/radio-button";
import { Ionicons } from "@expo/vector-icons";

type EpisodesScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  "episodes"
>;

const EpisodesScreen: FC<EpisodesScreenProps> = ({ navigation, route }) => {
  const { seriesId, seasonNumber } = route.params;

  const [loading, setLoading] = useState(false);
  const [seasonDetails, setSeasonDetails] = useState<SeasonDetails>();

  async function getEpisodeList() {
    setLoading(true);
    try {
      const seasonInfo = await fetchShowSeasonDetails(seriesId, seasonNumber);
      setSeasonDetails(seasonInfo);
      console.log(seasonInfo);
    } catch (error) {
      console.warn(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    getEpisodeList();
  }, []);

  return (
    <SafeAreaComponent>
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size={"large"} color={theme.COLORS.darkRed} />
        ) : (
          <>
            <View style={styles.header}>
              <Pressable
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.pressed,
                ]}
                onPress={navigation.goBack}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={theme.COLORS.white}
                />
                <Text style={styles.title} numberOfLines={2}>
                  {seasonDetails?.name}
                </Text>
              </Pressable>

              {seasonDetails?.overview && (
                <Text style={styles.overview}>{seasonDetails?.overview}</Text>
              )}
            </View>

            <View>
              {seasonDetails?.episodes.map((episode) => (
                <Pressable
                  key={episode.id}
                  style={({ pressed }) => [
                    styles.episodeContainer,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>
                      {`Episódio ${episode.episode_number} • ${formatDate(
                        episode.air_date,
                      )} • ${episode.runtime}m`}
                    </Text>
                  </View>

                  <View style={styles.episodeOverview}>
                    <Text style={styles.episodeName} numberOfLines={2}>
                      {episode.name}
                    </Text>

                    <View style={styles.episodeInfo}>
                      <Text style={styles.text}>
                        ⭐ {episode.vote_average.toFixed(1)}
                      </Text>
                      <RadioButton selected={false} onPress={() => {}} />
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaComponent>
  );
};

export default EpisodesScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.SPACING.xlg,
    paddingHorizontal: theme.SPACING.xlg,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.lightDark,
    paddingVertical: theme.SPACING.xlg,
  },
  episodeContainer: {
    paddingVertical: theme.SPACING.xlg,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.SPACING.xlg,
  },
  episodeName: {
    flex: 1,
    fontSize: theme.SIZES.md,
    fontWeight: "bold",
    color: theme.COLORS.white,
  },
  text: { color: theme.COLORS.whiteSmoke },
  overview: {
    color: theme.COLORS.whiteSmoke,
    marginTop: theme.SPACING.xlg,
  },
  title: {
    flex: 1,
    color: theme.COLORS.whiteSmoke,
    fontSize: theme.SIZES.xlg,
    fontWeight: "bold",
  },
  episodeInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.SPACING.xlg,
  },
  episodeOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  pressed: { opacity: 0.5 },
});
