import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {Article} from '../models/Article';
import {formatTimeAgo} from '../utils/formatter';
import {Flex} from './ui/Flex';
import {Body, Label} from './ui/typography';

type ArticleListItemProps = {
  article: Article;
};

export function ArticleListItem({article}: ArticleListItemProps) {
  const theme = useTheme();

  const handlePress = () => {
    Linking.openURL(article.url);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Flex paddingVertical="4" gap="2">
        <Flex direction="row" justify="space-between" align="center">
          <Label>{article.source}</Label>
        </Flex>

        <Body style={{fontWeight: theme.fontWeight.semibold}}>
          {article.title}
        </Body>

        <Body muted numberOfLines={2}>
          {article.summary}
        </Body>

        <Label muted>{formatTimeAgo(article.publishedAt)}</Label>
      </Flex>
    </TouchableOpacity>
  );
}
