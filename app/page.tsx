'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import type { CurrencyExchangeResponse } from './helpers/api';
import type { CurrencyData } from './helpers/constants';

import { fetchExchangeRate } from './helpers/api';
import { ALL_CURRENCIES_DATA } from './helpers/constants';
import Link from 'next/link';

export default function Home() {
  const [exchangeRateData, setExchangeRateData] = useState<CurrencyExchangeResponse>();
  const [fromCurrency, setFromCurrency] = useState<CurrencyData>({
    name: 'United States Dollar',
    symbol: 'usd',
    latinSymbol: '$'
  });
  const [toCurrency, setToCurrency] = useState<CurrencyData>({
    name: 'Indian Rupee',
    symbol: 'inr',
    latinSymbol: '₹'
  });
  const [fromCurrencyValue, setFromCurrencyValue] = useState<string>();
  const [toCurrencyValue, setToCurrencyValue] = useState<string>();
  const [isToggleClicked, setIsToggleClicked] = useState(false);

  const handleToggleClick = () => {
    const prevFromCurrency = fromCurrency;
    const prevToCurrency = toCurrency;
    const prevFromCurrencyValue = fromCurrencyValue;
    const prevToCurrencyValue = toCurrencyValue;

    setIsToggleClicked(true);
    setFromCurrency(prevToCurrency);
    setToCurrency(prevFromCurrency);
    setFromCurrencyValue(prevToCurrencyValue);
    setToCurrencyValue(prevFromCurrencyValue);

    setTimeout(() => {
      setIsToggleClicked(false);
    }, 500);
  };

  const getExchangeRate = useCallback(async () => {
    const response = await fetchExchangeRate(fromCurrency?.symbol);

    if (!response || response instanceof Error) {
      return;
    }

    setExchangeRateData(response);
  }, [fromCurrency]);

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, getExchangeRate]);

  useEffect(() => {
    if (
      fromCurrency?.symbol?.length &&
      toCurrency?.symbol?.length &&
      exchangeRateData?.[toCurrency.symbol] &&
      fromCurrencyValue?.length
    ) {
      const exchangeRate = exchangeRateData[toCurrency.symbol];

      if (exchangeRate) {
        const convertedValue = parseFloat(fromCurrencyValue) * exchangeRate;

        setToCurrencyValue(convertedValue.toFixed(2));
      }
    } else {
      setToCurrencyValue('');
    }
  }, [exchangeRateData, fromCurrency?.symbol?.length, fromCurrencyValue, toCurrency.symbol]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="page-title">Currency Exchange</h1>
        <h2 className="page-subtitle">
          Crafted with love -- by{' '}
          <Link target="_blank" href="https://linktr.ee/dhruvikn">
            Dhruvik Neharia
          </Link>{' '}
          -- for{' '}
          <Link target="_blank" href="https://clepher.com/">
            Clepher
          </Link>
          .
        </h2>

        <div className="currency-card--container flex-col md:flex-row items-center">
          <div className="currency-card--body">
            <label className="currency-card--label" htmlFor="fromCurrency">
              From
            </label>

            <div className="currency-card--input--container">
              <input
                className="currency-card--input"
                type="number"
                value={fromCurrencyValue}
                onChange={({ target }) => {
                  setFromCurrencyValue(target.value);
                }}
                id="fromCurrency"
                placeholder={`Amount in ${fromCurrency.latinSymbol}`}
              />

              <div className="currency-card--dropdown--container">
                <select
                  className="currency-card--dropdown--select"
                  value={fromCurrency.symbol}
                  onChange={({ target }) => {
                    if (target.value) {
                      const currency = ALL_CURRENCIES_DATA.find(
                        currency => currency.symbol === target.value
                      );

                      setFromCurrency(currency as CurrencyData);
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

            <p className="currency-card--note">
              {exchangeRateData?.[toCurrency.symbol] ? (
                <>
                  {fromCurrency.latinSymbol}1 = {toCurrency.latinSymbol}
                  {exchangeRateData?.[toCurrency.symbol]?.toFixed(2)}
                </>
              ) : (
                'Fetching exchange rate...'
              )}
            </p>
          </div>

          <button
            className={classNames({
              'toggle-currency': true,
              'is-active': isToggleClicked
            })}
            onClick={handleToggleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              aria-hidden="true"
              className="sc-64b15396-1 eereUj"
              viewBox="0 0 17 17"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="currency-card--body">
            <label className="currency-card--label" htmlFor="toCurrency">
              To
            </label>

            <div className="currency-card--input--container">
              <input
                className="currency-card--input"
                type="number"
                value={toCurrencyValue}
                onChange={({ target }) => {
                  setToCurrencyValue(target.value);
                }}
                id="toCurrency"
                placeholder={`Amount in ${toCurrency.latinSymbol}`}
                disabled={true}
              />

              <div className="currency-card--dropdown--container">
                <select
                  className="currency-card--dropdown--select"
                  value={toCurrency.symbol}
                  onChange={({ target }) => {
                    if (target.value) {
                      const currency = ALL_CURRENCIES_DATA.find(
                        currency => currency.symbol === target.value
                      );

                      setToCurrency(currency as CurrencyData);
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

            <p className="currency-card--note text-right">
              Powered by{' '}
              <Link href="https://github.com/fawazahmed0/exchange-api" target="_blank">
                Currency Exchange Rates API
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
