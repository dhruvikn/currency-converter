import axios from 'axios';
import type { CurrencySymbols } from './constants';

export type CurrencyExchangeData = Record<string, string>;

const API_KEY = 'RIBXT3XYLI69PC0Q';

export const fetchExchangeRate = async (
  fromCurrency: CurrencySymbols,
  toCurrency: CurrencySymbols
) => {
  if (!fromCurrency.length || !toCurrency.length) {
    return new Error('Invalid currency');
  }

  const CURRENCY_EXCHANGE_URL = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${API_KEY}`;

  try {
    const response = await axios.get(CURRENCY_EXCHANGE_URL);
    const data: CurrencyExchangeData = response?.data;

    return data;
  } catch (error) {
    console.error(error);
  }
};
