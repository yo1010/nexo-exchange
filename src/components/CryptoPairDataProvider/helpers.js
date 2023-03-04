/**
 *
 * @param res - response from Kraken API
 * @param currentPair - current pair being searched
 * @param searchedPairs - other previous searched pairs
 * @param setSearchedPairs - state update function for updating the previous searched pairs
 */
export const handleSearchedPairData = (
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
        console.log(
            searchedPairs,
            searchedPairs.findIndex((pair) => pair?.name === currentPair),
            currentPair
        );
        if (searchedPairs.findIndex((pair) => pair?.name === currentPair) < 0) {
            const highPrice = res.data.result[currentPair]?.h;
            setSearchedPairs([
                ...searchedPairs,
                {
                    name: currentPair,
                    todayPrice: highPrice[0],
                    roundTheClockPrice: highPrice[1],
                },
            ]);
            console.log(searchedPairs);
        }
    }
};
