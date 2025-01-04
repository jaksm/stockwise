import React from 'react';
import {
  ActivityIndicator,
  ListRenderItem,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {Article} from '../models/Article';
import {Asset} from '../models/Asset';
import {ArticleListItem} from './ArticleListItem';
import {AssetChangeLabel} from './AssetChangeLabel';
import {Flex} from './ui/Flex';
import {Body, Heading, Subheading} from './ui/typography';

type ArticleListProps = {
  assets: Asset[];
  articles?: Article[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
};

type Section = {
  symbol: string;
  data: Article[];
};

export function ArticleList({
  articles = [],
  assets,
  isLoading,
  isRefreshing,
  onRefresh,
}: ArticleListProps) {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Flex padding="4" align="center">
        <ActivityIndicator color={theme.colors.text.muted} />
      </Flex>
    );
  }

  if (articles.length === 0) {
    return (
      <Flex padding="4" align="center">
        <Body muted>No articles found</Body>
      </Flex>
    );
  }

  const sections: Section[] = articles.reduce((acc: Section[], article) => {
    const existingSection = acc.find(
      section => section.symbol === article.symbol,
    );
    if (existingSection) {
      existingSection.data.push(article);
    } else {
      acc.push({
        symbol: article.symbol,
        data: [article],
      });
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

  const renderItem: ListRenderItem<Article> = ({item}) => (
    <ArticleListItem article={item} />
  );

  const renderSectionHeader = ({section}: {section: Section}) => {
    const asset = assets?.find(a => a.symbol === section.symbol);

    return (
      <Flex style={styles.sectionHeader} gap="1">
        <Heading>{section.symbol}</Heading>
        {asset && (
          <Flex direction="row" align="center" gap="2">
            <Subheading>{asset.price}</Subheading>
            <AssetChangeLabel asset={asset} variant="value" />
          </Flex>
        )}
      </Flex>
    );
  };

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={<View style={styles.bottomSpacer} />}
      keyExtractor={item => `${item.url}`}
      style={styles.list}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={!!isRefreshing} onRefresh={onRefresh} />
      }
    />
  );
}
