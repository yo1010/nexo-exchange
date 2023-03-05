import React, { useEffect, useState } from 'react';
import { useInterval } from '../../hooks';
import { getSearchedPairData } from './helpers';

const CryptoPairDataProvider = ({ children, cryptoPair }) => {
    const [searchedPairs, setSearchedPairs] = useState([]);
    const [errors, setErrors] = useState([]);

    //HANDLE CALLS TO SERVER ON CRYPTO PAIR CHANGE
    useEffect(() => {
        if (cryptoPair) {
            getSearchedPairData(
                cryptoPair,
                searchedPairs,
                setSearchedPairs,
                setErrors
            );
        }
    }, [cryptoPair]);

    //HANDLE POLLING OF DATA
    useInterval(
        () =>
            getSearchedPairData(
                cryptoPair,
                searchedPairs,
                setSearchedPairs,
                setErrors
            ),
        10000,
        !!cryptoPair
    );

    return children({
        searchedPairs,
        errors,
    });
};

export default CryptoPairDataProvider;
