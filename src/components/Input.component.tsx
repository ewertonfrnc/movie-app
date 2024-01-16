import { FC } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { theme } from "../constants";

type InputProps = {
  label: string;
  textInputConfig: TextInputProps;
};

const Input: FC<InputProps> = ({ label, textInputConfig }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        {...textInputConfig}
        placeholderTextColor={theme.COLORS.silver}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: theme.SPACING.xlg,
  },
  label: {
    fontSize: theme.SIZES.sm,
    color: theme.COLORS.text.primary,
    marginBottom: theme.SPACING.md,
  },
  input: {
    backgroundColor: "transparent",

    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.silver,

    padding: theme.SPACING.lg,
    fontSize: theme.SIZES.md,
    color: theme.COLORS.silver,
    borderRadius: 6,
  },
});
