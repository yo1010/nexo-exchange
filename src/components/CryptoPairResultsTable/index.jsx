import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CryptoPairResultsTablePagination from './CryptoPairResultsTablePagination';
import { TableHead } from '@mui/material';
import CryptoPairResultsTableHead from './CryptoPairResultsTableHead';

const CrryptoPairResultsTable = ({ results }) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (
        event,
        newPage,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (!results || results.length === 0) {
        return null;
    }

    return (
        <TableContainer sx={{ maxWidth: "80%", margin: "0 auto" }}>
        <Table sx={{ minWidth: 500 }}>
            <CryptoPairResultsTableHead />
            <TableBody>
            {(rowsPerPage > 0
                ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : results
            ).map((row) => (
                <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.todayPrice}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.roundTheClockPrice}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={results.length}
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
                ActionsComponent={CryptoPairResultsTablePagination}
                />
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
    );
};

export default CrryptoPairResultsTable;