import type { CurrencyExchangeResponse } from './api';
import type { CurrencySymbols } from './constants';

export const convert = (
  value: string,
  fromCurrencySymbol: CurrencySymbols,
  toCurrencySymbol: CurrencySymbols,
  exchangeRateData: CurrencyExchangeResponse
) => {
  if (!exchangeRateData[toCurrencySymbol]) {
    return;
  }

  const fromCurrencyRate = exchangeRateData[toCurrencySymbol];
  const toCurrencyRate = exchangeRateData[fromCurrencySymbol];

  const amount = (Number(value) * fromCurrencyRate) / toCurrencyRate;

  return amount.toFixed(2);
};
