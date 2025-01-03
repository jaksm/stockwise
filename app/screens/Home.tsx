import {Plus} from 'lucide-react-native';
import React from 'react';
import type {RootStackNavigation} from '../RootStack';
import {useGetAssetsQuery} from '../api/queries';
import {WatchList} from '../components/WatchList';
import {WatchlistRefreshButton} from '../components/WatchlistRefreshButton';
import {Flex} from '../components/ui/Flex';
import {FloatingActionButton} from '../components/ui/FloatingActionButton';
import {Title} from '../components/ui/typography';
import {useWatchlistStore} from '../hooks/useWatchlistStore';

type HomeProps = {
  navigation: RootStackNavigation;
};

export function Home({navigation}: HomeProps) {
  const watchlist = useWatchlistStore('default-watchlist');
  const watchlistQuery = useGetAssetsQuery(watchlist.symbols);

  return (
    <Flex gap="1" paddingTop="6" flex={1}>
      <Flex direction="row" align="center" justify="space-between">
        <Title>StockWise</Title>

        <WatchlistRefreshButton />
      </Flex>

      <WatchList
        data={watchlistQuery.data}
        isError={watchlistQuery.isError}
        isLoading={watchlistQuery.isLoading}
        isRefreshing={watchlistQuery.isRefetching}
        onRefresh={watchlistQuery.refetch}
      />

      <FloatingActionButton
        icon={<Plus />}
        onPress={() => navigation.navigate('AddToWatchlist')}
      />
    </Flex>
  );
}
