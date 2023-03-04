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
        if (orderBy !== 'name')
            return floatingPointComperator(
                parseFloat(a[orderBy]),
                parseFloat(b[orderBy])
            );

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
