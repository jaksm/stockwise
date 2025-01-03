import React from 'react';
import {
  ActivityIndicator,
  ListRenderItem,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {SearchResult} from '../models/SearchResult';
import {SearchResultListItem} from './SearchResultListItem';
import {Flex} from './ui/Flex';
import {Body, Subheading} from './ui/typography';

type SearchResultsListProps = {
  data?: SearchResult[];
  isError?: boolean;
  isLoading?: boolean;
  onItemPress?: (item: SearchResult) => void;
};

type Section = {
  title: string;
  data: SearchResult[];
};

export function SearchResultsList({
  data,
  isError,
  isLoading,
  onItemPress,
}: SearchResultsListProps) {
  const theme = useTheme();

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
          An error occurred while fetching results. Please try again.
        </Body>
      </Flex>
    );
  }

  if (!data) {
    return null;
  }

  if (data.length === 0) {
    return (
      <Flex padding="4" align="center">
        <Body muted>No results found</Body>
      </Flex>
    );
  }

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

  const renderItem: ListRenderItem<SearchResult> = ({item}) => (
    <SearchResultListItem value={item} onPress={() => onItemPress?.(item)} />
  );

  const renderSectionHeader = ({section}: {section: Section}) => (
    <Flex style={styles.sectionHeader}>
      <Subheading>{section.title}</Subheading>
    </Flex>
  );

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
    />
  );
}
