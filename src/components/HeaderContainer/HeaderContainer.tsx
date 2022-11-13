import React from 'react';
import { Money } from '../../App';
import './headerContainer.scss';
import { MdEuro } from 'react-icons/md';
import { IoLogoUsd } from 'react-icons/io';

interface Props {
    usd: number,
    eur: number,
    currencies: Money[],
}

export const HeaderContainer = ({ usd, eur, currencies }: Props) => {

    if (!currencies || currencies.length === 0) return <p>Нет данных.</p>

    return (
        <>
            <div className='header'>
                <div>
                    <div>
                        <select className="form-select" name="" id="">
                            {currencies.map((currency: any) =>
                                <option value="" key={currency.id}>
                                    {currency.cc} ({currency.txt}) = {currency.rate.toFixed(2)} UAN
                                </option>
                            )}
                        </select>
                    </div>
                    <div> <IoLogoUsd /> = {usd.toFixed(2)} UAN</div>
                    <div> <MdEuro /> = {eur.toFixed(2)} UAN</div>
                </div>
            </div>
        </>
    )
}