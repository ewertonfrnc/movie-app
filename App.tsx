import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Navigation from "./src/navigation";

import { AuthProvider } from "./src/contexts/auth.context";
import { UserProvider } from "./src/contexts/user.context";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="inverted" />

      <UserProvider>
        <Navigation />
      </UserProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
