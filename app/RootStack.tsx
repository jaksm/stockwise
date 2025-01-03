import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from './screens/Home';

import {NavigationProp} from '@react-navigation/native';
import {useRootStackScreenOptions} from './hooks/useRootStackScreenOptions';
import {AddToWatchlist} from './screens/AddToWatchlist';

export type RootStackParamList = {
  Home: undefined;
  AddToWatchlist: undefined;
};

export type RootStackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const screenOptions = useRootStackScreenOptions();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name="AddToWatchlist"
        component={AddToWatchlist}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};
