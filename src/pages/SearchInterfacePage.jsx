import React, { useState } from 'react';
import CryptoPairDataProvider from '../components/CryptoPairDataProvider';
import CryptoPairErrorMessage from '../components/CryptoPairErrorMessage';
import CryptoPairResultsTable from '../components/CryptoPairResultsTable';
import CryptoPairSearchField from '../components/CryptoPairSearchField';

import styles from '../styles/App.module.scss';

const SearchInterfacePage = () => {
    const [cryptoPairToSearch, setCryptoPairToSearch] = useState('');

    return (
        <div className={styles.container}>
            <CryptoPairSearchField setCryptoPair={setCryptoPairToSearch} />
            <CryptoPairDataProvider cryptoPair={cryptoPairToSearch}>
                {({ searchedPairs, errors }) => (
                    <>
                        <CryptoPairErrorMessage errors={errors} />
                        <CryptoPairResultsTable results={searchedPairs} />
                    </>
                )}
            </CryptoPairDataProvider>
        </div>
    );
};

export default SearchInterfacePage;
