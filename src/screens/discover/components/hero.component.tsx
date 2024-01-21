import { ImageBackground, StyleSheet } from "react-native";
import { BASE_IMAGE_URL } from "../../../utils/tmdb.utils";
import { FC } from "react";

type HeroImageProps = {
  backdropPath: string;
};

const HeroImage: FC<HeroImageProps> = ({ backdropPath }) => {
  return (
    <ImageBackground
      source={{ uri: `${BASE_IMAGE_URL}${backdropPath}` }}
      resizeMode={"cover"}
      style={styles.imageStyle}
    />
  );
};

export default HeroImage;

const styles = StyleSheet.create({
  imageStyle: {
    height: 300,
  },
});
