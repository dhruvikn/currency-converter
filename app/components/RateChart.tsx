'use client';

import { useEffect, useState } from 'react';

import type { CurrencyExchangeRatesOverAPeriodResponse } from '../helpers/api';
import type { CurrencyData, CurrencySymbols } from '../helpers/constants';

import { fetchExchangeRateForLastNDays } from '../helpers/api';
import { getValueFromSessionStorage } from '../helpers/utils';
import { LineChart } from './LineChart';
import { Spinner } from './Spinner';

export const RateChart = () => {
  const [exchangeRateNDays, setExchangeRateNDays] =
    useState<CurrencyExchangeRatesOverAPeriodResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fromCurrency: CurrencyData = getValueFromSessionStorage('fromCurrency');
  const toCurrency: CurrencyData = getValueFromSessionStorage('toCurrency');

  const getExchangeRateForLastNDays = async (
    fromCurrencySymbol: CurrencySymbols = 'usd',
    toCurrencySymbol: CurrencySymbols = 'inr',
    days: number = 7
  ) => {
    setIsLoading(true);

    const response = await fetchExchangeRateForLastNDays(
      fromCurrencySymbol,
      toCurrencySymbol,
      days
    );

    if (!response || response instanceof Error) {
      setIsLoading(false);
      return;
    }

    if (response?.length) {
      setExchangeRateNDays(response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExchangeRateForLastNDays(fromCurrency?.symbol, toCurrency?.symbol);
  }, [fromCurrency?.symbol, toCurrency?.symbol]);

  return (
    <div className="frosted-glass mt-8 rate-chart--container">
      <h2 className="text-center">Exchange rate for the last 7 days</h2>

      <div className="chart">
        {!isLoading && exchangeRateNDays?.length ? (
          <LineChart data={exchangeRateNDays} fromCurrency={fromCurrency} toCurrency={toCurrency} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
