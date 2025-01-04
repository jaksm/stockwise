import './gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from 'react-query';

import {RootStack} from './app/RootStack';
import {WatchlistProvider} from './app/hooks/useWatchlistStore';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <WatchlistProvider>
            <RootStack />
          </WatchlistProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
