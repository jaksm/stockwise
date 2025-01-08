import React, {useCallback, useState} from 'react';

import {ActivityIndicator, FlatList} from 'react-native';
import {
  useGetAssetDetailsQuery,
  useGetAssetNewsQuery,
  useGetStats,
} from '../api/queries';
import {TimeSeriesInterval} from '../api/types';
import {ArticleListItem} from '../components/ArticleListItem';
import {AssetChangeLabel} from '../components/AssetChangeLabel';
import {AssetDetailsLineChart} from '../components/AssetDetailsLineChart';
import {Flex} from '../components/ui/Flex';
import {Body, Heading, Label, Title} from '../components/ui/typography';
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

  const [interval, setInterval] = useState<TimeSeriesInterval>('month');
  const statsQuery = useGetStats(params.symbol, {interval});

  const renderListHeader = useCallback(
    () => (
      <Flex gap="3">
        {statsQuery.data && (
          <AssetDetailsLineChart
            interval={interval}
            series={statsQuery.data}
            onChangeInterval={setInterval}
          />
        )}

        {detailsQuery.data && (
          <Flex direction="row" gap="4">
            <Flex flex={1}>
              <Flex direction="row" align="baseline" justify="space-between">
                <Label>Open</Label>
                <Body>{detailsQuery.data.open}</Body>
              </Flex>

              <Flex direction="row" align="baseline" justify="space-between">
                <Label>High</Label>
                <Body>{detailsQuery.data.high}</Body>
              </Flex>

              <Flex direction="row" align="baseline" justify="space-between">
                <Label>Low</Label>
                <Body>{detailsQuery.data.low}</Body>
              </Flex>

              <Flex direction="row" align="baseline" justify="space-between">
                <Label>Close</Label>
                <Body>{detailsQuery.data.close}</Body>
              </Flex>

              <Flex direction="row" align="baseline" justify="space-between">
                <Label>Volume</Label>
                <Body>{detailsQuery.data.volume}</Body>
              </Flex>
            </Flex>

            <Flex flex={1} justify="space-between">
              <Flex direction="row" align="center" gap="2">
                <Heading>{detailsQuery.data.price}</Heading>
                <AssetChangeLabel variant="value" asset={detailsQuery.data} />
              </Flex>
              <Flex>
                <Heading>{detailsQuery.data.symbol}</Heading>
                <Label>{detailsQuery.data.name}</Label>
              </Flex>
            </Flex>
          </Flex>
        )}

        <Flex paddingVertical="5">
          <Title>Business News</Title>
        </Flex>
      </Flex>
    ),
    [detailsQuery.data, interval, statsQuery.data],
  );

  if (
    detailsQuery.isLoading ||
    newsQuery.isLoading ||
    statsQuery.isLoading ||
    !newsQuery.data
  ) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={newsQuery.data}
      keyExtractor={item => item.url}
      renderItem={({item}) => <ArticleListItem article={item} />}
      ListHeaderComponent={renderListHeader}
      showsVerticalScrollIndicator={false}
    />
  );
}
