import {Newspaper, Plus} from 'lucide-react-native';
import React from 'react';
import type {RootStackNavigation} from '../RootStack';
import {useGetAssetsQuery} from '../api/queries';
import {NewsBottomSheet} from '../components/NewsBottomSheet';
import {Watchlist} from '../components/WatchList';
import {WatchlistRefreshButton} from '../components/WatchlistRefreshButton';
import {Flex} from '../components/ui/Flex';
import {FloatingActionButton} from '../components/ui/FloatingActionButton';
import {IconButton} from '../components/ui/IconButton';
import {Title} from '../components/ui/typography';
import {useBottomSheet} from '../hooks/useBottomSheet';
import {useWatchlistStore} from '../hooks/useWatchlistStore';

type HomeProps = {
  navigation: RootStackNavigation;
};

export function Home({navigation}: HomeProps) {
  const watchlist = useWatchlistStore();
  const watchlistQuery = useGetAssetsQuery(watchlist.symbols);

  const newsSheet = useBottomSheet();

  return (
    <>
      <Flex gap="1" paddingTop="6" flex={1}>
        <Flex direction="row" align="center" justify="space-between">
          <Title>StockWise</Title>

          <Flex direction="row" align="center" gap="4">
            <IconButton icon={<Newspaper />} onPress={newsSheet.open} />

            <WatchlistRefreshButton />
          </Flex>
        </Flex>

        <Watchlist
          data={watchlistQuery.data}
          isError={watchlistQuery.isError}
          isLoading={watchlistQuery.isLoading}
          isRefreshing={watchlistQuery.isRefetching}
          onRefresh={watchlistQuery.refetch}
          onRemoveItem={item => watchlist.removeSymbol(item.symbol)}
        />
      </Flex>

      <FloatingActionButton
        icon={<Plus />}
        onPress={() => navigation.navigate('AddToWatchlist')}
      />

      <NewsBottomSheet {...newsSheet.props} assets={watchlistQuery.data} />
    </>
  );
}
