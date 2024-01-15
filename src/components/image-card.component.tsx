import React, { FC } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';

import { theme } from '../constants';
import { Show } from '../interfaces/movie.interface';
import { BASE_IMAGE_URL } from '../utils/tmdb.utils';

type ImageCardProps = {
  show: Show;
  onPress: (showId: number) => void;
};

const ImageCard: FC<ImageCardProps> = ({ show, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.onPressed}
        onPress={() => onPress(show.id)}
      >
        <Image
          style={styles.image}
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
});
