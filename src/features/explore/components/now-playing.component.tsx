import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TMDBMovie } from '../../../interfaces/show.interface';
import TextComponent from '../../../components/typography/text.component';
import { theme } from '../../../constants';
import NowPlayingCard from './now-playing-card.component';

type NowPlayingProps = {
  nowPlayingMovies: TMDBMovie[];
  onPress: (params: { showId: number; showType: string }) => void;
};

const NowPlaying: FC<NowPlayingProps> = ({ nowPlayingMovies, onPress }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: theme.SPACING.xlg,
        }}
      >
        <TextComponent type="title">Novidades</TextComponent>
      </View>

      <FlatList
        data={nowPlayingMovies}
        renderItem={({ item }) => (
          <NowPlayingCard show={item} onPress={onPress} />
        )}
        horizontal
      />
    </View>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  container: {
    height: 275,
    marginTop: theme.SPACING.xxlg,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.lightDark,
  },
});
