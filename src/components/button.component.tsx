import React, { FC } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../constants';
import TextComponent from './typography/text.component';

type ButtonProps = {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({ label, loading, disabled, onPress }) => {
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
          <TextComponent type={'button'}>{label}</TextComponent>
        )}
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: theme.COLORS.darkRed,
    padding: theme.SPACING.lg,
    borderRadius: theme.SPACING.xxxlg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onPressed: {
    opacity: 0.5,
  },
  disabled: {
    backgroundColor: theme.COLORS.ashGrey,
  },
});
