import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {Spacing} from '../../theme';

type IconButtonProps = {
  icon: React.ReactElement;
  size?: Exclude<Spacing, 'hairline' | 'stretch'>;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

export function IconButton({
  icon,
  size = '10',
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
}: IconButtonProps) {
  const theme = useTheme();

  const iconWithProps = React.cloneElement(icon, {
    size: theme.spacing[size] * 0.64,
    color: theme.colors.text.base,
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.8}>
      {iconWithProps}
    </TouchableOpacity>
  );
}
