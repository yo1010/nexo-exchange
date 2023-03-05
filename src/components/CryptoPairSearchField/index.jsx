import React, { useState } from 'react';
import { Fab, TextField, Tooltip, Zoom } from '@mui/material';
import Search from '@mui/icons-material/Search';

import styles from './styles/CryptoPairSearchField.module.scss';

const CryptoPairSearchField = ({ setCryptoPair }) => {
    const [pairs, setPairs] = useState({ pairOne: '', pairTwo: '' });

    const handleChange = (e) => {
        setPairs({
            ...pairs,
            [e.target.id]: e.target.value.toUpperCase().replace(/[^a-z]/gi, ''),
        });
    };

    const handleClick = (e) => {
        setCryptoPair(`${pairs.pairOne}/${pairs.pairTwo}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };

    const tooltipText = (pair) => {
        return `Write ${pair} pair here and press Enter to search`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <Tooltip
                    title={tooltipText('first')}
                    TransitionComponent={Zoom}
                    arrow
                >
                    <TextField
                        id="pairOne"
                        label="Pair 1"
                        variant="outlined"
                        color="primary"
                        InputLabelProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                        InputProps={{
                            classes: {
                                notchedOutline: styles.outline,
                            },
                        }}
                        value={pairs.pairOne}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </Tooltip>
                <h1 className={styles.separator}>/</h1>
                <Tooltip
                    title={tooltipText('second')}
                    TransitionComponent={Zoom}
                    arrow
                >
                    <TextField
                        id="pairTwo"
                        label="Pair 2"
                        variant="outlined"
                        color="primary"
                        InputLabelProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                        InputProps={{
                            classes: {
                                notchedOutline: styles.outline,
                            },
                        }}
                        value={pairs.pairTwo}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </Tooltip>
                <Tooltip
                    title="Press to search"
                    TransitionComponent={Zoom}
                    arrow
                >
                    <Fab
                        color="primary"
                        variant="extended"
                        className={styles.button}
                        onClick={handleClick}
                    >
                        <Search sx={{ mr: '5px' }} />
                        Search
                    </Fab>
                </Tooltip>
            </div>
        </div>
    );
};

export default CryptoPairSearchField;
