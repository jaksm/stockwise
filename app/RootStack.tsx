import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {AssetDetails} from './screens/AssetDetails';
import {Home} from './screens/Home';
import {ManageWatchlist} from './screens/ManageWatchlist';

import {NavigationProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  AssetDetails: undefined;
  ManageWatchlist: undefined;
};

export type RootStackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerBackButtonDisplayMode: 'minimal',
};

export const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AssetDetails" component={AssetDetails} />
      <Stack.Screen name="ManageWatchlist" component={ManageWatchlist} />
    </Stack.Navigator>
  );
};
