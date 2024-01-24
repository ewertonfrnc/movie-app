import { FC, ReactNode } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { theme } from '../../constants';

type SafeAreaComponentProps = {
  children: ReactNode;
};

const SafeAreaComponent: FC<SafeAreaComponentProps> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default SafeAreaComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Number(Platform.OS === 'android' && StatusBar.currentHeight),
    backgroundColor: theme.COLORS.dark,
  },
});
