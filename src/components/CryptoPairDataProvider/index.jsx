import React, { useEffect, useState } from 'react';
import { useCryptoPairContext } from '../CryptoPairContextProvider';
import axios from 'axios';
import { handleSearchedPairData } from './helpers';

const CryptoPairDataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [cryptoPair] = useCryptoPairContext();
    const [searchedPairs, setSearchedPairs] = useState([]);

    useEffect(() => {
        console.log('CRYPTO PAIR', searchedPairs);
        if (cryptoPair) {
            const searchedPairNames = searchedPairs.map((pair) => pair.name);
            axios
                .get(
                    `https://api.kraken.com/0/public/Ticker?pair=${[
                        ...searchedPairNames,
                        cryptoPair,
                    ].join(', ')}`
                )
                .then((res) => {
                    setData(res?.data);
                    handleSearchedPairData(
                        res,
                        cryptoPair,
                        searchedPairs,
                        setSearchedPairs
                    );
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [cryptoPair]);

    if (data?.error?.length > 0) {
        console.log('RETURN');
        return (
            <h1>
                There has been an error with retrieving the pair data. <br />{' '}
                This might be due to an{' '}
                {data.error[0].split('EQuery:').join('')}{' '}
            </h1>
        );
    }

    return children(searchedPairs);
};

export default CryptoPairDataProvider;
