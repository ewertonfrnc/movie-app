import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Progress from './progress';
import TextComponent from '../../../components/typography/text.component';
import RadioButton from '../../../components/radio-button';

import { SeasonDetails } from '../../../interfaces/show.interface';
import { UserData } from '../../../interfaces/user.interface';
import { theme } from '../../../constants';

type SeasonProgressProps = {
  user: UserData;
  seasons: SeasonDetails[];
  onPress: (season: SeasonDetails) => void;
};

export default function SeasonProgress({
  seasons,
  onPress,
}: SeasonProgressProps) {
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
            onPress={() => onPress(season)}
          >
            <RadioButton selected={false} onPress={() => {}} />

            <View style={styles.progressContainer}>
              <TextComponent type="body" textProps={{ numberOfLines: 2 }}>
                {season.name}
              </TextComponent>

              <Progress currentValue={3} totalValue={season.episode_count} />

              <TextComponent type="body">
                {`3 / ${season.episode_count}`}
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
