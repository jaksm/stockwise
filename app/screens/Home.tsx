import {Plus} from 'lucide-react-native';
import React from 'react';
import type {RootStackNavigation} from '../RootStack';
import {useGetAssetsQuery} from '../api/queries';
import {WatchList} from '../components/WatchList';
import {Flex} from '../components/ui/Flex';
import {FloatingActionButton} from '../components/ui/FloatingActionButton';
import {Title} from '../components/ui/typography';
import {useTheme} from '../hooks/useTheme';
import {useWatchlistStore} from '../hooks/useWatchlistStore';

type HomeProps = {
  navigation: RootStackNavigation;
};

export function Home({navigation}: HomeProps) {
  const theme = useTheme();

  const watchlist = useWatchlistStore('default-watchlist');
  const watchlistQuery = useGetAssetsQuery(watchlist.symbols);

  return (
    <Flex gap="1" paddingTop="6" flex={1}>
      <Title>StockWise</Title>

      <WatchList
        data={watchlistQuery.data}
        isError={watchlistQuery.isError}
        isLoading={watchlistQuery.isLoading}
        isRefreshing={watchlistQuery.isRefetching}
        onRefresh={watchlistQuery.refetch}
      />

      <FloatingActionButton
        icon={<Plus color={theme.colors.text.base} />}
        onPress={() => navigation.navigate('AddToWatchlist')}
      />
    </Flex>
  );
}
