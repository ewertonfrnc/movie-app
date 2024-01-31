import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../interfaces/navigator.interface';
import SafeAreaComponent from '../../../components/utility/safe-area.component';
import TextComponent from '../../../components/typography/text.component';
import { BASE_IMAGE_URL } from '../../../utils/tmdb.utils';
import { theme } from '../../../constants';
import { useAppSelector } from '../../../hooks/redux';

type EpisodeDetailScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  'episodeDetails'
>;

export default function EpisodeDetailScreen({
  route,
}: EpisodeDetailScreenProps) {
  const { episode } = route.params;
  console.log(episode);

  const show = useAppSelector((state) => state.movies.movie);
  console.log('show', show);

  return (
    <SafeAreaComponent>
      <ImageBackground
        imageStyle={{ borderRadius: theme.SIZES.xxsm }}
        style={styles.imageBackground}
        resizeMode="cover"
        source={{
          uri: `${BASE_IMAGE_URL}${episode.still_path}`,
        }}
      />

      <View>
        <View>
          <TextComponent type={'caption'}>
            Temporada {episode.season_number} • Episódio{' '}
            {episode.episode_number}
          </TextComponent>
          <TextComponent type={'title'}>{episode.name}</TextComponent>
        </View>

        <View>
          <TextComponent type={'caption'}>Descrição</TextComponent>
          <TextComponent type={'body'}>{episode.overview}</TextComponent>
        </View>
      </View>
    </SafeAreaComponent>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    // flex: 1,
    height: 300,
  },
});
