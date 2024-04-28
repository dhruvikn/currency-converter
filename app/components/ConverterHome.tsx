'use client';

import { useCallback, useEffect, useState } from 'react';

import type { CurrencyExchangeData } from '../helpers/api';
import type { CurrencyData } from '../helpers/constants';

import { fetchExchangeRate } from '../helpers/api';
import { convert, setValueInSessionStorage } from '../helpers/utils';
import { CurrencyCard } from './CurrencyCard';
import { ToggleButton } from './ToggleButton';

export const ConverterHome = () => {
  const [exchangeRateData, setExchangeRateData] = useState<CurrencyExchangeData>();
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
  const [fromCurrencyValue, setFromCurrencyValue] = useState<string>('');
  const [toCurrencyValue, setToCurrencyValue] = useState<string>('');
  const [isToggleClicked, setIsToggleClicked] = useState(false);

  const handleToggleClick = () => {
    setIsToggleClicked(true);

    const prevFromCurrency = { ...fromCurrency };
    const prevToCurrency = { ...toCurrency };

    setFromCurrency(prevToCurrency);
    setToCurrency(prevFromCurrency);

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
    if (exchangeRateData && fromCurrencyValue) {
      const convertedValue = convert(
        fromCurrencyValue,
        fromCurrency.symbol,
        toCurrency.symbol,
        exchangeRateData
      );

      if (convertedValue) {
        setToCurrencyValue(convertedValue);
      }
    }
  }, [exchangeRateData, fromCurrency.symbol, fromCurrencyValue, toCurrency.symbol]);

  useEffect(() => {
    setValueInSessionStorage('fromCurrency', fromCurrency);
    setValueInSessionStorage('toCurrency', toCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <>
      <div className="currency-card--container frosted-glass flex-col md:flex-row items-center">
        <CurrencyCard
          fromOrTo="from"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          value={fromCurrencyValue}
          onValueChange={value => {
            setFromCurrencyValue(value);

            if (exchangeRateData) {
              const convertedValue = convert(
                value,
                fromCurrency.symbol,
                toCurrency.symbol,
                exchangeRateData
              );

              if (convertedValue) {
                setToCurrencyValue(convertedValue);
              }
            }
          }}
          exchangeRateData={exchangeRateData}
          toCurrency={toCurrency}
        />

        <ToggleButton isToggleClicked={isToggleClicked} handleToggleClick={handleToggleClick} />

        <CurrencyCard
          fromOrTo="to"
          currency={toCurrency}
          setCurrency={setToCurrency}
          value={toCurrencyValue}
          exchangeRateData={exchangeRateData}
        />
      </div>
    </>
  );
};
