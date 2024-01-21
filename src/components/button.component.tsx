import React, { FC } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { theme } from "../constants";
import { Ionicons } from "@expo/vector-icons";

type ButtonProps = {
  label?: string;
  iconName?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({
  label,
  iconName,
  loading,
  disabled,
  onPress,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.onPressed]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.silver} />
        ) : (
          <Text style={styles.text}>
            <Ionicons name={iconName} size={24} color="white" />
            {label && label}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },
  text: {
    textAlign: "center",
    fontSize: theme.SIZES.md,
    color: theme.COLORS.ashGrey,
  },
  button: {
    backgroundColor: theme.COLORS.darkRed,
    padding: theme.SPACING.lg,
    borderRadius: theme.SPACING.xxxlg,
  },
  onPressed: {
    opacity: 0.5,
  },
  disabled: {
    backgroundColor: theme.COLORS.ashGrey,
  },
});
