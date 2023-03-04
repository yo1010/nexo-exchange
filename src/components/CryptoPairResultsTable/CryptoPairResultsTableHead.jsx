import React from 'react';
import {
    Box,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Zoom,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const HEAD_CELLS = [
    {
        id: 'name',
        numeric: false,
        label: 'Cryptocurrency pair',
    },
    {
        id: 'todayPrice',
        numeric: true,
        label: 'Today Price',
    },
    {
        id: 'roundTheClockPrice',
        numeric: true,
        label: '24 hour Price',
    },
];

const CryptoPairResultsTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (e) => {
        onRequestSort(e, property);
    };

    return (
        <TableHead>
            <TableRow>
                {HEAD_CELLS.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <Tooltip
                            title="Click to sort"
                            TransitionComponent={Zoom}
                            arrow
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={
                                    orderBy === headCell.id ? order : 'asc'
                                }
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default CryptoPairResultsTableHead;
