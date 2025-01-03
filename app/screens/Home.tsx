import React, {useState} from 'react';
import type {RootStackNavigation} from '../RootStack';
import {useAssetSearchQuery} from '../api/queries';
import {AssetSearchResultsList} from '../components/AssetSearchResultsList';
import {SearchBar} from '../components/SearchBar';
import {Flex} from '../components/ui/Flex';

type HomeScreenProps = {
  navigation: RootStackNavigation;
};

export function Home(_: HomeScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchQuery = useAssetSearchQuery(searchTerm);

  return (
    <Flex gap="3" paddingTop="4">
      <SearchBar
        placeholder="Search assets..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <AssetSearchResultsList {...searchQuery} />
    </Flex>
  );
}
