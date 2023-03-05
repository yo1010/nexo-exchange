import React from 'react';
import { useParams } from 'react-router-dom';
import CryptoPairDataProvider from '../components/CryptoPairDataProvider';
import CryptoPairErrorMessage from '../components/CryptoPairErrorMessage';
import CryptoPairResultsTable from '../components/CryptoPairResultsTable';

import styles from '../styles/App.module.scss';

const URLTablePage = () => {
    const { cryptoPair } = useParams();

    return (
        <div className={styles.container}>
            <CryptoPairDataProvider cryptoPair={cryptoPair}>
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

export default URLTablePage;
