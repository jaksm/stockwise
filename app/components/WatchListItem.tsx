import React from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useTheme} from '../hooks/useTheme';
import {Asset} from '../models/Asset';
import {Flex} from './ui/Flex';
import {Label, Subheading} from './ui/typography';

type WatchlistItemProps = {
  value: Asset;
  onPress?: () => void;
  onRemove?: (value: Asset) => void;
};

export function WatchlistItem({value, onPress, onRemove}: WatchlistItemProps) {
  const theme = useTheme();

  const isPositiveChange = Number(value.change) >= 0;
  const changeColor = isPositiveChange
    ? theme.colors.success
    : theme.colors.error;
  const changePrefix = isPositiveChange ? '+' : '';

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.error,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: theme.spacing['4'],
      marginLeft: theme.spacing['4'],
      gap: theme.spacing['2'],
      width: '100%',
    },
  });

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View style={[styles.container, {opacity}]}>
        <Label>Remove from watchlist</Label>
      </Animated.View>
    );
  };

  return (
    <Pressable onPress={onPress}>
      <Swipeable
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}
        onEnded={() => onRemove?.(value)}>
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
      </Swipeable>
    </Pressable>
  );
}
