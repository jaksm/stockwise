import React from 'react';
import {Pressable} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {Asset} from '../models/Asset';
import {Flex} from './ui/Flex';
import {Label, Subheading} from './ui/typography';

type WatchlistItemProps = {
  value: Asset;
  onPress?: () => void;
};

export function WatchListItem({value, onPress}: WatchlistItemProps) {
  const theme = useTheme();

  const isPositiveChange = Number(value.change) >= 0;
  const changeColor = isPositiveChange
    ? theme.colors.success
    : theme.colors.error;
  const changePrefix = isPositiveChange ? '+' : '';

  return (
    <Pressable onPress={onPress}>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        paddingVertical="4">
        <Flex direction="column" gap="1" shrink={1}>
          <Subheading muted={false}>{value.symbol}</Subheading>
          <Label muted numberOfLines={1}>
            {value.name}
          </Label>
        </Flex>

        <Flex direction="column" gap="1" align="flex-end">
          <Subheading muted={false}>{value.price.toFixed(2)}</Subheading>
          <Label style={{color: changeColor}}>
            {changePrefix}
            {value.changePercent}%
          </Label>
        </Flex>
      </Flex>
    </Pressable>
  );
}
