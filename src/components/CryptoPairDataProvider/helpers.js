import axios from 'axios';

/**
 *
 * @param res - response from Kraken API
 * @param currentPair - current pair being searched
 * @param searchedPairs - other previous searched pairs
 * @param setSearchedPairs - state update function for updating the previous searched pairs
 *
 * Handles the state update of previously searcehd pairs
 */
const handleSearchedPairData = (
    res,
    currentPair,
    searchedPairs,
    setSearchedPairs
) => {
    if (res?.data?.error?.length > 0) {
        setSearchedPairs(
            searchedPairs.filter((pair) => pair?.name !== currentPair)
        );
    }

    if (res?.data?.result) {
        const updatedPairs = Object.entries(res.data.result).flatMap(
            ([key, val]) => ({
                name: key,
                todayPrice: val.h[0],
                roundTheClockPrice: val.h[1],
            })
        );
        setSearchedPairs(updatedPairs);
    }
};

/**
 *
 * @param currentPair - current pair being searched
 * @param searchedPairs - other previous searched pairs
 * @param setSearchedPairs - state update function for updating the previous searched pairs
 *
 * Gets data from Kraken for all the searched pairs
 */
export const getSearchedPairData = (
    currentPair,
    searchedPairs,
    setSearchedPairs
) => {
    const searchedPairNames = searchedPairs.map((pair) => pair.name);
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
            handleSearchedPairData(
                res,
                currentPair,
                searchedPairs,
                setSearchedPairs
            );
        })
        .catch((err) => {
            console.error(err);
        });
};
