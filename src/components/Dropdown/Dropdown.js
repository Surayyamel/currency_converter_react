import React, { useEffect, useState } from 'react';
import './_Dropdown.scss';


const Dropdown = ({ onChange, title }) => {
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        onChange(selectedCountry);
    }, [selectedCountry, onChange]);

    const countryArray = [
        {
            label: 'Australian dollar',
            value: 'AUD'
        },
        {
            label: 'Bulgarian lev',
            value: 'BGN'
        },
        {
            label: 'Brazilian real',
            value: 'BRL'
        },
        {
            label: 'British pound',
            value: 'GBP'
        },
        {
            label: 'Canadian dollar',
            value: 'CAD'
        },
        {
            label: 'Croatian kuna',
            value: 'HRK'
        },
        {
            label: 'Czech koruna',
            value: 'CZK'
        },
        {
            label: 'Danish krone',
            value: 'DKK'
        },
        {
            label: 'Euro',
            value: 'EUR'
        },
        {
            label: 'Hong Kong dollar',
            value: 'HKD'
        },
        {
            label: 'Hungarian forint',
            value: 'HUF'
        },
        {
            label: 'Indonesian rupiah',
            value: 'IDR'
        },
        {
            label: 'Israeli new shekel',
            value: 'ILS'
        },
        {
            label: 'Indian rupee',
            value: 'INR'
        },
        {
            label: 'Icelandic krona',
            value: 'ISK'
        },
        {
            label: 'Japanese yen',
            value: 'JYP'
        },
        {
            label: 'Mexican peso',
            value: 'MXN'
        },
        {
            label: 'Malaysian ringgit',
            value: 'MYR'
        },
        {
            label: 'Norweigian krone',
            value: 'NOK'
        },
        {
            label: 'New Zealand dollar',
            value: 'NZD'
        },
        {
            label: 'Philippine peso',
            value: 'PHP'
        },
        {
            label: 'Polish złoty',
            value: 'PLN'
        },
        {
            label: 'Renminbi',
            value: 'CNY'
        },
        {
            label: 'Romanian leu',
            value: 'RON'
        },
        {
            label: 'Russian ruble',
            value: 'RUB'
        },
        {
            label: 'Singapore dollar',
            value: 'SGD'
        },
        {
            label: 'South African rand',
            value: 'ZAR'
        },
        {
            label: 'South Korean won',
            value: 'KRW'
        },
        {
            label: 'Suiss franc',
            value: 'CHF'
        },
        {
            label: 'Swedish krona',
            value: 'SEK'
        },
        {
            label: 'Thai baht',
            value: 'THB'
        },
        {
            label: 'Turkish lira',
            value: 'TRY'
        },
        {
            label: 'United States dollar',
            value: 'USD'
        },
    ];

    const handleChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const countryList = countryArray.map((country) => {
        return (
            <option key={country.value} value={country.value}>
                {country.label}
            </option>
        );
    });

    return (
        <div className="dropdown-container">
            <h1 className="under-title">{title}</h1>
            <select name="country" onChange={handleChange} defaultValue={"currency"} className="input">
                <option value="currency" disabled hidden>Select a currency</option>
                {countryList}
            </select>
        </div>  
    );
};

export default Dropdown;
