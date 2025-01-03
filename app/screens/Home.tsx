import React, {useState} from 'react';
import type {RootStackNavigation} from '../RootStack';
import {useGetAssetsQuery, useSearchAssetsQuery} from '../api/queries';
import {SearchBar} from '../components/SearchBar';
import {SearchResultsList} from '../components/SearchResultList';
import {WatchList} from '../components/WatchList';
import {Flex} from '../components/ui/Flex';
import {useWatchlistStore} from '../hooks/useWatchlistStore';
import {SearchResult} from '../models/SearchResult';

type HomeScreenProps = {
  navigation: RootStackNavigation;
};

export function Home(_: HomeScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const isSearching = searchTerm.length > 0;

  const searchQuery = useSearchAssetsQuery(searchTerm);
  const watchlist = useWatchlistStore('default-watchlist');
  const watchlistQuery = useGetAssetsQuery(watchlist.symbols);

  const filteredResults = searchQuery.data?.filter(
    result => !watchlist.symbols.includes(result.symbol),
  );

  const onAddToWatchlist = (asset: SearchResult) => {
    watchlist.addSymbol(asset.symbol);
    setSearchTerm('');
  };

  return (
    <Flex gap="3" paddingTop="4">
      <SearchBar
        placeholder="Search assets..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {isSearching ? (
        <SearchResultsList
          data={filteredResults}
          isLoading={searchQuery.isLoading}
          isError={searchQuery.isError}
          onItemPress={onAddToWatchlist}
        />
      ) : (
        <WatchList
          data={watchlistQuery.data}
          isError={watchlistQuery.isError}
          isLoading={watchlistQuery.isLoading}
          isRefreshing={watchlistQuery.isRefetching}
          onRefresh={watchlistQuery.refetch}
        />
      )}
    </Flex>
  );
}
