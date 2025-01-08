import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {Flex} from './Flex';

type Option = {
  key: string;
  label: string;
  onPress: (key: string) => void;
};

type ToggleGroupProps = {
  options: Option[];
  active: string;
};

export function ToggleGroup({options, active}: ToggleGroupProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[2],
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.muted,
    },
    buttonFirst: {
      borderTopLeftRadius: theme.borderRadius.base,
      borderBottomLeftRadius: theme.borderRadius.base,
    },
    buttonLast: {
      borderTopRightRadius: theme.borderRadius.base,
      borderBottomRightRadius: theme.borderRadius.base,
    },
    buttonActive: {
      backgroundColor: theme.colors.inverted,
    },
    text: {
      color: theme.colors.text.muted,
      fontSize: theme.fontSize.label,
      fontFamily: theme.fontFamily,
      fontWeight: theme.fontWeight.semibold,
    },
    textActive: {
      color: theme.colors.text.inverted,
    },
  });

  return (
    <Flex direction="row">
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.key}
          style={[
            styles.button,
            index === 0 && styles.buttonFirst,
            index === options.length - 1 && styles.buttonLast,
            active === option.key && styles.buttonActive,
          ]}
          onPress={() => option.onPress(option.key)}>
          <Text
            style={[styles.text, active === option.key && styles.textActive]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </Flex>
  );
}
