import React, { FC } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import SafeAreaComponent from '../../../components/utility/safe-area.component';
import { theme } from '../../../constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../interfaces/navigator.interface';
import { Ionicons } from '@expo/vector-icons';
import EpisodeBtn from '../components/Episode-btn';
import { Episode } from '../../../interfaces/show.interface';
import { useAppSelector } from '../../../hooks/redux';

type EpisodesScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  'episodes'
>;

const EpisodesScreen: FC<EpisodesScreenProps> = ({ navigation, route }) => {
  const user = useAppSelector((state) => state.user.userData);
  const { seasonEpisodes, watchedEpisodes } = route.params;

  async function watchEpisodeHandler(episode: Episode) {
    navigation.navigate('episodeDetails', { episode });
  }

  function checkWatchedEpisodes(episode: Episode) {
    console.log('checkWatchedEpisodes', episode.userId === user?.id);

    return !!watchedEpisodes.find(
      (watchedEpisode) =>
        watchedEpisode.episodeId === episode.id &&
        watchedEpisode.userId === user?.id,
    );
  }

  return (
    <SafeAreaComponent>
      <ScrollView style={styles.container}>
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
                {seasonEpisodes?.name}
              </Text>
            </Pressable>

            {seasonEpisodes?.overview && (
              <Text style={styles.overview}>{seasonEpisodes?.overview}</Text>
            )}
          </View>

          <View>
            {seasonEpisodes?.episodes.map((episode) => {
              return (
                <EpisodeBtn
                  key={episode.id}
                  episode={episode}
                  selected={checkWatchedEpisodes(episode)}
                  onPress={watchEpisodeHandler.bind(this, episode)}
                />
              );
            })}
          </View>
        </>
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
