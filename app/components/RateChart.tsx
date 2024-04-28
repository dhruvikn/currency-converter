'use client';

import { useEffect, useState } from 'react';

import type { CurrencyExchangeRatesOverAPeriodResponse } from '../helpers/api';
import type { CurrencySymbols } from '../helpers/constants';

import { fetchExchangeRateForLastNDays } from '../helpers/api';
import { LineChart } from './LineChart';
import { Spinner } from './Spinner';

type RateChartProps = {
  fromCurrencySymbol?: CurrencySymbols;
  toCurrencySymbol?: CurrencySymbols;
  days?: number;
};

export const RateChart = (props: RateChartProps) => {
  const { fromCurrencySymbol, toCurrencySymbol, days = 7 } = props;

  const [exchangeRateNDays, setExchangeRateNDays] =
    useState<CurrencyExchangeRatesOverAPeriodResponse>();

  const getExchangeRateForLastNDays = async (
    fromCurrencySymbol: CurrencySymbols = 'usd',
    toCurrencySymbol: CurrencySymbols = 'inr',
    days: number = 7
  ) => {
    const response = await fetchExchangeRateForLastNDays(
      fromCurrencySymbol,
      toCurrencySymbol,
      days
    );

    if (!response || response instanceof Error) {
      return;
    }

    if (response?.length) {
      setExchangeRateNDays(response);
    }
  };

  useEffect(() => {
    getExchangeRateForLastNDays(fromCurrencySymbol, toCurrencySymbol, days);
  }, [days, fromCurrencySymbol, toCurrencySymbol]);

  return (
    <div className="frosted-glass mt-8 rate-chart--container">
      <h2>
        Exchange rate for the last 7 days from {fromCurrencySymbol} to {toCurrencySymbol}
      </h2>

      <div className="chart">
        {exchangeRateNDays?.length ? <LineChart data={exchangeRateNDays} /> : <Spinner />}
      </div>
    </div>
  );
};
