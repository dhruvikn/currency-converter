import { CurrencySymbols } from './constants';

export const convertToCurrency = (amount: number, currencySymbol: CurrencySymbols) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencySymbol
  });

  return formatter.format(amount);
};
