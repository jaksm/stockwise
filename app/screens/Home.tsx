import React from 'react';
import type {RootStackNavigation} from '../RootStack';
import {useGetSymbols} from '../api/queries/useGetSymbols';
import {Button} from '../components/ui/Button';
import {Flex} from '../components/ui/Flex';
import {Label} from '../components/ui/typography';

type HomeScreenProps = {
  navigation: RootStackNavigation;
};

export function Home({navigation}: HomeScreenProps) {
  const {data} = useGetSymbols(['AAPL']);

  return (
    <Flex gap="3">
      <Label>{JSON.stringify(data, null, 2)}</Label>
      <Button onPress={() => navigation.navigate('AssetDetails')}>
        Go to Asset Details
      </Button>

      <Button onPress={() => navigation.navigate('ManageWatchlist')}>
        Go to Manage Watchlist
      </Button>
    </Flex>
  );
}
