import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  ListRenderItem,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {Asset} from '../models/Asset';
import {Flex} from './ui/Flex';
import {Body, Subheading} from './ui/typography';
import {WatchlistItem} from './WatchListItem';

type WatchlistProps = {
  data?: Asset[];
  isError?: boolean;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onPressItem?: (item: Asset) => void;
  onRemoveItem?: (item: Asset) => void;
  onRefresh?: () => void;
};

type Section = {
  title: string;
  data: Asset[];
};

export function Watchlist({
  data = [],
  isError,
  isLoading,
  isRefreshing,
  onRefresh,
  onPressItem,
  onRemoveItem,
}: WatchlistProps) {
  const theme = useTheme();

  const sections: Section[] = data.reduce((acc: Section[], item) => {
    const existingSection = acc.find(section => section.title === item.type);
    if (existingSection) {
      existingSection.data.push(item);
    } else {
      acc.push({title: item.type, data: [item]});
    }
    return acc;
  }, []);

  const styles = StyleSheet.create({
    sectionHeader: {
      borderBottomWidth: theme.spacing.hairline,
      borderBottomColor: theme.colors.primary,
      paddingVertical: theme.spacing['3'],
      backgroundColor: theme.colors.background,
    },
    list: {
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingVertical: theme.spacing['2'],
    },
    bottomSpacer: {
      height: 100,
    },
  });

  const renderItem: ListRenderItem<Asset> = useCallback(
    ({item}) => (
      <WatchlistItem
        value={item}
        onPress={() => onPressItem?.(item)}
        onRemove={() => onRemoveItem?.(item)}
      />
    ),
    [onPressItem, onRemoveItem],
  );

  const renderSectionHeader = ({section}: {section: Section}) => (
    <Flex style={styles.sectionHeader}>
      <Subheading>{section.title}</Subheading>
    </Flex>
  );

  if (isLoading) {
    return (
      <Flex padding="4" align="center">
        <ActivityIndicator color={theme.colors.text.muted} />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex padding="4" align="center">
        <Body muted>
          An error occurred while fetching your watchlist. Please try again.
        </Body>
      </Flex>
    );
  }

  if (data.length === 0) {
    return (
      <Flex padding="4" align="center">
        <Body muted>Your watchlist is empty</Body>
      </Flex>
    );
  }

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={<View style={styles.bottomSpacer} />}
      keyExtractor={item => item.symbol}
      style={styles.list}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={!!isRefreshing} onRefresh={onRefresh} />
      }
    />
  );
}
