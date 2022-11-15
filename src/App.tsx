import React, { useEffect, useState } from 'react';
import { ConverterContainer } from "./components/ConverterContainer/ConverterContainer";
import { HeaderContainer } from "./components/HeaderContainer/HeaderContainer";
import axios from 'axios';

export interface Money {
  r030: number,
  txt: string,
  rate: number,
  cc: string,
  exchangedate: string,
}

export const App = () => {

  const [appMoney, setAppMoney] = useState<Money[]>([]);

  const getCurentsis = () => {
    const apiUrl = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    axios.get(apiUrl).then(resp => {
      const money: Money[] = resp.data.map((item: Money) => {
        return {
          r030: item.r030,
          txt: item.txt,
          rate: item.rate,
          cc: item.cc,
          exchangedate: item.exchangedate,
        }
      })
      setAppMoney(money);
      setInitialData(money);
    });
  }

  const setInitialData = (money: Money[]) => {
    const usd = money?.find(x => x.cc == "USD")?.rate;
    const eur = money?.find(x => x.cc == "EUR")?.rate;
    if (usd) {
      setUsd(usd);
    }
    if (eur) {
      setEur(eur);
    }
  }

  useEffect(() => {
    getCurentsis()
  }, []);

  const [usd, setUsd] = useState(0);
  const [eur, setEur] = useState(0);

  return (
    <React.StrictMode>
      <HeaderContainer usd={usd} eur={eur} currencies={appMoney} />
      <ConverterContainer usd={usd} eur={eur} />
    </React.StrictMode>
  )
}