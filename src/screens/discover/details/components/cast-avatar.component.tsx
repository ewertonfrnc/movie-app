import React, { FC } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { theme } from '../../../../constants';

import { Cast } from '../../../../interfaces/show.interface';
import { BASE_IMAGE_URL } from '../../../../utils/tmdb.utils';
import { LinearGradient } from 'expo-linear-gradient';
import TextComponent from '../../../../components/typography/text.component';

type CastAvatarProps = {
  castMember: Cast;
};

const CastAvatar: FC<CastAvatarProps> = ({ castMember }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        imageStyle={styles.image}
        source={{ uri: `${BASE_IMAGE_URL}${castMember.profile_path}` }}
      >
        <LinearGradient
          colors={['transparent', 'transparent', theme.COLORS.dark]}
          style={{ height: 150 }}
        />

        <View style={styles.personalName}>
          <TextComponent type={'body'}>{castMember.name}</TextComponent>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CastAvatar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.SPACING.lg,
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: theme.SIZES.xxsm,
  },
  personalName: {
    padding: theme.SPACING.sm,
    position: 'absolute',
    bottom: 0,
  },
});
