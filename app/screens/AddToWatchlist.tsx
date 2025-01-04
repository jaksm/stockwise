import {ChevronLeft} from 'lucide-react-native';
import React, {useState} from 'react';
import {RootStackNavigation} from '../RootStack';
import {useSearchAssetsQuery} from '../api/queries';
import {SearchBar} from '../components/SearchBar';
import {SearchResultsList} from '../components/SearchResultList';
import {Flex} from '../components/ui/Flex';
import {IconButton} from '../components/ui/IconButton';
import {useWatchlistStore} from '../hooks/useWatchlistStore';
import {SearchResult} from '../models/SearchResult';

type AddToWatchlistProps = {
  navigation: RootStackNavigation;
};

export function AddToWatchlist({navigation}: AddToWatchlistProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchQuery = useSearchAssetsQuery(searchTerm);

  const watchlist = useWatchlistStore();

  const filteredResults = searchQuery.data?.filter(
    result => !watchlist.symbols.includes(result.symbol),
  );

  const onAddToWatchlist = async (asset: SearchResult) => {
    setSearchTerm('');
    await watchlist.addSymbol(asset.symbol);
    navigation.goBack();
  };

  return (
    <Flex gap="3" paddingTop="4">
      <Flex direction="row" align="center" gap="2">
        <IconButton
          size="12"
          icon={<ChevronLeft />}
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
