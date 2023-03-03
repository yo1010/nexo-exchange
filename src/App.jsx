import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import ThemeDefault from './styles/ThemeOverride'
import CryptoPairContextProvider from './components/CryptoPairContextProvider'
import CryptoPairDataProvider from './components/CryptoPairDataProvider'
import CryptoPairResultsTable from './components/CryptoPairResultsTable'
import CryptoPairSearchField from './components/CryptoPairSearchField'

import styles from './styles/App.module.scss'

const App = () => {
    return (
        <CryptoPairContextProvider>
            <ThemeProvider theme={ThemeDefault}>
                <div className={styles.container}>
                    <CryptoPairSearchField />
                    <CryptoPairDataProvider>
                        {(results) => (
                            <CryptoPairResultsTable results={results} />
                        )}
                    </CryptoPairDataProvider>
                </div>
            </ThemeProvider>
        </CryptoPairContextProvider>
    )
}

export default App
