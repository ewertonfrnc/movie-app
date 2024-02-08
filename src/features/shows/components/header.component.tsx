import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

import Button from '../../../components/button.component';

import { BASE_IMAGE_URL } from '../../../utils/tmdb.utils';
import { theme } from '../../../constants';
import TextComponent from '../../../components/typography/text.component';

type ShowHeaderProps = {
  title: string;
  tagline: string;
  backdrop_path: string;
  poster_path: string;
  isWatched: boolean;
  onPress: () => void;
  loading: boolean;
};

export default function ShowHeader({
  title,
  tagline,
  backdrop_path,
  poster_path,
  isWatched,
  onPress,
  loading,
}: ShowHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="cover"
          source={{
            uri: `${BASE_IMAGE_URL}${backdrop_path}`,
          }}
        />

        <Image
          style={styles.posterImage}
          source={{
            uri: `${BASE_IMAGE_URL}${poster_path}`,
          }}
        />

        <View style={styles.watchBtnContainer}>
          <Button
            label={isWatched ? '➖ Remover da lista' : '➕ Adicionar à lista'}
            loading={loading}
            onPress={onPress}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <TextComponent type={'title'}>{title}</TextComponent>
        <TextComponent type={'body'}>{tagline}</TextComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageBackground: {
    flex: 1,
    height: 300,
  },
  gradient: {
    width: '100%',
    height: 300,
    position: 'absolute',
    bottom: 0,
  },
  posterImage: {
    width: 75,
    height: 100,
    borderRadius: 4,
    position: 'absolute',
    bottom: -50,
    left: 20,
  },
  watchBtnContainer: {
    width: '65%',
    position: 'absolute',
    bottom: -50,
    right: 20,
  },
  sectionContainer: {
    paddingHorizontal: theme.SPACING.xlg,
    marginTop: theme.SPACING.xxxlg,
  },
});
