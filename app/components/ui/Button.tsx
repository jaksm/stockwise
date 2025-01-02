import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {Background, Foreground} from '../../theme';

type ButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  background?: Background;
  foreground?: Foreground;
  fullWidth?: boolean;
  disabled?: boolean;
};

export function Button({
  onPress,
  children,
  background = 'inverted',
  foreground = 'inverted',
  fullWidth = true,
  disabled = false,
}: ButtonProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[4],
      borderRadius: theme.borderRadius.large,
      backgroundColor: disabled ? theme.colors.muted : theme.colors[background],
      width: fullWidth ? '100%' : undefined,
    },
    text: {
      color: theme.colors.text[foreground],
      fontSize: theme.fontSize.button,
      fontFamily: theme.fontFamily,
      fontWeight: theme.fontWeight.semibold,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}
