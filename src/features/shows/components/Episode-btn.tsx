import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { formatDate } from '../../../utils/time.utils';
import { Episode } from '../../../interfaces/show.interface';
import { theme } from '../../../constants';
import RadioButton from '../../../components/radio-button';
import {
  deleteSeasonEpisode,
  updateSeasonEpisodes,
} from '../../../services/supabase/movie.service';
import { setWatchedEpisodes } from '../../../redux/movies/movie.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

type EpisodeBtnProps = {
  episode: Episode;
  selected: boolean;
  onEpisodePress: () => void;
};

export default function EpisodeBtn({
  episode,
  selected,
  onEpisodePress,
}: EpisodeBtnProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.userData);
  const { movie, watchedEpisodes } = useAppSelector((state) => state.movies);

  const [loading, setLoading] = useState(false);

  async function episodeHandler() {
    console.log('episodeHandler', episode);

    if (!user || !movie) return;
    setLoading(true);

    const hasWatched = !!watchedEpisodes
      .filter((watchedEpisode) => watchedEpisode.episodeId === episode.id)
      .find((watchedEpisode) => watchedEpisode.userId === user?.id);

    if (!hasWatched) {
      const formattedEpisode = {
        showId: movie.movieId,
        userId: user.id,
        episodeId: episode.id,
        seasonNumber: episode.season_number,
      };

      try {
        const newWatchedEpisodes = await updateSeasonEpisodes([
          formattedEpisode,
        ]);
        dispatch(
          setWatchedEpisodes([...watchedEpisodes, ...newWatchedEpisodes]),
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      const updatedEpisodes = watchedEpisodes.filter(
        (watchedEpisode) => watchedEpisode.episodeId !== episode.id,
      );
      await deleteSeasonEpisode(movie.movieId, episode.id);
      dispatch(setWatchedEpisodes(updatedEpisodes));
    }

    setLoading(false);
  }

  return (
    <Pressable
      key={episode.id}
      style={({ pressed }) => [
        styles.episodeContainer,
        pressed && styles.pressed,
      ]}
      onPress={onEpisodePress}
    >
      <View style={styles.episodeOverview}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={styles.text}>
            {`Episódio ${episode.episode_number} • ${formatDate(
              episode.air_date,
            )} • ${episode.runtime}m`}
          </Text>

          <Text style={styles.episodeName} numberOfLines={2}>
            {episode.name}
          </Text>
        </View>

        <View style={styles.episodeInfo}>
          <Text style={styles.text}>⭐ {episode.vote_average.toFixed(1)}</Text>

          {loading ? (
            <ActivityIndicator
              color={theme.COLORS.darkRed}
              style={{ width: theme.SIZES.xxlg, height: theme.SIZES.xxlg }}
            />
          ) : (
            <RadioButton selected={selected} onPress={episodeHandler} />
          )}
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
