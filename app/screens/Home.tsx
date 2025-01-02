import React from 'react';
import type {RootStackNavigation} from '../RootStack';
import {Button} from '../components/ui/Button';
import {Flex} from '../components/ui/Flex';

type HomeScreenProps = {
  navigation: RootStackNavigation;
};

export function Home({navigation}: HomeScreenProps) {
  return (
    <Flex gap="3">
      <Button onPress={() => navigation.navigate('AssetDetails')}>
        Go to Asset Details
      </Button>

      <Button onPress={() => navigation.navigate('ManageWatchlist')}>
        Go to Manage Watchlist
      </Button>
    </Flex>
  );
}
