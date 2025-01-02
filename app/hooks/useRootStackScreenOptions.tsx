import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Heading} from '../components/ui/typography';
import {useTheme} from './useTheme';

export function useRootStackScreenOptions(): NativeStackNavigationOptions {
  const theme = useTheme();

  return {
    headerBackButtonDisplayMode: 'minimal',
    headerShadowVisible: false,
    statusBarStyle: 'auto',
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.text.base,
    headerTitle: Heading,
    headerTitleStyle: {
      fontWeight: theme.fontWeight.semibold,
    },
    contentStyle: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing['3.5'],
    },
  };
}