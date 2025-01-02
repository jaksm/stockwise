import './gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {RootStack} from './app/RootStack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
