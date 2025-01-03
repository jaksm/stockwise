import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AssetDetails} from './screens/AssetDetails';
import {Home} from './screens/Home';
import {ManageWatchlist} from './screens/ManageWatchlist';

import {NavigationProp} from '@react-navigation/native';
import {useRootStackScreenOptions} from './hooks/useRootStackScreenOptions';

export type RootStackParamList = {
  Home: undefined;
  AssetDetails: undefined;
  ManageWatchlist: undefined;
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
        }}
      />
      <Stack.Screen
        name="AssetDetails"
        options={{title: 'Asset Details'}}
        component={AssetDetails}
      />
      <Stack.Screen
        name="ManageWatchlist"
        options={{title: 'Manage Watchlist'}}
        component={ManageWatchlist}
      />
    </Stack.Navigator>
  );
};
