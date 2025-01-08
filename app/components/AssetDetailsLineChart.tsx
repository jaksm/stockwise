import {
  Circle,
  LinearGradient,
  Line as SkiaLine,
  Text as SkiaText,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import {format} from 'date-fns';
import React, {memo, useMemo} from 'react';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {Area, CartesianChart, Line, useChartPressState} from 'victory-native';
import {TimeSeriesInterval} from '../api/types';
import {useTheme} from '../hooks/useTheme';
import {TimeSeries} from '../models/TimeSeries';
import {Flex} from './ui/Flex';
import {ToggleGroup} from './ui/ToggleGroup';

interface AssetDetailsLineChartProps {
  series: TimeSeries;
  interval: TimeSeriesInterval;
  onChangeInterval: (interval: TimeSeriesInterval) => void;
}

const inter = require('../../assets/Inter.ttf');

const DATE_FORMAT = {
  week: 'EEE',
  month: 'd. MMM',
  year: 'MMM',
} satisfies Record<TimeSeriesInterval, string>;

export const AssetDetailsLineChart = memo(
  ({series, interval, onChangeInterval}: AssetDetailsLineChartProps) => {
    const theme = useTheme();
    const font = useFont(inter, 12);

    const press = useChartPressState({x: 0, y: {high: 0}});

    const toggleGroupOptions = useMemo(
      () => [
        {
          key: 'week',
          label: 'Week',
          onPress: () => onChangeInterval('week'),
        },
        {
          key: 'month',
          label: 'Month',
          onPress: () => onChangeInterval('month'),
        },
        {
          key: 'year',
          label: 'Year',
          onPress: () => onChangeInterval('year'),
        },
      ],
      [onChangeInterval],
    );

    return (
      <Flex gap="8" style={{height: theme.spacing['80']}}>
        <Flex align="center">
          <ToggleGroup active={interval} options={toggleGroupOptions} />
        </Flex>

        <Flex style={{height: theme.spacing[64]}}>
          <CartesianChart
            data={series}
            xKey="timestamp"
            yKeys={['high']}
            padding={{bottom: 12}}
            chartPressState={press.state}
            axisOptions={{
              font,
              labelColor: theme.colors.text.base,
              lineColor: 'transparent',
              labelOffset: {x: 12, y: 12},
              axisSide: {y: 'right', x: 'bottom'},
              formatXLabel: label =>
                format(new Date(label), DATE_FORMAT[interval]),
            }}>
            {({points, chartBounds}) => (
              <>
                <Line
                  antiAlias
                  points={points.high}
                  color={theme.colors.primary}
                  strokeWidth={3}
                />
                <Area points={points.high} y0={chartBounds.bottom}>
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, theme.spacing[64])}
                    colors={[theme.colors.primary, 'transparent']}
                  />
                </Area>

                {press.isActive && (
                  <>
                    <ActiveValueIndicator
                      xPosition={press.state.x.position}
                      yPosition={press.state.y.high.position}
                      bottom={chartBounds.bottom}
                      top={chartBounds.top}
                      activeValue={press.state.y.high.value}
                      activeTime={press.state.x.value}
                      textColor={theme.colors.text.base}
                      lineColor={theme.colors.text.muted}
                      indicatorColor={theme.colors.primary}
                    />
                  </>
                )}
              </>
            )}
          </CartesianChart>
        </Flex>
      </Flex>
    );
  },
);

const ActiveValueIndicator = ({
  xPosition,
  yPosition,
  top,
  bottom,
  activeValue,
  textColor,
  lineColor,
  indicatorColor,
  topOffset = 0,
}: {
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
  activeValue: SharedValue<number>;
  activeTime: SharedValue<number>;
  bottom: number;
  top: number;
  textColor: string;
  lineColor: string;
  indicatorColor: string;
  topOffset?: number;
}) => {
  const FONT_SIZE = 14;
  const font = useFont(inter, FONT_SIZE);
  const start = useDerivedValue(() => vec(xPosition.value, bottom));
  const end = useDerivedValue(() =>
    vec(xPosition.value, top + 1.5 * FONT_SIZE + topOffset),
  );

  const activeValueDisplay = useDerivedValue(() =>
    activeValue.value.toFixed(2),
  );

  const activeValueWidth = useDerivedValue(
    () =>
      font
        ?.getGlyphWidths?.(font.getGlyphIDs(activeValueDisplay.value))
        .reduce((sum, value) => sum + value, 0) || 0,
  );

  const activeValueX = useDerivedValue(
    () => xPosition.value - activeValueWidth.value / 2,
  );

  return (
    <>
      <SkiaLine p1={start} p2={end} color={lineColor} strokeWidth={1} />
      <Circle cx={xPosition} cy={yPosition} r={10} color={indicatorColor} />
      <Circle
        cx={xPosition}
        cy={yPosition}
        r={8}
        color="hsla(0, 0, 100%, 0.25)"
      />
      <SkiaText
        color={textColor}
        font={font}
        text={activeValueDisplay}
        x={activeValueX}
        y={top + FONT_SIZE + topOffset}
      />
    </>
  );
};
