import React, {useState} from 'react';
import type {RootStackNavigation} from '../RootStack';
import {useGetAssetsQuery, useSearchAssetsQuery} from '../api/queries';
import {AssetSearchResultsList} from '../components/AssetSearchResultsList';
import {SearchBar} from '../components/SearchBar';
import {WatchList} from '../components/WatchList';
import {Flex} from '../components/ui/Flex';
import {useWatchlistStore} from '../hooks/useWatchlistStore';
import {AssetSearchResult} from '../models/AssetSearchResult';

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

  const onAddToWatchlist = (asset: AssetSearchResult) => {
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
        <AssetSearchResultsList
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
