import React, { FC } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';

import { theme } from '../constants';

type ImageCardProps = {
  show: Object;
};

const BASE_URL = 'https://image.tmdb.org/t/p/original';

const ImageCard: FC<ImageCardProps> = ({ show }) => {
  return (
    <View>
      <Pressable style={({ pressed }) => pressed && styles.onPressed}>
        <Image
          style={styles.image}
          source={{
            uri: `${BASE_URL}${show.poster_path}`,
          }}
        />
      </Pressable>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 200,
    margin: theme.SPACING.xlg,
  },
  onPressed: {
    opacity: 0.5,
  },
});
