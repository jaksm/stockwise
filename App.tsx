import './gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, useColorScheme} from 'react-native';

import {RootStack} from './app/RootStack';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
