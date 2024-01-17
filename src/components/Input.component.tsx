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
  invalid?: boolean;
  textInputConfig: TextInputProps;
};

const Input: FC<InputProps> = ({ label, invalid, textInputConfig }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, invalid && styles.invalidInput]}
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
  invalidLabel: {
    color: theme.COLORS.red,
  },
  invalidInput: {
    backgroundColor: theme.COLORS.darkRed,
  },
});
