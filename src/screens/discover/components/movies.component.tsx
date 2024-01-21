import { FC } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { theme } from "../../../constants";
import ImageCard from "../../../components/image-card.component";
import { MovieDetails } from "../../../interfaces/show.interface";

type MoviesProps = {
  loading: boolean;
  trendingShow: MovieDetails[];
  onPress: (params: { showId: number; showType: string }) => void;
};

const MoviesScreen: FC<MoviesProps> = ({ loading, trendingShow, onPress }) => {
  return (
    <View>
      <View style={styles.sectionHeading}>
        <Text style={styles.title}>🔥 Seleção semanal</Text>
        <Text style={styles.subtitle}>Ver mais</Text>
      </View>

      {loading ? (
        <ActivityIndicator size={"large"} color={theme.COLORS.darkRed} />
      ) : (
        <FlatList
          data={trendingShow}
          renderItem={({ item }) => <ImageCard show={item} onPress={onPress} />}
          horizontal
        />
      )}
    </View>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  lastChild: {
    paddingBottom: theme.SPACING.xxxlg,
  },
  heroImage: {
    height: 400,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.SPACING.xlg,
    paddingTop: theme.SPACING.lg,
    marginBottom: theme.SPACING.lg,
    marginTop: theme.SPACING.xxlg,
  },
  title: {
    fontWeight: "bold",
    fontSize: theme.SIZES.lg,
    color: theme.COLORS.text.primary,
  },
  subtitle: {
    fontSize: theme.SIZES.md,
    color: theme.COLORS.text.secondary,
  },
});
