import {Plus} from 'lucide-react-native';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {AssetSearchResult} from '../models/AssetSearchResult';
import {Flex} from './ui/Flex';

type Props = {
  value: AssetSearchResult;
  onPress?: () => void;
};

export function AssetSearchResultListItem({value, onPress}: Props) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    symbol: {
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize.subheading,
      fontWeight: theme.fontWeight.semibold,
      color: theme.colors.text.base,
    },
    name: {
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize.label,
      color: theme.colors.text.muted,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        paddingVertical="4">
        <Flex direction="column" gap="1" shrink={1}>
          <Text style={styles.symbol}>{value.symbol}</Text>
          <Text style={styles.name} numberOfLines={1}>
            {value.name}
          </Text>
        </Flex>

        <Plus size={20} color={theme.colors.text.muted} />
      </Flex>
    </Pressable>
  );
}
