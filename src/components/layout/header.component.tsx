import React from 'react';
import { View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import TextComponent from '../typography/text.component';

import { BASE_IMAGE_URL } from '../../utils/tmdb.utils';
import { theme } from '../../constants';

type HeaderProps = {
  backgroundImage: string;
  onPress: () => void;
};

export default function Header({ backgroundImage, onPress }: HeaderProps) {
  return (
    <ImageBackground
      source={{ uri: `${BASE_IMAGE_URL}${backgroundImage}` }}
      style={styles.header}
    >
      <View>
        <TextComponent type="title">Explorar</TextComponent>
        <TextComponent type="caption">Descubra novos mundos</TextComponent>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.searchContainer,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <Ionicons
          name="search"
          size={theme.SIZES.xlg}
          color={theme.COLORS.red}
        />
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: theme.SPACING.xlg,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    backgroundColor: theme.COLORS.lightDark,
    padding: theme.SPACING.lg,
    borderRadius: theme.SIZES.md,
  },
  pressed: { opacity: 0.5 },
});
