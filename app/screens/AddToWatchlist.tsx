import {HeaderBackButton} from '@react-navigation/elements';
import React, {useState} from 'react';
import {RootStackNavigation} from '../RootStack';
import {useSearchAssetsQuery} from '../api/queries';
import {SearchBar} from '../components/SearchBar';
import {SearchResultsList} from '../components/SearchResultList';
import {Flex} from '../components/ui/Flex';
import {useTheme} from '../hooks/useTheme';
import {useWatchlistStore} from '../hooks/useWatchlistStore';
import {SearchResult} from '../models/SearchResult';

type AddToWatchlistProps = {
  navigation: RootStackNavigation;
};

export function AddToWatchlist({navigation}: AddToWatchlistProps) {
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const searchQuery = useSearchAssetsQuery(searchTerm);

  const watchlist = useWatchlistStore('default-watchlist');

  const filteredResults = searchQuery.data?.filter(
    result => !watchlist.symbols.includes(result.symbol),
  );

  const onAddToWatchlist = (asset: SearchResult) => {
    watchlist.addSymbol(asset.symbol);
    setSearchTerm('');
    navigation.navigate('Home');
  };

  return (
    <Flex gap="3" paddingTop="4">
      <Flex direction="row" gap="2">
        <HeaderBackButton
          tintColor={theme.colors.text.base}
          onPress={() => navigation.goBack()}
        />

        <SearchBar
          placeholder="Search assets..."
          autoFocus
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </Flex>

      <SearchResultsList
        data={filteredResults}
        isLoading={searchQuery.isLoading}
        isError={searchQuery.isError}
        onItemPress={onAddToWatchlist}
      />
    </Flex>
  );
}
