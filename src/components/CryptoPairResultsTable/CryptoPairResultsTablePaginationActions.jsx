import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const CryptoPairResultsTablePaginationActions = ({
    count,
    page,
    rowsPerPage,
    onPageChange,
}) => (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
            onClick={(e) => onPageChange(e, 0)}
            disabled={page === 0}
            aria-label="first page"
        >
            <FirstPageIcon />
        </IconButton>
        <IconButton
            onClick={(e) => onPageChange(e, page - 1)}
            disabled={page === 0}
            aria-label="previous page"
        >
            <KeyboardArrowLeft />
        </IconButton>
        <IconButton
            onClick={(e) => onPageChange(e, page + 1)}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
            <KeyboardArrowRight />
        </IconButton>
        <IconButton
            onClick={(e) =>
                onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
            }
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
            <LastPageIcon />
        </IconButton>
    </Box>
);

export default CryptoPairResultsTablePaginationActions;
