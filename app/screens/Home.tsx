import {Newspaper, Plus} from 'lucide-react-native';
import React from 'react';
import type {RootStackNavigation} from '../RootStack';
import {useGetAssetsQuery} from '../api/queries';
import {NewsBottomSheet} from '../components/NewsBottomSheet';
import {Watchlist} from '../components/Watchlist';
import {WatchlistRefreshButton} from '../components/WatchlistRefreshButton';
import {Flex} from '../components/ui/Flex';
import {FloatingActionButton} from '../components/ui/FloatingActionButton';
import {IconButton} from '../components/ui/IconButton';
import {Title} from '../components/ui/typography';
import {useBottomSheet} from '../hooks/useBottomSheet';
import {useWatchlistStore} from '../hooks/useWatchlistStore';
import {Asset} from '../models/Asset';

type HomeProps = {
  navigation: RootStackNavigation;
};

export function Home({navigation}: HomeProps) {
  const watchlist = useWatchlistStore();
  const watchlistQuery = useGetAssetsQuery(watchlist.symbols);

  const newsSheet = useBottomSheet();

  const onPressItem = (item: Asset) =>
    navigation.navigate('AssetDetails', {symbol: item.symbol});

  const onRemoveItem = (item: Asset) => watchlist.removeSymbol(item.symbol);

  const onAddPress = () => navigation.navigate('AddToWatchlist');

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
          onPressItem={onPressItem}
          onRefresh={watchlistQuery.refetch}
          onRemoveItem={onRemoveItem}
        />
      </Flex>

      <FloatingActionButton icon={<Plus />} onPress={onAddPress} />

      <NewsBottomSheet {...newsSheet.props} assets={watchlistQuery.data} />
    </>
  );
}
