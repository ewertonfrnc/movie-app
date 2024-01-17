import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Navigation from "./src/navigation";

import { AuthProvider } from "./src/contexts/auth.context";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="inverted" />
      <Navigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
