import React, { useState, useEffect } from 'react';
import './_TextInput.scss';

const TextInput = ({ title, type, sendValue }) => {
    const [term, setTerm] = useState('');

    const onInputChange = (event) => {
        setTerm(event.target.value);
    };

    useEffect(() => {
        sendValue(term);
    }, [term, sendValue]);

    return (
        <div className="number-input-container">
            <h1 className="under-title-2">{title}</h1>
            
            <input
                type={type}
                value={term}
                onChange={(event) => onInputChange(event)}
                className="input-2"
            />
        </div>
    );
};


export default TextInput;
