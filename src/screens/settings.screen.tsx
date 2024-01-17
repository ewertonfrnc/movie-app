import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../contexts/auth.context";

const Settings = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.constainer}>
      <Text>Settings</Text>
      <Button title="Encerrar sessão" onPress={logout} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
