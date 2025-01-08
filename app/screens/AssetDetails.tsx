import React from 'react';

import {useGetAssetDetailsQuery, useGetAssetNewsQuery} from '../api/queries';
import {AssetDetailsLineChart} from '../components/AssetDetailsLineChart';
import {Flex} from '../components/ui/Flex';
import {RootStackNavigation, RootStackParamList} from '../RootStack';

type AssetDetails = {
  navigation: RootStackNavigation;
  route: {
    params: RootStackParamList['AssetDetails'];
  };
};

export function AssetDetails({route: {params}}: AssetDetails) {
  const detailsQuery = useGetAssetDetailsQuery(params.symbol);
  const newsQuery = useGetAssetNewsQuery(params.symbol);

  return (
    <Flex>
      <AssetDetailsLineChart symbol={params.symbol} />
    </Flex>
  );
}
