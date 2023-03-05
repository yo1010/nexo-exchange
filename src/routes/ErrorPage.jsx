import React from 'react';
import { useRouteError } from 'react-router-dom';

import styles from '../styles/App.module.scss';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className={styles.errorContainer}>
            <h1>Ooops!</h1>
            <h3>An uxpected error has occured</h3>
            <h5>{error.statusText || error.message}</h5>
        </div>
    );
};

export default ErrorPage;
