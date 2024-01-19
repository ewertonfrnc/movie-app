import React, { FC } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { theme } from "../constants";
import { MovieDetails } from "../interfaces/movie.interface";
import { BASE_IMAGE_URL } from "../utils/tmdb.utils";

type ImageCardProps = {
  show: MovieDetails;
  onPress: (params: { showId: number; showType: string }) => void;
};

const ImageCard: FC<ImageCardProps> = ({ show, onPress }) => {
  const { id, media_type } = show;

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.onPressed}
        onPress={() => onPress({ showId: id, showType: media_type })}
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
