import React, { FC } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { theme } from '../constants';

import { Cast } from '../interfaces/movie.interface';
import { BASE_IMAGE_URL } from '../utils/tmdb.utils';

type CastAvatarProps = {
  castMember: Cast;
};

const CastAvatar: FC<CastAvatarProps> = ({ castMember }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `${BASE_IMAGE_URL}${castMember.profile_path}` }}
      />

      <Text style={styles.personalName}>{castMember.name}</Text>
      <Text style={styles.character}>{castMember.character}</Text>
    </View>
  );
};

export default CastAvatar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.SPACING.lg,
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  personalName: {
    fontWeight: 'bold',
    color: theme.COLORS.text.primary,
    textAlign: 'center',
  },
  character: {
    color: theme.COLORS.text.secondary,
    textAlign: 'center',
  },
});
