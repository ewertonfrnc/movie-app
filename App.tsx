import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Navigation from "./src/navigation";

import AuthContextProvider from "./src/contexts/user.context";

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="inverted" />
      <Navigation />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({});
