import React from 'react';
import {Button, Text, View} from 'react-native';
import type {RootStackNavigation} from '../RootStack';

type HomeScreenProps = {
  navigation: RootStackNavigation;
};

export function Home({navigation}: HomeScreenProps) {
  return (
    <View>
      <Text>Home Screen</Text>

      <Button
        onPress={() => navigation.navigate('AssetDetails')}
        title="Go to Asset Details"
      />

      <Button
        onPress={() => navigation.navigate('ManageWatchlist')}
        title="Go to Manage Watchlist"
      />
    </View>
  );
}
