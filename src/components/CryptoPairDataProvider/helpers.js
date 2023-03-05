import axios from 'axios';

//TURN DATA INTO AN OBJECT SO WE CAN SEARCH FASTER - better big o notation

/**
 *
 * @param res - response from Kraken API
 * @param setSearchedPairs - state update function for updating the previous searched pairs
 * @param setError - updates errors, if there was any
 *
 * Handles the state update of previously searcehd pairs
 */
const handleSearchedPairData = (res, setSearchedPairs, setErrors) => {
    setErrors(res?.data?.error?.length > 0 ? res.data.error : []);
    if (res?.data?.result) {
        setSearchedPairs(res.data.result);
    }
};

/**
 *
 * @param currentPair - current pair being searched
 * @param searchedPairs - other previous searched pairs
 * @param setSearchedPairs - state update function for updating the previous searched pairs
 * @param setError - updates errors, if there was any
 *
 * Gets data from Kraken for all the searched pairs
 */
export const getSearchedPairData = (
    currentPair,
    searchedPairs,
    setSearchedPairs,
    setErrors
) => {
    const searchedPairNames = Object.keys(searchedPairs);
    const pairsToFetch =
        searchedPairNames.indexOf(currentPair) < 0
            ? [...searchedPairNames, currentPair]
            : searchedPairNames;
    axios
        .get(
            `https://api.kraken.com/0/public/Ticker?pair=${pairsToFetch.join(
                ','
            )}`
        )
        .then((res) => {
            handleSearchedPairData(res, setSearchedPairs, setErrors);
        })
        .catch((err) => {
            console.error(err);
        });
};
