import {TrendingDown, TrendingUp} from 'lucide-react-native';
import React from 'react';
import {useTheme} from '../hooks/useTheme';
import {Asset} from '../models/Asset';
import {Flex} from './ui/Flex';
import {Label} from './ui/typography';

type AssetChangeLabelProps = {
  asset: Asset;
  variant: 'value' | 'percent';
};

export function AssetChangeLabel({asset, variant}: AssetChangeLabelProps) {
  const theme = useTheme();
  const isPositiveChange = Number(asset.change) >= 0;
  const changeColor = isPositiveChange
    ? theme.colors.success
    : theme.colors.error;
  const value = variant === 'percent' ? asset.changePercent : asset.change;

  return (
    <Flex direction="row" align="center" gap="1">
      {isPositiveChange ? (
        <TrendingUp color={theme.colors.success} size={theme.spacing['4']} />
      ) : (
        <TrendingDown color={theme.colors.error} size={theme.spacing['4']} />
      )}
      <Label style={{color: changeColor}}>
        {value}
        {variant === 'percent' ? '%' : ''}
      </Label>
    </Flex>
  );
}
