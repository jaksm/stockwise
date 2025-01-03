import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {Spacing} from '../../theme';

type FlexProps = {
  children?: React.ReactNode;
  flex?: ViewStyle['flex'];
  direction?: ViewStyle['flexDirection'];
  wrap?: ViewStyle['flexWrap'];
  justify?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  grow?: ViewStyle['flexGrow'];
  shrink?: ViewStyle['flexShrink'];
  basis?: ViewStyle['flexBasis'];
  gap?: Spacing;
  padding?: Spacing;
  paddingHorizontal?: Spacing;
  paddingVertical?: Spacing;
  paddingTop?: Spacing;
  paddingRight?: Spacing;
  paddingBottom?: Spacing;
  paddingLeft?: Spacing;
  style?: ViewStyle;
};

export function Flex({
  children,
  flex,
  direction,
  wrap,
  justify,
  align,
  alignSelf,
  grow,
  shrink,
  basis,
  gap,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  style,
  ...props
}: FlexProps) {
  const theme = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      position: 'relative',
      flex,
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: justify,
      alignItems: align,
      alignSelf,
      flexGrow: grow,
      flexShrink: shrink,
      flexBasis: basis,
      gap: gap ? theme.spacing[gap] : undefined,
      padding: padding ? theme.spacing[padding] : undefined,
      paddingHorizontal: paddingHorizontal
        ? theme.spacing[paddingHorizontal]
        : undefined,
      paddingVertical: paddingVertical
        ? theme.spacing[paddingVertical]
        : undefined,
      paddingTop: paddingTop ? theme.spacing[paddingTop] : undefined,
      paddingRight: paddingRight ? theme.spacing[paddingRight] : undefined,
      paddingBottom: paddingBottom ? theme.spacing[paddingBottom] : undefined,
      paddingLeft: paddingLeft ? theme.spacing[paddingLeft] : undefined,
    },
  });

  return (
    <View style={[dynamicStyles.container, style]} {...props}>
      {children}
    </View>
  );
}
