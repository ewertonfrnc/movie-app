import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDate } from '../../../utils/time.utils';
import RadioButton from '../../../components/radio-button';
import { Episode } from '../../../interfaces/show.interface';
import { theme } from '../../../constants';
import { useAppSelector } from '../../../hooks/redux';
import { useEffect } from 'react';

type EpisodeBtnProps = {
  episode: Episode;
  onPress: (episode: Episode) => void;
};

export default function EpisodeBtn({ episode, onPress }: EpisodeBtnProps) {
  const user = useAppSelector(({ user }) => user.user);

  useEffect(() => {}, []);

  return (
    <Pressable
      key={episode.id}
      style={({ pressed }) => [
        styles.episodeContainer,
        pressed && styles.pressed,
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
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
          <Text style={styles.text}>⭐ {episode.vote_average.toFixed(1)}</Text>

          <RadioButton selected={false} onPress={() => {}} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  episodeContainer: {
    paddingVertical: theme.SPACING.xlg,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.lightDark,
  },
  episodeOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  episodeInfo: {
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
  pressed: { opacity: 0.5 },
});
