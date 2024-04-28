import axios from 'axios';
import type { CurrencySymbols } from './constants';

export type CurrencyExchangeData = {
  [key in CurrencySymbols]: number;
} & {
  date: string;
  baseCurrency: CurrencySymbols;
};

export type CurrencyExchangeRatesOverAPeriodResponse = {
  value: number;
  date: string;
}[];

export const fetchExchangeRate = async (
  fromCurrencySymbol: CurrencySymbols
): Promise<CurrencyExchangeData | Error> => {
  if (!fromCurrencySymbol?.length) {
    return new Error('Invalid currency');
  }

  const CURRENCY_EXCHANGE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencySymbol}.json`;

  try {
    const response = await axios.get(CURRENCY_EXCHANGE_URL);
    const data: CurrencyExchangeData = {
      ...response?.data[fromCurrencySymbol],
      date: response.data.date,
      baseCurrency: fromCurrencySymbol
    };

    return data;
  } catch (error) {
    console.error(error);
    return new Error('Failed to fetch exchange rate');
  }
};

export const fetchExchangeRateForLastNDays = async (
  fromCurrencySymbol: CurrencySymbols,
  toCurrencySymbol: CurrencySymbols,
  days: number = 7
): Promise<CurrencyExchangeRatesOverAPeriodResponse | Error> => {
  if (!fromCurrencySymbol?.length) {
    return new Error('Invalid currency');
  }

  const CURRENCY_EXCHANGE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencySymbol}.json`;

  try {
    const fetchRequests = [];

    // Fetch exchange rates for the last 7 days
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const formattedDate = date.toISOString().split('T')[0];
      const request = axios.get(CURRENCY_EXCHANGE_URL.replace('@latest', '@' + formattedDate));

      fetchRequests.push(request);
    }

    // Wait for all requests to complete
    const responses = await Promise.all(fetchRequests);

    // Process response data
    const exchangeRates: CurrencyExchangeRatesOverAPeriodResponse = responses.map(response => {
      const data = response?.data;

      const exchangeRate = data[fromCurrencySymbol][toCurrencySymbol];
      const date = data.date;

      return {
        value: exchangeRate,
        date
      };
    });

    exchangeRates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return exchangeRates;
  } catch (error) {
    console.error(error);
    return new Error('Failed to fetch exchange rates');
  }
};
