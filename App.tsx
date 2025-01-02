import './gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {QueryClient, QueryClientProvider} from 'react-query';

import {RootStack} from './app/RootStack';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
