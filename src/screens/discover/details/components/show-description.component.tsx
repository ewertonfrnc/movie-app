import { StyleSheet, Text, View } from "react-native";
import { decimalToPercentage } from "../../../../utils/tmdb.utils";
import { getFullYear, minToHours } from "../../../../utils/time.utils";
import { theme } from "../../../../constants";

export function ShowDescription({
  voteAverage,
  releaseDate,
  genre,
  runtime,
  mediaType,
}) {
  return (
    <View>
      <View style={styles.stats}>
        <Text
          style={[
            styles.rank,
            voteAverage < 5
              ? styles.badRank
              : voteAverage < 7
                ? styles.goodRank
                : styles.awesomeRank,
          ]}
        >
          ⭐ {decimalToPercentage(voteAverage)}
        </Text>

        <Text style={styles.subtitle}>{getFullYear(releaseDate)}</Text>

        <Text style={styles.subtitle}>{genre}</Text>

        {mediaType === "movie" && (
          <Text style={styles.subtitle}>⏳ {minToHours(runtime)}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: theme.SPACING.lg,
  },
  rank: {
    fontWeight: "bold",
    fontSize: theme.SIZES.md,
  },
  badRank: {
    color: theme.COLORS.ranks.bad,
  },
  goodRank: {
    color: theme.COLORS.ranks.regular,
  },
  awesomeRank: {
    color: theme.COLORS.ranks.good,
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
