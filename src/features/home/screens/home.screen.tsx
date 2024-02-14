import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import SafeAreaComponent from '../../../components/utility/safe-area.component';
import TextComponent from '../../../components/typography/text.component';

import { theme } from '../../../constants';
import {
  getRecentlyWatchedEpisodes,
  readWatchlistedShows,
} from '../../../services/supabase/movie.service';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchMovieGenres } from '../../../services/tmdb/shows.service';
import { setMovieGenre, setWatchList } from '../../../redux/movies/movie.slice';
import { SUPAEpisode } from '../../../interfaces/show.interface';
import { BASE_IMAGE_URL } from '../../../utils/tmdb.utils';
import { formatLongDateTime } from '../../../utils/time.utils';
import ImageCard from '../../../components/image-card.component';

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const { watchList } = useAppSelector(({ movies }) => movies);
  const user = useAppSelector((state) => state.user.userData);

  const [recentlyActivity, setRecentlyActivity] = useState<SUPAEpisode[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchRecentlyWatchedShows() {
    setLoading(true);

    try {
      if (user) {
        const [movieGenres, recentlyWatched, watchlisted] = await Promise.all([
          fetchMovieGenres(),
          getRecentlyWatchedEpisodes(),
          readWatchlistedShows(user.id),
        ]);

        dispatch(setMovieGenre(movieGenres));
        dispatch(setWatchList(watchlisted));
        setRecentlyActivity(recentlyWatched);
      }
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchRecentlyWatchedShows();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaComponent>
      <ScrollView style={styles.container}>
        <View style={{ marginBottom: theme.SPACING.xxxlg }}>
          <TextComponent type="title">Atividade recente</TextComponent>

          {loading ? (
            <ActivityIndicator size="large" color={theme.COLORS.darkRed} />
          ) : (
            <FlatList
              horizontal
              data={recentlyActivity}
              renderItem={({ item }) => (
                <View key={item.episodeId} style={styles.recentCardContainer}>
                  <ImageBackground
                    style={styles.imageContainer}
                    imageStyle={styles.image}
                    source={{ uri: `${BASE_IMAGE_URL}${item.stillPath}` }}
                    resizeMode="cover"
                  >
                    <View style={styles.recentCardActivity}>
                      <TextComponent
                        type={'body'}
                        textProps={{
                          style: { fontWeight: 'bold', color: 'white' },
                        }}
                      >
                        {item.showName}
                      </TextComponent>

                      <TextComponent type={'caption'}>
                        {`${item.seasonNumber}x${item.episodeNumber} - ${item.episodeName}`}
                      </TextComponent>

                      <TextComponent type="caption">
                        {formatLongDateTime(item.created_at)}
                      </TextComponent>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          )}
        </View>

        <View>
          <TextComponent type="caption">A seguir</TextComponent>
          <TextComponent type="title">Continue assistindo</TextComponent>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={theme.COLORS.darkRed} />
        ) : (
          <FlatList
            data={watchList}
            renderItem={({ item }) => (
              <ImageCard show={item} onPress={() => {}} type="small" />
            )}
            horizontal
          />
        )}
      </ScrollView>
    </SafeAreaComponent>
  );
}

const styles = StyleSheet.create({
  container: {},
  recentCardContainer: {
    flexDirection: 'row',
    marginVertical: theme.SPACING.xlg,
    marginHorizontal: theme.SPACING.lg,
    borderRadius: theme.SIZES.md,
    width: 350,
    height: 150,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: theme.SPACING.xlg,
  },
  image: {
    borderRadius: theme.SIZES.lg,
    opacity: 0.5,
  },
  recentCardActivity: {
    // paddingVertical: theme.SPACING.xlg,
    // paddingHorizontal: theme.SPACING.lg,
  },
});
