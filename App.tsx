import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Navigation from "./src/navigation";

export default function App() {
  return (
    <>
      <StatusBar style="inverted" />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({});
