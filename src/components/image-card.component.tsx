import React, { FC } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../constants';
import { TMDBMovie } from '../interfaces/show.interface';
import { BASE_IMAGE_URL } from '../utils/tmdb.utils';

type ImageCardProps = {
  show: TMDBMovie;
  onPress: (params: { showId: number; showType: string }) => void;
  type: 'normal' | 'small';
};

const ImageCard: FC<ImageCardProps> = ({ show, onPress, type = 'normal' }) => {
  const { id, media_type } = show;

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.onPressed}
        onPress={onPress.bind(this, { showId: id, showType: media_type })}
      >
        <Image
          style={type === 'normal' ? styles.image : styles.smallImage}
          source={{
            uri: `${BASE_IMAGE_URL}${show.poster_path}`,
          }}
        />
      </Pressable>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    margin: theme.SPACING.lg,
  },
  image: {
    width: 150,
    height: 230,
    borderRadius: theme.SPACING.md,
  },
  onPressed: {
    opacity: 0.5,
  },
  smallImage: {
    width: 100,
    height: 150,
  },
});
