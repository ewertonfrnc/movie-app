import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app.navigator";
import AccountNavigator from "./account.navigator";

import { useAuth } from "../contexts/auth.context";
import { supabase } from "../utils/supabase/supabase.utils";

const Navigation = () => {
  const {
    state: { isAuthenticated },
    authDispatch,
  } = useAuth();

  supabase.auth.onAuthStateChange((event, session) => {
    // console.log(event, session, { isAuthenticated });

    if (event === "INITIAL_SESSION") {
      // handle initial session
    } else if (event === "SIGNED_IN") {
      // handle sign in event
      authDispatch({ type: "app start", payload: session?.access_token });
    } else if (event === "SIGNED_OUT") {
      // handle sign out event
    } else if (event === "PASSWORD_RECOVERY") {
      // handle password recovery event
    } else if (event === "TOKEN_REFRESHED") {
      // handle token refreshed event
    } else if (event === "USER_UPDATED") {
      // handle user updated event
    }
  });

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
