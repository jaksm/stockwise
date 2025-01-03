import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {Background, Foreground, Spacing} from '../../theme';

type FloatingActionButtonProps = {
  icon: React.ReactElement;
  size?: Exclude<Spacing, 'hairline' | 'stretch'>;
  background?: Background;
  foreground?: Foreground;
  onPress?: () => void;
};

export function FloatingActionButton({
  icon,
  size = '12',
  background = 'primary',
  foreground = 'base',
  onPress,
}: FloatingActionButtonProps) {
  const theme = useTheme();

  const dynamicStyles = StyleSheet.create({
    button: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: theme.spacing[size],
      height: theme.spacing[size],
      borderRadius: theme.spacing[size] / 2,
      backgroundColor: theme.colors[background],
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
  });

  const iconWithProps = React.cloneElement(icon, {
    color: theme.colors.text[foreground],
    size: theme.spacing[size] * 0.5,
  });

  return (
    <TouchableOpacity
      style={dynamicStyles.button}
      onPress={onPress}
      activeOpacity={0.8}>
      {iconWithProps}
    </TouchableOpacity>
  );
}
