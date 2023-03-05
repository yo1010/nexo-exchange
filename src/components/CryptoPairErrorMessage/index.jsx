import React from 'react';

const CryptoPairErrorMessage = ({ errors }) => {
    if (errors.length === 0 || !errors) return null;

    const errorToDisplay = errors[0].split('EQuery:').join('').toLowerCase();
    return (
        <h5>
            Oops something went wrong! It seems this is due to an{' '}
            {errorToDisplay}. Please try again!
        </h5>
    );
};

export default CryptoPairErrorMessage;
