import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { BASE_IMAGE_URL } from '../../../utils/tmdb.utils';

import { TMDBMovie } from '../../../interfaces/show.interface';
import TextComponent from '../../../components/typography/text.component';
import { theme } from '../../../constants';
import { useAppSelector } from '../../../hooks/redux';
import { getFullYear } from '../../../utils/time.utils';
import Button from '../../../components/button.component';

type HeroGalleryProps = {
  show: TMDBMovie;
};

export default function HeroGallery({ show }: HeroGalleryProps) {
  const genres = useAppSelector(({ movies }) => movies.movieGenres);
  const currentMovieGenres = genres.filter((genre) =>
    show.genre_ids.includes(genre.id),
  );

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <ImageBackground
        style={styles.imageContainer}
        imageStyle={styles.image}
        source={{ uri: `${BASE_IMAGE_URL}${show.backdrop_path}` }}
        resizeMode="cover"
      >
        <View style={styles.showContent}>
          <Image
            style={styles.poster}
            source={{ uri: `${BASE_IMAGE_URL}${show.poster_path}` }}
          />

          <View>
            <TextComponent type="body">{show.title}</TextComponent>

            <View style={styles.stats}>
              <TextComponent type="caption">
                {getFullYear(show.release_date)}
              </TextComponent>

              {currentMovieGenres
                .filter((_, idx) => idx < 2)
                .map((genre) => (
                  <TextComponent key={genre.id} type="caption">
                    {genre.name}
                  </TextComponent>
                ))}
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 200,
    marginHorizontal: theme.SPACING.xlg,
    marginTop: theme.SPACING.xlg,
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
  poster: {
    width: 75,
    height: 100,
    borderRadius: theme.SIZES.xsm,
    borderWidth: 2,
    borderColor: theme.COLORS.silver,
  },
  showContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.SPACING.xlg,
  },
  stats: {
    flexDirection: 'row',
    gap: theme.SPACING.xlg,
  },
  pressed: { opacity: 0.5 },
});
