import axios from 'axios';
import type { CurrencySymbols } from './constants';

export type CurrencyExchangeResponse = {
  [key in CurrencySymbols]: number;
} & {
  date: string;
  baseCurrency: CurrencySymbols;
};

export const fetchExchangeRate = async (
  fromCurrencySymbol: CurrencySymbols
): Promise<CurrencyExchangeResponse | Error> => {
  if (!fromCurrencySymbol?.length) {
    return new Error('Invalid currency');
  }

  const CURRENCY_EXCHANGE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencySymbol}.json`;

  try {
    const response = await axios.get(CURRENCY_EXCHANGE_URL);
    const data: CurrencyExchangeResponse = response?.data?.[fromCurrencySymbol];

    data.baseCurrency = fromCurrencySymbol;

    return data;
  } catch (error) {
    console.error(error);
    return new Error('Failed to fetch exchange rate');
  }
};
