import React, { FC } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { TMDBMovie } from '../../../interfaces/show.interface';
import HeroGallery from './hero-gallery.component';
import TextComponent from '../../../components/typography/text.component';
import { theme } from '../../../constants';

type HeroImageProps = {
  nowPlayingMovies: TMDBMovie[];
};

const HeroImage: FC<HeroImageProps> = ({ nowPlayingMovies }) => {
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
        renderItem={({ item }) => <HeroGallery show={item} />}
        horizontal
      />
    </View>
  );
};

export default HeroImage;

const styles = StyleSheet.create({
  container: {
    height: 275,
    marginTop: theme.SPACING.xxlg,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.lightDark,
  },
});
