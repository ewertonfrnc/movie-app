import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../constants";
import { FC } from "react";

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
    width: theme.SIZES.xlg,
    height: theme.SIZES.xlg,
    backgroundColor: "transparent",
    borderRadius: theme.SIZES.xlg,
    borderWidth: 2,
    borderColor: theme.COLORS.silver,
  },
  innerContainer: {
    width: theme.SIZES.lg,
    height: theme.SIZES.lg,
    backgroundColor: theme.COLORS.darkRed,
    borderRadius: theme.SIZES.xlg,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.5 },
  text: { color: theme.COLORS.white },
});
