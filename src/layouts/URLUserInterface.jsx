import React from 'react';
import { useParams } from 'react-router-dom';
import CryptoPairDataProvider from '../components/CryptoPairDataProvider';
import CrryptoPairResultsTable from '../components/CryptoPairResultsTable';

import styles from '../styles/App.module.scss';

const URLUserInterface = () => {
    const { cryptoPair } = useParams();

    return (
        <div className={styles.container}>
            <CryptoPairDataProvider cryptoPair={cryptoPair}>
                {(results) => <CrryptoPairResultsTable results={results} />}
            </CryptoPairDataProvider>
        </div>
    );
};

export default URLUserInterface;
