import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CryptoPairResultsTablePaginationActions from './CryptoPairResultsTablePaginationActions';
import CryptoPairResultsTableHead from './CryptoPairResultsTableHead';
import CryptoPairResultsPriceCell from './CryptoPairResultsPriceCell';
import { mapResultsToRows, prepResults, sortRows } from './helpers';

const CrryptoPairResultsTable = ({ results }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [preppedResults, setPreppedResults] = useState(prepResults(results));

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (e, property) => {
        const isAsc = order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const updateResults = (updatedRow) => {
        let updatedResults = { ...preppedResults };
        updatedResults[updatedRow.name]['amount'] = updatedRow.amount;
        setPreppedResults(updatedResults);
    };

    useEffect(() => {
        prepResults(results);
        setPreppedResults((prevResults) => prepResults(results, prevResults));
    }, [results]);

    const rowsToDisplay = mapResultsToRows(preppedResults);
    if (!rowsToDisplay || rowsToDisplay.length === 0) {
        return (
            <h3 style={{ margin: '4rem 0' }}>
                Enter as many Cryptocurrency pairs to display their prices in a
                table here...
            </h3>
        );
    }

    return (
        <TableContainer sx={{ maxWidth: '80%', margin: '3rem auto 1rem' }}>
            <Table sx={{ minWidth: 500 }}>
                <CryptoPairResultsTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {sortRows(rowsToDisplay, order, orderBy)
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <CryptoPairResultsPriceCell
                                    row={row}
                                    updateRows={updateResults}
                                />
                            </TableRow>
                        ))}
                </TableBody>
                {rowsToDisplay.length > 5 && (
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: 'All', value: -1 },
                                ]}
                                colSpan={3}
                                count={rowsToDisplay.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={
                                    CryptoPairResultsTablePaginationActions
                                }
                            />
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </TableContainer>
    );
};

export default CrryptoPairResultsTable;
