import { View, Text } from 'react-native';
import React from 'react';

export default function SeasonProgress() {
  return (
    <View>
      {/* {TMDBMovie?.seasons.map((season) => {
        const currSeason = user?.seriesFinishedSeasons.find(
          (s) => s.id === season.id
        );

        return (
          <Pressable
            key={season.id}
            style={({ pressed }) => [
              styles.progressContainer,
              pressed && styles.pressed,
            ]}
            onPress={goToEpisodesScreen.bind(this, season)}
          >
            <RadioButton selected={false} onPress={() => {}} />

            <View style={styles.progressInfoContainer}>
              <Text style={[styles.subtitle, { flex: 1 }]} numberOfLines={2}>
                {season.name}
              </Text>

              <Progress
                currentValue={
                  currSeason?.finished_watching ? currSeason?.episode_count : 0
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
      })} */}
    </View>
  );
}
