import React from 'react';
import {View, ViewStyle} from 'react-native';
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
  style,
  ...props
}: FlexProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
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
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
}
