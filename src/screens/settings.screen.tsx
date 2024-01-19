import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { useAppDispatch } from "../hooks/redux";
import { setAuthError } from "../redux/auth/auth.slice";
import { signOut } from "../services/supabase/auth.service";
import { removeFromStorage } from "../utils/async-storage.utils";

const Settings = () => {
  const dispatch = useAppDispatch();

  async function logOut() {
    try {
      await signOut();
      await removeFromStorage("user-id");
    } catch (error) {
      dispatch(setAuthError(error as Error));
    }
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
