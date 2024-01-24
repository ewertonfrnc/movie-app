import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './app.navigator';
import AccountNavigator from './account.navigator';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { onAppStart, setAuthLogOut } from '../redux/auth/auth.slice';

import supabase from '../services/supabase';
import { readStorageItem, storeToStorage } from '../utils/async-storage.utils';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    async function checkForUserTokenOnDevice() {
      const userId = await readStorageItem('user-id');
      dispatch(onAppStart(userId));
    }

    checkForUserTokenOnDevice();
  }, []);

  const subscription = supabase.auth.onAuthStateChange(
    async (event, session) => {
      console.log(event);

      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
        if (session?.user) {
          onAppStart(session?.user.id);
          await storeToStorage('user-id', session?.user.id);
        }
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
        dispatch(setAuthLogOut());
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    },
  );

  isAuthenticated && subscription.data.subscription.unsubscribe();

  return (
    <NavigationContainer>
      {true ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
