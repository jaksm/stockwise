import {useColorScheme} from 'react-native';
import {theme} from '../theme';

export function useTheme() {
  const colorScheme = useColorScheme();
  const appTheme = colorScheme === 'dark' ? theme.dark : theme.light;

  return {
    colorScheme,
    ...appTheme,
  };
}
