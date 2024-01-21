import React, { FC } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { theme } from "../../../../constants";

import { Cast } from "../../../../interfaces/movie.interface";
import { BASE_IMAGE_URL } from "../../../../utils/tmdb.utils";
import { LinearGradient } from "expo-linear-gradient";

type CastAvatarProps = {
  castMember: Cast;
};

const CastAvatar: FC<CastAvatarProps> = ({ castMember }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: `${BASE_IMAGE_URL}${castMember.profile_path}` }}
      >
        <LinearGradient
          colors={["transparent", "transparent", theme.COLORS.dark]}
          style={{ height: 150 }}
        />

        <Text style={styles.personalName}>{castMember.name}</Text>
      </ImageBackground>
    </View>
  );
};

export default CastAvatar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.SPACING.lg,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: theme.SIZES.lg,
  },
  personalName: {
    fontWeight: "bold",
    color: theme.COLORS.text.primary,
    textAlign: "left",
    position: "absolute",
    bottom: 0,
  },
  character: {
    color: theme.COLORS.text.secondary,
    textAlign: "center",
  },
});
