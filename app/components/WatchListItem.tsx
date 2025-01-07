import React, {FC, memo} from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useTheme} from '../hooks/useTheme';
import {Asset} from '../models/Asset';
import {AssetChangeLabel} from './AssetChangeLabel';
import {Flex} from './ui/Flex';
import {Label, Subheading} from './ui/typography';
import {WatchlistItemLineChart} from './WatchlistItemLineChart';

type WatchlistItemProps = {
  value: Asset;
  onPress?: () => void;
  onRemove?: (value: Asset) => void;
};

export const WatchlistItem: FC<WatchlistItemProps> = memo(
  ({value, onPress, onRemove}) => {
    const theme = useTheme();

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
            paddingVertical="4"
            gap="2">
            <Flex direction="column" gap="1" flex={3}>
              <Subheading muted={false}>{value.symbol}</Subheading>
              <Label muted numberOfLines={1}>
                {value.name}
              </Label>
            </Flex>

            <Flex flex={2}>
              <WatchlistItemLineChart data={value.timeSeriesMonthly} />
            </Flex>

            <Flex flex={1} direction="column" gap="1" align="flex-end">
              <Subheading muted={false} numberOfLines={1}>
                {value.price.toFixed(2)}
              </Subheading>
              <AssetChangeLabel asset={value} variant="value" />
            </Flex>
          </Flex>
        </Swipeable>
      </Pressable>
    );
  },
);
