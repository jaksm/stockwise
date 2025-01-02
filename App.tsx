import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Hello World</Text>
    </SafeAreaView>
  );
}

export default App;
