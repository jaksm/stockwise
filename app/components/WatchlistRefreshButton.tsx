import {RefreshCw} from 'lucide-react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {useGetAssetsQuery} from '../api/queries';
import {useWatchlistStore} from '../hooks/useWatchlistStore';
import {IconButton} from './ui/IconButton';

export const WatchlistRefreshButton = () => {
  const [isLive, setIsLive] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const watchlist = useWatchlistStore('default-watchlist');
  const watchlistQuery = useGetAssetsQuery(watchlist.symbols, {isLive});

  const onPress = () => {
    if (isLive) {
      setIsLive(false);
    } else {
      watchlistQuery.refetch();
    }
  };

  const spinValue = useMemo(() => new Animated.Value(0), []);
  const scaleValue = useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;

    if (isLive) {
      animation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      animation.start();
    }

    return () => {
      if (animation) {
        animation.reset();
      }
    };
  }, [isLive, spinValue]);

  useEffect(() => {
    if (isLongPressing) {
      Animated.spring(scaleValue, {
        toValue: 1.2,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 8,
        tension: 20,
        useNativeDriver: true,
      }).start();
    }
  }, [isLongPressing, scaleValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        transform: [{rotate: spin}, {scale: scaleValue}],
      }}>
      <IconButton
        icon={<RefreshCw />}
        onPress={onPress}
        onLongPress={() => {
          setIsLongPressing(false);
          setIsLive(true);
        }}
        onPressIn={() => setIsLongPressing(true)}
        onPressOut={() => setIsLongPressing(false)}
      />
    </Animated.View>
  );
};
