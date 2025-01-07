import React, {FC, memo} from 'react';

import {CartesianChart, Line} from 'victory-native';
import {useTheme} from '../hooks/useTheme';
import {TimeSeries} from '../models/TimeSeries';

type WatchlistItemLineChartProps = {
  data: TimeSeries;
};

export const WatchlistItemLineChart: FC<WatchlistItemLineChartProps> = memo(
  ({data}) => {
    const theme = useTheme();

    return (
      <CartesianChart data={data} xKey="timestamp" yKeys={['close']}>
        {({points}) => (
          <>
            <Line
              points={points.close}
              strokeWidth={2}
              antiAlias
              color={theme.colors.text.base}
              opacity={0.8}
            />
          </>
        )}
      </CartesianChart>
    );
  },
);
