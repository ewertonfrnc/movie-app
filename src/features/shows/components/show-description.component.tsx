import React from 'react';
import { StyleSheet, View } from 'react-native';
import { decimalToPercentage } from '../../../utils/tmdb.utils';
import { getFullYear, minToHours } from '../../../utils/time.utils';
import { theme } from '../../../constants';
import TextComponent from '../../../components/typography/text.component';

type ShowDescriptionProps = {
  runtime: number;
  voteAverage: number;
  releaseDate: string;
  genre: string;
  mediaType: string;
};
export function ShowDescription({
  voteAverage,
  releaseDate,
  genre,
  runtime,
  mediaType,
}: ShowDescriptionProps) {
  const rankStyles =
    voteAverage < 5 ? 'badRank' : voteAverage < 7 ? 'goodRank' : 'awesomeRank';

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <TextComponent type={'body'} rank={rankStyles}>
          ⭐ {decimalToPercentage(voteAverage)}
        </TextComponent>

        <TextComponent type={'body'}>{getFullYear(releaseDate)}</TextComponent>

        <TextComponent type={'body'}>{genre}</TextComponent>

        {mediaType === 'movie' && (
          <TextComponent type={'body'}>⏳ {minToHours(runtime)}</TextComponent>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.SPACING.xlg,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rank: {
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    fontSize: theme.SIZES.lg,
    color: theme.COLORS.whiteSmoke,
  },
  subtitle: {
    fontSize: theme.SIZES.md,
    color: theme.COLORS.silver,
  },
});
