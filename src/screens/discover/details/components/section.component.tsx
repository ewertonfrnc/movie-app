import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../../constants';

type SectionContainerProps = {
  title: string;
  children: ReactNode;
};

export default function SectionContainer({
  title,
  children,
}: SectionContainerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SPACING.xlg,
    marginVertical: theme.SPACING.xlg,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: theme.SIZES.lg,
    color: theme.COLORS.whiteSmoke,
  },
});
