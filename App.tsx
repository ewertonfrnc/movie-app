import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import Navigation from "./src/navigation";

// import { AuthProvider } from "./src/contexts/auth.context";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      {/*<AuthProvider>*/}
      <StatusBar style="inverted" />

      {/*<UserProvider>*/}
      <Navigation />
      {/*</UserProvider>*/}
      {/*</AuthProvider>*/}
    </Provider>
  );
}
