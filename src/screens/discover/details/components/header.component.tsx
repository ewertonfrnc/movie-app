import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { BASE_IMAGE_URL } from "../../../../utils/tmdb.utils";
import Button from "../../../../components/button.component";
import { theme } from "../../../../constants";

export default function ShowHeader({
  title,
  tagline,
  backdrop_path,
  poster_path,
}) {
  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="cover"
          source={{
            uri: `${BASE_IMAGE_URL}${backdrop_path}`,
          }}
        />

        <Image
          style={styles.posterImage}
          source={{
            uri: `${BASE_IMAGE_URL}${poster_path}`,
          }}
        />

        <View style={styles.watchBtnContainer}>
          <Button
            label={true ? "➖ Remover da lista" : "➕ Adicionar à lista"}
            loading={false}
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{tagline}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageBackground: {
    flex: 1,
    height: 300,
  },
  posterImage: {
    width: 75,
    height: 100,
    borderRadius: 4,

    position: "absolute",
    bottom: -50,
    left: 20,
  },
  watchBtnContainer: {
    width: "65%",
    position: "absolute",
    bottom: -50,
    right: 20,
  },
  sectionContainer: {
    paddingHorizontal: theme.SPACING.xlg,
    marginTop: theme.SPACING.xxxlg,
  },
  title: {
    fontWeight: "bold",
    fontSize: theme.SIZES.lg,
    color: theme.COLORS.whiteSmoke,
  },
  subtitle: {
    fontSize: theme.SIZES.md,
    color: theme.COLORS.silver,
  },
});
