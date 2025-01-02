import {StyleSheet} from 'react-native';

const spacing = {
  hairline: StyleSheet.hairlineWidth,
  stretch: '100%',
  '0': 0,
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
  '11': 44,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
  '28': 112,
  '32': 128,
  '36': 144,
  '40': 160,
  '44': 176,
  '48': 192,
  '52': 208,
  '56': 224,
  '60': 240,
  '64': 256,
  '72': 288,
  '80': 320,
  '96': 384,
} as const;

const borderRadius = {
  small: 4,
  base: 8,
  large: 18,
} as const;

const fontFamily = 'Inter';

const fontSize = {
  title: 32,
  heading: 20,
  subheading: 16,
  label: 14,
  button: 16,
  body: 16,
} as const;

const fontWeight = {
  regular: '400',
  semibold: '600',
  black: '800',
} as const;

const lineHeight = {
  title: 32,
  body: 22.4,
} as const;

export const themeCommon = {
  fontWeight,
  fontFamily,
  borderRadius,
  spacing,
  lineHeight,
  fontSize,
} as const;

const light = {
  ...themeCommon,
  colors: {
    text: {
      base: '#09090b',
      muted: '#52525b',
      inverted: '#f4f4f5',
    },
    inverted: '#18181b',
    muted: '#52525b',
    background: '#fafafa',
    primary: '#d97706',
    error: '#dc2626',
    success: '#65a30d',
  },
} as const;

const dark = {
  ...themeCommon,
  colors: {
    text: {
      base: '#fafafa',
      muted: '#d4d4d8',
      inverted: '#09090b',
    },
    inverted: '#e4e4e7',
    muted: '#a1a1aa',
    background: '#000',
    primary: '#d97706',
    error: '#dc2626',
    success: '#65a30d',
  },
} as const;

export const theme = {light, dark} as const;

export type Background = Exclude<keyof typeof theme.light.colors, 'text'>;
export type Foreground = keyof typeof theme.light.colors.text;
export type BorderRadius = keyof typeof borderRadius;
export type FontSize = keyof typeof fontSize;
export type FontFamily = keyof typeof fontFamily;
export type Spacing = keyof typeof spacing;
export type LineHeight = keyof typeof lineHeight;
