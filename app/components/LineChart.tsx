'use client';

import { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';

import type { CurrencyExchangeRatesOverAPeriodResponse } from '../helpers/api';
import { CurrencyData } from '../helpers/constants';

type LineChartProps = {
  data: CurrencyExchangeRatesOverAPeriodResponse;
  fromCurrency: CurrencyData;
  toCurrency: CurrencyData;
};

export const LineChart = (props: LineChartProps) => {
  const { data, fromCurrency, toCurrency } = props;

  const formattedData = useMemo(() => {
    const newData = data.map(rate => {
      return {
        x: `${new Date(rate.date).getDate()}/${new Date(rate.date).getMonth() + 1}/${new Date(
          rate.date
        )
          .getFullYear()
          .toString()
          .slice(2)}`,
        y: rate.value.toFixed(2)
      };
    });

    return [
      {
        id: 'Line',
        color: 'hsl(50, 70%, 50%)',
        data: newData
      }
    ];
  }, [data]);

  const theme = {
    axis: {
      legend: { text: { fill: '#fcfcfc' } },
      ticks: {
        line: {
          stroke: '#272b30'
        },
        text: {
          fill: 'rgba(252,252,252, 0.75)'
        }
      }
    },
    grid: {
      line: {
        stroke: '#272b30'
      }
    },
    tooltip: {
      container: {
        background: '#272b30'
      }
    },
    crosshair: {
      line: {
        stroke: '#fcfcfc',
        strokeWidth: 1,
        strokeOpacity: 0.5
      }
    }
  };

  return (
    <ResponsiveLine
      data={formattedData}
      colors={() => '#bb2564'}
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date',
        legendOffset: 40,
        legendPosition: 'middle',
        truncateTickAt: 0
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Rate',
        legendOffset: -55,
        legendPosition: 'middle',
        truncateTickAt: 0
      }}
      enableTouchCrosshair={true}
      useMesh
      theme={theme}
      lineWidth={4}
      layers={[
        'grid',
        'markers',
        'axes',
        'areas',
        'crosshair',
        'lines',
        'points',
        'slices',
        'mesh',
        'legends'
      ]}
      pointSize={8}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      curve="natural"
      tooltip={({ point }) => {
        return (
          <div
            style={{
              background: '#272b30',
              padding: '12px',
              border: '1px solid #272b30',
              color: 'rgb(var(--color-fg))',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(var(--color-dark-2), 0.5)'
            }}
          >
            {fromCurrency.latinSymbol}1 ={' '}
            <b>
              {toCurrency.latinSymbol}
              {point.data.yFormatted}
            </b>{' '}
            - {point.data.xFormatted}
          </div>
        );
      }}
    />
  );
};
