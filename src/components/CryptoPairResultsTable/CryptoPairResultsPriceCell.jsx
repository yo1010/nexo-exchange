import React, { useEffect, useState } from 'react';
import {
    InputAdornment,
    TableCell,
    TextField,
    Tooltip,
    Zoom,
} from '@mui/material';

import styles from './styles/CryptoPairResultsPriceCell.module.scss';

const CryptoPairResultsPriceCell = ({ row, updateRows }) => {
    const [amount, setAmount] = useState(row.amount);

    const handleChange = (e) => {
        const changedAmount = e.target.value.replace(/[^0-9]/g, '');
        setAmount(changedAmount);
    };

    const handleUpdate = (e) => {
        if (amount > 0) {
            updateRows({
                ...row,
                amount: amount,
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    };

    useEffect(() => {
        setAmount(row.amount);
    }, [row]);

    const cryptosInPair = row.name.split('/');
    return (
        <TableCell className={styles.amountRow} align="right">
            <Tooltip
                title={'Change the amount here and press Enter'}
                TransitionComponent={Zoom}
                arrow
            >
                <TextField
                    value={amount}
                    onChange={handleChange}
                    onBlur={handleUpdate}
                    onKeyDown={handleKeyDown}
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <span style={{ color: 'white' }}>
                                    {cryptosInPair[0]}
                                </span>
                            </InputAdornment>
                        ),
                        classes: {
                            notchedOutline: styles.outline,
                        },
                    }}
                    variant="outlined"
                />
            </Tooltip>
            <h1>=</h1>
            <TextField
                value={row.price * row.amount}
                className={styles.lightBlue}
                sx={{
                    m: 1,
                    width: '25ch',
                    '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#3ba9e5',
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <span className={styles.lightBlue}>
                                {cryptosInPair[1]}
                            </span>
                        </InputAdornment>
                    ),
                    classes: {
                        notchedOutline: styles.disabledOutline,
                    },
                }}
                variant="outlined"
                disabled
            />
        </TableCell>
    );
};

export default CryptoPairResultsPriceCell;
