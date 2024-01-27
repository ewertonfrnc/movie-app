import { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SafeAreaComponent from '../../../components/utility/safe-area.component';
import { theme } from '../../../constants';
import { fetchShowSeasonDetails } from '../../../services/tmdb/shows.service';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../interfaces/navigator.interface';
import { Episode, SeasonDetails } from '../../../interfaces/show.interface';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import EpisodeBtn from '../components/Episode-btn';

type EpisodesScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  'episodes'
>;

const EpisodesScreen: FC<EpisodesScreenProps> = ({ navigation, route }) => {
  const { seriesId, season } = route.params;

  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user.user);

  const [loading, setLoading] = useState(false);
  const [seasonDetails, setSeasonDetails] = useState<SeasonDetails>();
  const [isFinishedSeason, setIsFinishedSeason] = useState(false);

  async function getEpisodeList() {
    setLoading(true);
    try {
      const episodes = await fetchShowSeasonDetails(
        seriesId,
        season.season_number,
      );
      setSeasonDetails(episodes);
    } catch (error) {
      console.warn(error);
    }

    setLoading(false);
  }

  async function watchEpisodeHandler(episode: Episode) {
    // const { id, season_number, show_id, episode_number } = episode;
    //
    // const watchedEpisode = {
    //   episodeId: id,
    //   seasonNumber: season_number,
    //   episodeNumber: episode_number,
    //   showId: show_id,
    //   finished_watching: true,
    // };
    //
    // try {
    //   setLoading(true);
    //
    //   const showSeasonOnUserData = user?.seriesFinishedSeasons.find(
    //     (s) => s.id === season.id,
    //   );
    //
    //   if (showSeasonOnUserData) {
    //     const updatedSeasonInfo = {
    //       ...seasonDetails,
    //       finished_watching: false,
    //       showId: show_id,
    //       episodes: [watchedEpisode, ...showSeasonOnUserData.episodes],
    //     };
    //
    //     const userWithUpdatedEpisodes = {
    //       ...user,
    //       seriesFinishedSeasons: [updatedSeasonInfo],
    //     };
    //
    //     const updatedUser = await addEpisodeToSeasons(userWithUpdatedEpisodes);
    //     dispatch(setUser(updatedUser));
    //   } else {
    //     const updatedSeasonInfo = {
    //       ...seasonDetails,
    //       finished_watching: false,
    //       showId: show_id,
    //       episodes: [watchedEpisode],
    //     };
    //
    //     const userWithUpdatedEpisodes = {
    //       ...user,
    //       seriesFinishedSeasons: [
    //         updatedSeasonInfo,
    //         ...user.seriesFinishedSeasons,
    //       ],
    //     };
    //
    //     const updatedUser = await addEpisodeToSeasons(userWithUpdatedEpisodes);
    //     dispatch(setUser(updatedUser));
    //   }
    // } catch (error) {
    //   dispatch(setUserError(error as Error));
    // }
    //
    // setLoading(false);
  }

  useEffect(() => {
    getEpisodeList();
  }, [user]);

  return (
    <SafeAreaComponent>
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size={'large'} color={theme.COLORS.darkRed} />
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
              {seasonDetails?.episodes.map((episode) => {
                return (
                  <EpisodeBtn
                    key={episode.id}
                    episode={episode}
                    onPress={watchEpisodeHandler.bind(this, episode)}
                  />
                );
              })}
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
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.lightDark,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.SPACING.xlg,
  },
  episodeName: {
    flex: 1,
    fontSize: theme.SIZES.md,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  episodeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.SPACING.xlg,
  },
  episodeOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  pressed: { opacity: 0.5 },
});
