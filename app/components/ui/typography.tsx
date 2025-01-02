import React from 'react';
import {Text, TextProps} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

interface BaseTypographyProps extends TextProps {
  muted?: boolean;
  inverted?: boolean;
}

const getTextColor = (theme: any, muted?: boolean, inverted?: boolean) => {
  if (muted) {
    return theme.colors.text.muted;
  }

  if (inverted) {
    return theme.colors.text.inverted;
  }

  return theme.colors.text.base;
};

export const Title = ({
  style,
  muted,
  inverted,
  ...props
}: BaseTypographyProps) => {
  const theme = useTheme();
  return (
    <Text
      style={[
        {
          fontFamily: theme.fontFamily,
          fontWeight: theme.fontWeight.black,
          lineHeight: theme.lineHeight.title,
          fontSize: theme.fontSize.title,
          color: getTextColor(theme, muted, inverted),
        },
        style,
      ]}
      {...props}
    />
  );
};

export const Heading = ({
  style,
  muted,
  inverted,
  ...props
}: BaseTypographyProps) => {
  const theme = useTheme();
  return (
    <Text
      style={[
        {
          fontFamily: theme.fontFamily,
          fontWeight: theme.fontWeight.black,
          fontSize: theme.fontSize.heading,
          color: getTextColor(theme, muted, inverted),
        },
        style,
      ]}
      {...props}
    />
  );
};

export const Subheading = ({
  style,
  muted = true,
  inverted,
  ...props
}: BaseTypographyProps) => {
  const theme = useTheme();
  return (
    <Text
      style={[
        {
          fontFamily: theme.fontFamily,
          fontWeight: theme.fontWeight.semibold,
          fontSize: theme.fontSize.subheading,
          color: getTextColor(theme, muted, inverted),
        },
        style,
      ]}
      {...props}
    />
  );
};

export const Label = ({
  style,
  muted,
  inverted,
  ...props
}: BaseTypographyProps) => {
  const theme = useTheme();
  return (
    <Text
      style={[
        {
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSize.label,
          color: getTextColor(theme, muted, inverted),
        },
        style,
      ]}
      {...props}
    />
  );
};

export const Body = ({
  style,
  muted,
  inverted,
  ...props
}: BaseTypographyProps) => {
  const theme = useTheme();
  return (
    <Text
      style={[
        {
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSize.body,
          lineHeight: theme.lineHeight.body,
          color: getTextColor(theme, muted, inverted),
        },
        style,
      ]}
      {...props}
    />
  );
};
