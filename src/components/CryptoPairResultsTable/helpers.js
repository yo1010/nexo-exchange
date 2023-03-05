/**
 *
 * @param a - fist floating point to compare
 * @param b - second foating point to compare
 * @returns - the comparison result of the two floating points
 */
const floatingPointComperator = (a, b) => {
    const EPSILON = 0.000001;
    if (a - b > EPSILON && Math.abs(a - b) > EPSILON) return -1;
    if (a - b < EPSILON && Math.abs(a - b) > EPSILON) return 1;
    return 0;
};

/**
 *
 * @param order - the ascending or descending order
 * @param orderBy - the column to sort by
 * @returns - a comperator to pass into the sorting function
 */
const getComparator = (order, orderBy) => {
    const descendingComparator = (a, b, orderBy) => {
        if (orderBy !== 'name') {
            const totalPrice = (el) =>
                parseFloat(el[orderBy]) * parseInt(el.amount);
            return floatingPointComperator(
                parseFloat(totalPrice(a)),
                parseFloat(totalPrice(b))
            );
        }

        if (b[orderBy] < a[orderBy]) return -1;
        if (b[orderBy] > a[orderBy]) return 1;
        return 0;
    };

    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

/**
 *
 * @param rows - the rows array to sort
 * @param order - the ascending or descending order
 * @param orderBy - the column to sort by
 * @returns - the sorted rows array
 */
export const sortRows = (rows, order, orderBy) => {
    const comparator = getComparator(order, orderBy);
    return rows.sort((a, b) => comparator(a, b));
};

/**
 *
 * @param results - the results for the crypto pair search from Kraken's API
 * @param prevResults - previous results for the crypto pairs preceeding the current search
 * @returns the prepped result object
 *
 * Preps the results recevied by the API by taking the highest price for the day and assigning a default amount
 */
export const prepResults = (results, prevResults = {}) => {
    return Object.fromEntries(
        Object.entries(results).map(([key, val]) => {
            let newVal = {
                price: val.h[0],
                amount: prevResults[key]?.amount || '1',
            };
            return [key, newVal];
        })
    );
};

/**
 *
 * @param results - the results object for the searched crypto pairs
 * @returns an array of rows to be visualized by the table
 */
export const mapResultsToRows = (results) => {
    return Object.entries(results).flatMap(([key, val]) => ({
        name: key,
        price: val.price,
        amount: val.amount,
    }));
};
