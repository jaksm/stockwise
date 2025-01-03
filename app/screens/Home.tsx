import React, {useState} from 'react';
import type {RootStackNavigation} from '../RootStack';
import {useAssetSearchQuery} from '../api/queries';
import {AssetSearchResultsList} from '../components/AssetSearchResultsList';
import {SearchBar} from '../components/SearchBar';
import {Flex} from '../components/ui/Flex';
import {useWatchlistStore} from '../hooks/useWatchlistStore';
import {AssetSearchResult} from '../models/AssetSearchResult';

type HomeScreenProps = {
  navigation: RootStackNavigation;
};

export function Home(_: HomeScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(true);

  const searchQuery = useAssetSearchQuery(searchTerm);
  const watchlist = useWatchlistStore('default-watchlist');

  const filteredResults = searchQuery.data?.filter(
    result => !watchlist.symbols.includes(result.symbol),
  );

  const onSearch = (term: string) => {
    setSearchTerm(term);
    setShowResults(true);
  };

  const onAddToWatchlist = (asset: AssetSearchResult) => {
    watchlist.addSymbol(asset.symbol);
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <Flex gap="3" paddingTop="4">
      <SearchBar
        placeholder="Search assets..."
        value={searchTerm}
        onChangeText={onSearch}
      />

      {showResults && (
        <AssetSearchResultsList
          data={filteredResults}
          isLoading={searchQuery.isLoading}
          isError={searchQuery.isError}
          onItemPress={onAddToWatchlist}
        />
      )}
    </Flex>
  );
}
