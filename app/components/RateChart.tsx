'use client';

import { useEffect, useState } from 'react';

import type { CurrencyExchangeRatesOverAPeriodResponse } from '../helpers/api';
import type { CurrencySymbols } from '../helpers/constants';

import { fetchExchangeRateForLastNDays } from '../helpers/api';

export const RateChart = () => {
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
    getExchangeRateForLastNDays();
  }, []);

  return (
    <div className="frosted-glass mt-8 rate-chart-container">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis voluptates officiis rem, earum
      consequatur amet! Distinctio culpa, autem eius sapiente architecto eaque ab, vero, tempora ea
      aut voluptates aperiam dolorem.
    </div>
  );
};
