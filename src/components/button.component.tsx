import React, { FC } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../constants';
import TextComponent from './typography/text.component';

type ButtonProps = {
  label?: string;
  outlined?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({
  label,
  loading,
  disabled,
  outlined,
  onPress,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          !outlined ? styles.button : styles.btnOutlined,
          pressed && styles.onPressed,
        ]}
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
  buttonContainer: { flex: 1 },
  button: {
    backgroundColor: theme.COLORS.darkRed,
    padding: theme.SPACING.lg,
    borderRadius: theme.SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlined: {
    backgroundColor: 'transparent',
    padding: theme.SPACING.lg,
    borderRadius: theme.SPACING.lg,
    borderWidth: 1,
    borderColor: theme.COLORS.darkRed,
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
