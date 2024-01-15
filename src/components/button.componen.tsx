import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { theme } from '../constants';

const Button = () => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.onPressed]}
      >
        <Text style={styles.text}>▶️ Marcar como assistido</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: theme.COLORS.text.primary,
  },
  button: {
    backgroundColor: theme.COLORS.background.tertiary,
    padding: theme.SPACING.lg,
    borderRadius: theme.SPACING.xxxlg,
  },
  onPressed: {
    opacity: 0.5,
  },
});
