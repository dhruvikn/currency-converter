'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';

import type { CurrencyExchangeData } from './helpers/api';
import type { CurrencyData } from './helpers/constants';

import { fetchExchangeRate } from './helpers/api';
import { ALL_CURRENCIES_DATA } from './helpers/constants';

export default function Home() {
  const [exchangeRateData, setExchangeRateData] = useState<CurrencyExchangeData>({});
  const [fromCurrency, setFromCurrency] = useState<CurrencyData>({
    name: 'United States Dollar',
    symbol: 'USD',
    latinSymbol: '$'
  });
  const [toCurrency, setToCurrency] = useState<CurrencyData>({
    name: 'Indian Rupee',
    symbol: 'INR',
    latinSymbol: '₹'
  });
  const [fromCurrencyValue, setFromCurrencyValue] = useState<string>();
  const [toCurrencyValue, setToCurrencyValue] = useState<string>();
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  const handleSelectClose = () => {
    console.log('close');
    setIsSelectOpen(false);
  };

  const getExchangeRate = async () => {
    // const response = await fetchExchangeRate(fromCurrency, toCurrency);
    // console.log(response);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="page-title">Currency Exchange</h1>

      <div className="currency-card--container">
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
              maxLength={10}
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
                onFocus={handleSelectOpen}
                onBlur={handleSelectClose}
              >
                {ALL_CURRENCIES_DATA.map(currency => (
                  <option value={currency.symbol} key={currency.symbol}>
                    {currency.symbol}{' '}
                    {isSelectOpen && (
                      <span>
                        {currency.name} - {currency.latinSymbol}
                      </span>
                    )}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
              maxLength={10}
              placeholder={`Amount in ${toCurrency.latinSymbol}`}
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
                onFocus={handleSelectOpen}
                onBlur={handleSelectClose}
              >
                {ALL_CURRENCIES_DATA.map(currency => (
                  <option value={currency.symbol} key={currency.symbol}>
                    {currency.symbol}{' '}
                    {isSelectOpen && (
                      <span>
                        {currency.name} - {currency.latinSymbol}
                      </span>
                    )}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
