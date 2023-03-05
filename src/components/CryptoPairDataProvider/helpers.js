import axios from 'axios';

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
            setErrors(res?.data?.error?.length > 0 ? res.data.error : []);
            if (res?.data?.result) {
                setSearchedPairs(res.data.result);
            }
        })
        .catch((err) => {
            console.error(err);
        });
};
