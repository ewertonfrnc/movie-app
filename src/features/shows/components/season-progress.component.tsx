import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Progress from './progress';
import TextComponent from '../../../components/typography/text.component';
import RadioButton from '../../../components/radio-button';

import { SeasonDetails, SUPAEpisode } from '../../../interfaces/show.interface';
import { UserData } from '../../../interfaces/user.interface';
import { theme } from '../../../constants';
import { useAppSelector } from '../../../hooks/redux';

type SeasonProgressProps = {
  user: UserData;
  seasons: SeasonDetails[];
  watchedEpisodes: SUPAEpisode[];
  onEpisodePress: (season: SeasonDetails) => void;
  onSeasonWatch: (season: SeasonDetails) => void;
};

export default function SeasonProgress({
  seasons,
  watchedEpisodes,
  onEpisodePress,
  onSeasonWatch,
}: SeasonProgressProps) {
  const user = useAppSelector((state) => state.user.userData);

  function checkFinishedSeasons(season: SeasonDetails) {
    return !!(
      countWatchedEpisodes(season) === season.episode_count &&
      !!season.episode_count &&
      watchedEpisodes.find((episode) => episode.userId === user?.id)
    );
  }

  function countWatchedEpisodes(season: SeasonDetails): number {
    return watchedEpisodes.filter(
      (episode) =>
        episode.seasonNumber === season.season_number &&
        episode.userId === user?.id,
    ).length;
  }

  return (
    <View>
      {seasons.map((season) => {
        return (
          <Pressable
            key={season.id}
            style={({ pressed }) => [
              styles.seasonContainer,
              pressed && styles.pressed,
            ]}
            onPress={() => onEpisodePress(season)}
          >
            <RadioButton
              selected={checkFinishedSeasons(season)}
              onPress={() => onSeasonWatch(season)}
            />

            <View style={styles.progressContainer}>
              <TextComponent type="body" textProps={{ numberOfLines: 2 }}>
                {season.name}
              </TextComponent>

              <Progress
                currentValue={countWatchedEpisodes(season)}
                totalValue={season.episode_count}
              />

              <TextComponent type="body">
                {`${countWatchedEpisodes(season)} / ${season.episode_count}`}
              </TextComponent>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  seasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: theme.SPACING.xlg,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  pressed: { opacity: 0.5 },
});
