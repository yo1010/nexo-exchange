import React, { useState } from 'react';
import CryptoPairDataProvider from '../components/CryptoPairDataProvider';
import CryptoPairResultsTable from '../components/CryptoPairResultsTable';
import CryptoPairSearchField from '../components/CryptoPairSearchField';

import styles from '../styles/App.module.scss';

const SearchUserInterface = () => {
    const [cryptoPairToSearch, setCryptoPairToSearch] = useState('');

    return (
        <div className={styles.container}>
            <CryptoPairSearchField setCryptoPair={setCryptoPairToSearch} />
            <CryptoPairDataProvider cryptoPair={cryptoPairToSearch}>
                {(results) => <CryptoPairResultsTable results={results} />}
            </CryptoPairDataProvider>
        </div>
    );
};

export default SearchUserInterface;
