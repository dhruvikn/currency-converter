import type { CurrencyExchangeData } from './api';
import type { CurrencySymbols } from './constants';

export const convert = (
  value: string,
  fromCurrencySymbol: CurrencySymbols,
  toCurrencySymbol: CurrencySymbols,
  exchangeRateData: CurrencyExchangeData
) => {
  if (!exchangeRateData[toCurrencySymbol]) {
    return;
  }

  const fromCurrencyRate = exchangeRateData[toCurrencySymbol];
  const toCurrencyRate = exchangeRateData[fromCurrencySymbol];

  const amount = (Number(value) * fromCurrencyRate) / toCurrencyRate;

  return amount.toFixed(2);
};

export const generateUniqueRandomValues = (min: number, max: number, n: number): number[] => {
  if (max - min + 1 < n) {
    throw new Error('Range is smaller than the number of unique values required.');
  }

  const result: Set<number> = new Set();
  while (result.size < n) {
    const randomValue: number = Math.floor(Math.random() * (max - min + 1)) + min;
    result.add(randomValue);
  }

  return Array.from(result);
};
