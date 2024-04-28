import classNames from 'classnames';
import Link from 'next/link';

import type { CurrencyExchangeData } from '../helpers/api';

import { ALL_CURRENCIES_DATA, CurrencyData } from '../helpers/constants';

export type fromOrTo = 'from' | 'to';

type CurrencyCardProps = {
  fromOrTo: fromOrTo;
  value: string;
  onValueChange?: (value: string) => void;
  exchangeRateData?: CurrencyExchangeData;
  toCurrency?: CurrencyData;
  currency: CurrencyData;
  setCurrency: (currency: CurrencyData) => void;
};

export const CurrencyCard = (props: CurrencyCardProps) => {
  const { fromOrTo, value, currency, setCurrency, onValueChange, exchangeRateData, toCurrency } =
    props;

  return (
    <div className="currency-card--body">
      <label className="currency-card--label" htmlFor={`${fromOrTo}Currency`}>
        {fromOrTo.charAt(0).toUpperCase() + fromOrTo.slice(1)}
      </label>

      <div
        className={classNames({
          'currency-card--input--container': true,
          'to-currency': fromOrTo === 'to'
        })}
      >
        <input
          className="currency-card--input"
          type="number"
          value={value}
          onChange={({ target }) => {
            fromOrTo === 'from' && onValueChange && onValueChange(target.value);
          }}
          id={`${fromOrTo}Currency`}
          placeholder={
            fromOrTo === 'from'
              ? `Amount in ${currency.latinSymbol}`
              : `Converted to ${currency.latinSymbol}`
          }
          disabled={fromOrTo === 'to'}
          autoFocus={fromOrTo === 'from'}
          min={0}
        />

        <div className="currency-card--dropdown--container">
          <select
            className="currency-card--dropdown--select"
            value={currency.symbol}
            onChange={({ target }) => {
              if (target.value) {
                const currency = ALL_CURRENCIES_DATA.find(item => item.symbol === target.value);

                setCurrency(currency as CurrencyData);
              }
            }}
          >
            {ALL_CURRENCIES_DATA.map(currency => (
              <option value={currency.symbol} key={currency.symbol}>
                {currency.symbol.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {fromOrTo === 'from' && toCurrency && (
        <p className="currency-card--note">
          {exchangeRateData?.[toCurrency.symbol] ? (
            <>
              {currency.latinSymbol}1 = {toCurrency.latinSymbol}
              {exchangeRateData?.[toCurrency.symbol]?.toFixed(2)}
            </>
          ) : (
            'Fetching exchange rate...'
          )}
        </p>
      )}

      {fromOrTo === 'to' && (
        <p className="currency-card--note text-right">
          Powered by{' '}
          <Link href="https://github.com/fawazahmed0/exchange-api" target="_blank">
            Currency Exchange Rates API
          </Link>
        </p>
      )}
    </div>
  );
};
