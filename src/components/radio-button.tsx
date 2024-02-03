import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants';
import { FC } from 'react';

type RadioButtonProps = {
  selected: boolean;
  onPress: () => void;
};

const RadioButton: FC<RadioButtonProps> = ({ selected, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.outerContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {selected && (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>✓</Text>
        </View>
      )}
    </Pressable>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  outerContainer: {
    width: theme.SIZES.xxlg,
    height: theme.SIZES.xxlg,
    backgroundColor: 'transparent',
    borderRadius: theme.SIZES.xlg,
    borderWidth: 2,
    borderColor: theme.COLORS.silver,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: theme.SIZES.xxlg,
    height: theme.SIZES.xxlg,
    backgroundColor: theme.COLORS.darkRed,
    borderRadius: theme.SIZES.xlg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.5 },
  text: { color: theme.COLORS.white },
});
