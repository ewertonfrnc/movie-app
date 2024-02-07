import { FC } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { theme } from '../../../constants';
import { TMDBMovie } from '../../../interfaces/show.interface';

import ImageCard from '../../../components/image-card.component';
import { LinearGradient } from 'expo-linear-gradient';

type SectionHighlightProps = {
  loading: boolean;
  shows: TMDBMovie[];
};

const SectionHighlight: FC<SectionHighlightProps> = ({ loading, shows }) => {
  return (
    <LinearGradient
      colors={[theme.COLORS.dark, theme.COLORS.darkRed]}
      style={styles.container}
    >
      <View style={styles.sectionHeading}>
        <Text style={styles.title}>🔥 Seleção semanal</Text>
        <Text style={styles.subtitle}>Ver mais</Text>
      </View>

      {loading ? (
        <ActivityIndicator size={'large'} color={theme.COLORS.darkRed} />
      ) : (
        <FlatList
          data={shows}
          renderItem={({ item }) => (
            <ImageCard show={item} onPress={() => {}} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      )}
    </LinearGradient>
  );
};

export default SectionHighlight;

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.SPACING.xlg,
    margin: theme.SPACING.lg,
    borderRadius: theme.SIZES.xsm,
    height: 330,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.SPACING.xlg,
    paddingTop: theme.SPACING.xlg,
    marginBottom: theme.SPACING.lg,
  },
  title: {
    fontWeight: 'bold',
    fontSize: theme.SIZES.lg,
    color: theme.COLORS.white,
  },
  subtitle: {
    fontSize: theme.SIZES.md,
    color: theme.COLORS.whiteSmoke,
  },
});
