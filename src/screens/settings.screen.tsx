import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { logUserOut, useAuth } from "../contexts/auth.context";

const Settings = () => {
  const { authDispatch } = useAuth();

  async function logOut() {
    await logUserOut(authDispatch);
  }

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button title="Encerrar sessão" onPress={logOut} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
