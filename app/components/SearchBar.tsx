import debounce from 'lodash.debounce';
import {Search} from 'lucide-react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

type SearchBarProps = {
  value: string;
  placeholder?: string;
  debounceTime?: number;
  onChangeText: (text: string) => void;
  onClear?: () => void;
};

export function SearchBar({
  value,
  placeholder,
  debounceTime = 300,
  onChangeText,
  onClear,
}: SearchBarProps) {
  const [term, setTerm] = useState(value);

  const debouncedOnChangeText = useMemo(
    () => debounce(onChangeText, debounceTime),
    [onChangeText, debounceTime],
  );

  const handleChangeText = useCallback(
    (text: string) => {
      setTerm(text);
      debouncedOnChangeText(text);
      if (text === '') {
        onClear?.();
      }
    },
    [debouncedOnChangeText, onClear],
  );

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inverted,
      borderRadius: theme.borderRadius.base,
      paddingRight: theme.spacing['4'],
      paddingLeft: theme.spacing['2'],
      paddingVertical: theme.spacing['2'],
      gap: theme.spacing['2'],
    },
    input: {
      flex: 1,
      color: theme.colors.text.inverted,
      fontSize: theme.fontSize.body,
      fontFamily: theme.fontFamily,
    },
  });

  return (
    <View style={styles.container}>
      <Search size={20} color={theme.colors.text.inverted} />
      <TextInput
        value={term}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.inverted}
        style={styles.input}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        clearButtonMode="while-editing"
        keyboardType="default"
        returnKeyType="search"
        enablesReturnKeyAutomatically
      />
    </View>
  );
}
