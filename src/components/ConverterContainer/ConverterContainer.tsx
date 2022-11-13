import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./converterContainer.scss";

interface Props {
    usd: number,
    eur: number,
}

export const ConverterContainer = ({ usd, eur }: Props) => {

    const [inputOne, setInputOne] = useState<number>(0);
    const [inputTwo, setInputTwo] = useState<number>(0);

    const [currencySelectOne, setCurrencySelectOne] = useState<string>("UAN");
    const [currencySelectTwo, setCurrencySelectTwo] = useState<string>("UAN");

    const onHadleSelectOne = (currency: string) => {
        setCurrencySelectOne(currency);
        const usdConversy = inputOne * getCurrencyNumber(currency) / getCurrencyNumber(currencySelectTwo);
        setInputTwo(onRound(usdConversy));
    }

    const onHadleSelectTwo = (currency: string) => {
        setCurrencySelectTwo(currency);
        const usdConversy = inputTwo * getCurrencyNumber(currency) / getCurrencyNumber(currencySelectOne);
        setInputOne(onRound(usdConversy));
    }

    const onInputValueOne = (valueOne: number) => {
        setInputOne(valueOne);
        const convertedValue = valueOne * getCurrencyNumber(currencySelectOne) / getCurrencyNumber(currencySelectTwo);
        setInputTwo(onRound(convertedValue));
    }

    const onInputValueTwo = (valueTwo: number) => {
        setInputTwo(valueTwo);
        const convertedValue = valueTwo * getCurrencyNumber(currencySelectTwo) / getCurrencyNumber(currencySelectOne);
        setInputOne(onRound(convertedValue));
    }

    const getCurrencyNumber = (currency: string) => {
        if (currency == "USD") {
            return usd;
        }
        if (currency == "EUR") {
            return eur;
        }
        else {
            return 1;
        }
    }

    const onRound = (value: number) => {
        return +value.toFixed(2);
    }

    return (
        <>
            <div className="converter">
                <div className="converter__body" >
                    
                    <h1 className="pt-4 pb-4">Рахуйте разом з нами!</h1>
                    <h2 className="pb-4">Офіційний курс України <a href="https://bank.gov.ua/ua/markets/exchangerates" className="converter__link" target="_blank">тут</a></h2>

                    <div>

                        <div className="d-flex">
                            <Form.Control
                                type="number"
                                placeholder="UAN"
                                value={inputOne}
                                className="me-2"
                                onChange={(event) => onInputValueOne(+event.target.value)}
                            />

                            <Form.Select name="" id="" onChange={(e) => onHadleSelectOne(e.target.value)}>
                                <option key="UAN" value="UAN">UAN</option>
                                <option key="USD" value="USD">USD</option>
                                <option key="EUR" value="EUR">EUR</option>
                            </Form.Select>
                        </div>

                        <div className="d-flex">
                            <Form.Control
                                type="number"
                                placeholder="UAN"
                                value={inputTwo}
                                className="me-2 mt-2"
                                onChange={(event) => onInputValueTwo(+event.target.value)}
                            />

                            <Form.Select v-model="selected" className="mt-2" name="" id="" onChange={(e) => onHadleSelectTwo(e.target.value)}>
                                <option key="UAN" value="UAN" >UAN</option>
                                <option key="USD" value="USD" >USD</option>
                                <option key="EUR" value="EUR" >EUR</option>
                            </Form.Select>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}