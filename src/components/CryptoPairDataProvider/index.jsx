import React, { useEffect, useState } from 'react';
import { useInterval } from '../../hooks';
import { getSearchedPairData } from './helpers';

const CryptoPairDataProvider = ({ children, cryptoPair }) => {
    const [searchedPairs, setSearchedPairs] = useState([]);

    //HANDLE CALLS TO SERVER ON CRYPTO PAIR CHANGE
    useEffect(() => {
        if (cryptoPair) {
            getSearchedPairData(cryptoPair, searchedPairs, setSearchedPairs);
        }
    }, [cryptoPair]);

    //HANDLE POLLING OF DATA
    useInterval(
        () => getSearchedPairData(cryptoPair, searchedPairs, setSearchedPairs),
        10000,
        !!cryptoPair
    );

    /*     if (data?.error?.length > 0) {
        console.log('RETURN');
        return (
            <h1>
                There has been an error with retrieving the pair data. <br />{' '}
                This might be due to an{' '}
                {data.error[0].split('EQuery:').join('')}{' '}
            </h1>
        );
    } */

    return children(searchedPairs);
};

export default CryptoPairDataProvider;
